import React, { useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
import { getBalanceToken, getBalanceWallet } from './function.js'

const columns = [
    {
        title: 'Balance Wallet',
        dataIndex: 'balanceWalet',
        align: 'center',
        width: '50%',
        render: (text) => text ? <>{text.balance} <Tag>{text.symbol}</Tag></> : '-'
    },
    {
        title: 'Balance Token',
        dataIndex: 'balanceToken',
        align: 'center',
        width: '50%',
        render: (text) => text ? <>{text.balance} <Tag>{text.symbol}</Tag></> : '-'
    },
];

const Balance = ({ currentAccount }) => {
    const [tokenBalance, setTokenBalance] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);

    useEffect(() => {
        getBalanceToken(currentAccount).then(result => {
            setTokenBalance(result)
        })
        getBalanceWallet(currentAccount).then(result => {
            setWalletBalance(result)
        })

    }, [currentAccount])


    return (
        <>
            <Table pagination={false} dataSource={[{
                key: '1',
                balanceWalet: walletBalance,
                balanceToken: tokenBalance,
            },
            ]} columns={columns} />
        </>
    )
}

export default Balance;