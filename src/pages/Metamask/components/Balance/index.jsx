import React from 'react'
import BalanceToken from './components/BalanceToken'
import BalanceWallet from './components/BalanceWallet'

const Balance = ({currentAccount}) => {

    return (
        <>
        <BalanceWallet currentAccount={currentAccount}/>
        <BalanceToken currentAccount={currentAccount}/>
        </>
    )
}

export default Balance;