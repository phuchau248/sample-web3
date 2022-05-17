import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const BalanceWallet = ({ currentAccount }) => {
    const [balance, setBalance] = useState();

    useEffect(() => {
        const getBalance = async (address) => {
            const myWeb3 = new Web3(window.ethereum);
            try {
                myWeb3.eth.getBalance(address)
                    .then(result => setBalance(result / (10 ** 18)));
            } catch (err) {
                console.log(err)
            }
        }
        getBalance(currentAccount)
    }, [])

    const renderContent = () => {
        return (
            <div> Balance: {balance && `${balance} ETH`}</div>
        );
    };

    return <div >{renderContent()}</div>;
};

export default BalanceWallet