import React from 'react';
import Web3 from 'web3';
import ABI from './erc20.json'
import { Input, Button, Form } from 'antd'
import BigNumber from 'bignumber.js'


const ApproveERC20 = ({ currentAccount }) => {


    const checkApprove = async (contractAddress, walletAddress, spender, maxAmount) => {
        const myWeb3 = new Web3(window.ethereum);
        const contract = new myWeb3.eth.Contract(ABI, contractAddress);
        const rs = await contract.methods.approve(spender, maxAmount).send({ from: walletAddress });
        console.log(rs);
    }

    const transfer = (value) => {
        checkApprove(value.contractAddress, currentAccount, value.spenderAddress, BigNumber(value.amount));
    }

    return (
        <>
            <Form
                name={"ApproveERC20"}
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
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input amount!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default React.memo(ApproveERC20);
