import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import minABI from '../../../../../../abi/sample.json'
import { Input, Button, Form, Tabs, Card } from 'antd'
const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

const TransferForm = ({ transferType, currentAccount}) => {

    const send = async (data) => {
        console.log(data)
        const myWeb3 = new Web3(window.ethereum);
        try {
            myWeb3.eth.sendTransaction(data)
                .then(result => {
                    console.log(result)
                });
        } catch (err) {
            console.log(err)
        }
    }

    const transfer = (value) => {
        //0xd9A3f6930DE4e246627710cF4D6c74f42825a0b4
        //123321123321000
        send({ from: currentAccount, to: value.receiverAddress, value: value.amount * (10 ** 18) })
    }

    return (
        <Form
            name={transferType}
            labelCol={{ span: 6 }}
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
