import React, { useEffect } from 'react';
import Web3 from 'web3';
import minABI from '../../../../../../abi/sample.json'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";


const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4"; //USDT

const Transaction = ({ currentAccount }) => {
    useEffect(() => {






        const getTransaction = async (address) => {
            const myWeb3 = new Web3(window.ethereum);
            // myWeb3.eth.getTransaction('0xa1b292840e6ae855b9bbe5b49e04034c024b2057097aa9702d015e501dad1f26').then(console.log)
            let block = await myWeb3.eth.getBlock('latest');
            myWeb3.eth.getTransactionCount(currentAccount).then(console.log)
            console.log(block)
            // if (block != null && block.transactions != null) {
            //     for (let txHash of transactions) {
            //         let tx = await myWeb3.eth.getTransaction(txHash);
            //             //  console.log(txHash)
            //             // console.log("from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + tx.value);
            //     }
            // }
        }
        // getTransaction(currentAccount)

        const test2 = async (address) => {
            const myWeb3 = new Web3(window.ethereum);
            var currentBlock = await myWeb3.eth.getBlockNumber();
            currentBlock = 31630076
            console.log(currentBlock)
            var n = await myWeb3.eth.getTransactionCount(address);
            var bal = await myWeb3.eth.getBalance(address);
            for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
                try {
                    var block = await myWeb3.eth.getBlock(i, true);
                    if (block && block.transactions) {
                        block.transactions.forEach(function (e) {
                            if (e.from && address === e.from.toLowerCase()) {                           
                                console.log("from: " + e.from.toLowerCase() + " to: " + e.to.toLowerCase() + " value: " + e.value);
                                --n;
                            }
                            if (e.to && address === e.to.toLowerCase()) {                             
                                console.log("from: " + e.from.toLowerCase() + " to: " + e.to.toLowerCase() + " value: " + e.value);
                            }
                        });
                    }
                } catch (e) { console.error("Error in block " + i, e); }
            }

        }
        test2(currentAccount)

    }, [currentAccount])

    const renderContent = () => {
        return (
            <></>
        );
    };

    return <div >{renderContent()}</div>;
};

export default React.memo(Transaction)