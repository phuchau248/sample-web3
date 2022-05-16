import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const minABI = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
];



const BalanceToken = ({ currentAccount }) => {
    const [balance, setBalance] = useState(null);
    const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

    useEffect(() => {
        const getBalance = async () => {
            const myWeb3 = new Web3(window.ethereum);

            let contract = new myWeb3.eth.Contract(minABI, tokenAddress);
            // console.log(contract)
            let result = await contract.methods.balanceOf(currentAccount).call();
            return result;
        }
        getBalance().then(function (result) {
            console.log('balance', result);
            setBalance(result)
        });
    }, [])

    const renderContent = () => {
        return (
            <>     {balance && (
                <div>Balance Token: {balance}</div>)}
            </>
        );
    };

    return <div >{renderContent()}</div>;
};

export default BalanceToken;
