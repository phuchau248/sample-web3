import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import minABI from '../../../abi/sample.json'
import { BigInt } from 'big-integer'
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
        // send(currentAccount, receiverAddress, BigInt(amount,10))

        send({ from: currentAccount, to: '0xe28a34c60606F2a9C309f8fAF6999299977377ac', value: 123321123321 })
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
