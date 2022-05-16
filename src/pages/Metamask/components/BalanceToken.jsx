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
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "symbol", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
];



const BalanceToken = ({ currentAccount }) => {
    const [balance, setBalance] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

    useEffect(() => {
        const getBalance = async () => {
            const myWeb3 = new Web3(window.ethereum);
            let contract = new myWeb3.eth.Contract(minABI, tokenAddress);
            let bal = await contract.methods.balanceOf(currentAccount).call();
            let sym = await contract.methods.symbol().call();
            return { bal, sym };
        }
        getBalance().then(function (result) {
            const { bal, sym } = result
            setBalance(bal)
            setSymbol(sym)
        });
    }, [])

    const renderContent = () => {
        return (
            <>     {balance && (
                <div>Balance Token: {balance} {symbol}</div>)}
            </>
        );
    };

    return <div >{renderContent()}</div>;
};

export default BalanceToken;
