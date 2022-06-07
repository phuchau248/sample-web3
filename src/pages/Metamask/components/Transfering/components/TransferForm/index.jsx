import React from 'react';
import Web3 from 'web3';
import ABI from './abi.json'
import { Input, Button, Form } from 'antd'

const TransferForm = ({ transferType, currentAccount }) => {

    const sendNative = async (from, to, value) => {
        try {
            const myWeb3 = new Web3(window.ethereum);
            myWeb3.eth.sendTransaction({ from: from, to: to, value: myWeb3.utils.toWei(value.toString()) })
                .then(result => {
                    console.log(result);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const sendErc20 = async (data) => {
        try {
            const myWeb3 = new Web3(window.ethereum);
            const contract = new myWeb3.eth.Contract(ABI, data.contractAddress);
            const decimals = await contract.methods.decimals().call();
            const amount = data.value * (10 ** (decimals));
            contract.methods.transfer(data.to, amount).send({ from: data.from })
                .on('transactionHash', function (hash) {
                    console.log(hash);
                });
            return null;
        }
        catch (err) {
            console.log(err);
        }
    }

    const transfer = (value) => {
        if (transferType === 'native') {
            sendNative(currentAccount, value.receiverAddress, value.amount);
        } else if (transferType === 'erc20') {
            sendErc20({ from: currentAccount, to: value.receiverAddress, value: Number(value.amount), contractAddress: value.contractAddress });
        }
    }

    return (
        <Form
            name={transferType}
            labelCol={{ span: 6, offset: 1 }}
            wrapperCol={{ span: 14 }}
            onFinish={transfer}
        >
            <Form.Item
                label="Receiver Address"
                name="receiverAddress"
                rules={[{ required: true, message: 'Please input receiver address!' }]}
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
            {transferType === 'erc20' && (
                <Form.Item
                    label="Contract Address"
                    name="contractAddress"
                    rules={[{ required: true, message: 'Please input contract address!' }]}>
                    <Input />
                </Form.Item>)}
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default React.memo(TransferForm);
