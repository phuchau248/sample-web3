import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ABI from './erc20.json'
import { Input, Button, Form, Table } from 'antd'

const columns = [
    {
        title: 'Allowance',
        dataIndex: 'allowance',
        align: 'center',
        width: '50%',
        // render: (text) => text ? <>{text.balance} <Tag>{text.symbol}</Tag></> : '-'
    },
];

const Allowance = ({ currentAccount, ranKey }) => {

    const [allowance, setAllowance] = useState(null);

    useEffect(() => {
        setAllowance(null);
    }, [currentAccount, ranKey])

    const getAllowance = async (contractAddress, walletAddress, spender) => {
        const myWeb3 = new Web3(window.ethereum);
        const contract = new myWeb3.eth.Contract(ABI, contractAddress);
        const rs = await contract.methods.allowance(walletAddress, spender).call();
        console.log(rs)
        return rs / (10 ** 18);
    }

    const transfer = (value) => {
        getAllowance(value.contractAddress, currentAccount, value.spenderAddress).then(result => setAllowance(result))
    }

    return (
        <>
            <Form
                name={"Allowance"}
                labelCol={{ span: 6, offset: 1 }}
                wrapperCol={{ span: 14 }}
                onFinish={transfer}
            >
                <Form.Item
                    label="Contract Address"
                    name="contractAddress"
                    rules={[{ required: true, message: 'Please input contract address!' }]}
                    initialValue="0x41D645793B6E079644026b8007F9D385b4E803db"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Spender Address"
                    name="spenderAddress"
                    rules={[{ required: true, message: 'Please input spender address!' }]}
                    initialValue="0x9e20E4A16C8F58DE1E76c7fb380Cc7640A01a03f"
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {(allowance && <Table pagination={false} dataSource={[{
                key: '1',
                allowance: allowance,
            },
            ]} columns={columns} />)}
        </>
    )
};

export default React.memo(Allowance);
