import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const Transaction = ({ currentAccount }) => {

    useEffect(() => {

        const getTransaction = async (address) => {
            const myWeb3 = new Web3(window.ethereum);
            // myWeb3.eth.getTransactionCount(currentAccount).then(console.log)
            // const test = '0x47beec5f5bfe354a6717a9d44dc8a7f21c1c0c3ee355f6e4c461226949cbe19f'
            // myWeb3.eth.getTransactionReceipt(test).then(console.log)
            let block = await myWeb3.eth.getBlock('latest');
            let transactions = block.transactions;
            // console.log('Search Block: ' + transactions);
            if (block != null && transactions != null) {
                for (let txHash of transactions) {
                    let tx = await myWeb3.eth.getTransaction(txHash);
                         console.log(txHash)
                        console.log("from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + tx.value);
                    
                }
            }

        }
        getTransaction(currentAccount)


        // try {
        //     const myWeb3 = new Web3(window.ethereum);
        //     myWeb3.eth.getTransactionCount(currentAccount).then((b = console.log) => {
        //         console.log(b)
        //         for (var i = 0; i < b; i++) {
        //             myWeb3.eth.getBlock(b - i).then((Block) => {
        //               let  a = [
        //                     Block.hash
        //                 ]
        //                 console.log(a);
        //                 var iterator = a.values()
        //                 for (let elements of iterator) {
        //                     myWeb3.eth.getTransactionFromBlock(elements).then(console.log)
        //                 }
        //             });
        //         }
        //     });
        // } catch (err) {
        //     console.log(err)
        // }
   
    }, [])



const renderContent = () => {
    return (
        <></>
        // <div> Balance: {balance && `${balance} ETH`}</div>
    );
};

return <div >{renderContent()}</div>;
};

export default React.memo(Transaction)