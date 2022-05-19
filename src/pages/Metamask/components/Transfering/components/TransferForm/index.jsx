import React from 'react';
import Web3 from 'web3';
import minABI from '../../../../../../abi/sample.json'
import { Input, Button, Form } from 'antd'
import BigNumber from 'bignumber.js'
// const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

const TransferForm = ({ transferType, currentAccount }) => {

    const sendNative = async (from, to, value) => { 
        try {
            const myWeb3 = new Web3(window.ethereum);
            myWeb3.eth.sendTransaction({ from: from, to: to, value: myWeb3.utils.toWei(value.toString())})
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
            const contract = new myWeb3.eth.Contract(minABI, data.contractAddress);
            const decimals = await contract.methods.decimals().call();
            const amount = new BigNumber(data.value).multipliedBy(BigNumber(10).pow(decimals));
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
        //0xd9A3f6930DE4e246627710cF4D6c74f42825a0b4
        //123321123321000

        if (transferType === 'native') {
            sendNative(currentAccount, value.receiverAddress, value.amount);
        } else if (transferType === 'erc20') {
            sendErc20({ from: currentAccount, to: value.receiverAddress, value: Number(value.amount), contractAddress: value.contractAddress });
        }
    }

    return (
        <Form
            name={transferType}
            labelCol={{ span: 6, offset: 1}}
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

export default TransferForm;
