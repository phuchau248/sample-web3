import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { Table } from 'antd';

const columns = [
    {
        title: 'From Address',
        dataIndex: 'from',
        key: 'from',
        align: 'center',
    },
    {
        title: 'To Address',
        dataIndex: 'to',
        key: 'to',
        align: 'center',
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        align: 'center',
        render: (value) => {
            const myWeb3 = new Web3(window.ethereum);
            return myWeb3.utils.fromWei(value)
        }
    },
]

const Transaction = ({ currentAccount, ranKey }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactions = async (address) => {
            const myWeb3 = new Web3(window.ethereum);
            const currentBlock = await myWeb3.eth.getBlockNumber();
            axios.get('http://api-kovan.etherscan.io/api', {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address: address,
                    startblock: 0,
                    endblock: currentBlock,
                    sort: 'asc',
                    apikey: 'TT57AIWVJSWTYPFI5DU2821ES26PRP831X'
                }
            })
                .then((response) => {
                    if (response?.status === 200 && response?.data?.message === 'OK') {
                        setTransactions(response?.data?.result);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        getTransactions(currentAccount)

        const test2 = async (address) => {
            const myWeb3 = new Web3(window.ethereum);
            var currentBlock = await myWeb3.eth.getBlockNumber();
            // currentBlock = 31630076
            console.log(currentBlock)
            var n = await myWeb3.eth.getTransactionCount(address);
            var bal = await myWeb3.eth.getBalance(address);
            for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
                try {
                    var block = await myWeb3.eth.getBlock(i, true);
                    if (block && block.transactions) {
                        console.log(i)
                        block.transactions.forEach((e) => {
                            if (e.from && address === e.from.toLowerCase()) {
                                console.log("block:" + block + "from: " + e.from.toLowerCase() + " to: " + e.to.toLowerCase() + " value: " + e.value);
                                --n;
                            }
                            if (e.to && address === e.to.toLowerCase()) {
                                console.log("block:" + block + "from: " + e.from.toLowerCase() + " to: " + e.to.toLowerCase() + " value: " + e.value);
                            }
                        });
                    }
                } catch (e) { console.error("Error in block " + i, e); }
            }
        }
        // test2(currentAccount)

    }, [currentAccount, ranKey])

    const renderContent = (list) => {
        return (
            <Table
                dataSource={list}
                columns={columns}
            />
        );
    };

    return (
        <>
            {transactions && (
                <div >{renderContent(transactions)}</div>
            )}
        </>
    );
};

export default React.memo(Transaction);