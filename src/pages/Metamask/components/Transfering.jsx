import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import minABI from '../../../abi/sample.json'
const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

const Transfering = ({ currentAccount }) => {
    const [balance, setBalance] = useState();
    const [receiverAddress, setReceiverAddress] = useState('');
    const [amount, setAmount] = useState('');


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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(receiverAddress)
        console.log(amount)
        send({ from: currentAccount, to: '0xd9A3f6930DE4e246627710cF4D6c74f42825a0b4', value: 123321123321000 })
    }

    const renderContent = () => {
        return (
            <form onSubmit={handleSubmit}>
                {/* <input type="text" value={receiverAddress} */}
                {/* onChange={(e) => setReceiverAddress(e.target.value)} /> */}
                {/* <input type="text" name="amount" value={amount} */}
                {/* onChange={(e) => setAmount(e.target.value)}/> */}
                <input type="submit" value="Submit" />
            </form>
        );
    };

    return <div >{renderContent()}</div>;
};

export default Transfering;
