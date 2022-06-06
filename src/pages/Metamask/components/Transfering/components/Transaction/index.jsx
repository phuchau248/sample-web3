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