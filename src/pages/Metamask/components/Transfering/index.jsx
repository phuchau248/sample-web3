import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd'
import TransferForm from './components/TransferForm';
import Transaction from './components/Transaction';
const Transfering = ({ currentAccount }) => {

    return (
        <>
            <Tabs defaultActiveKey="1" onChange={null}>
                <Tabs.TabPane tab="Native Transfer" key="1">
                    <TransferForm transferType="native" currentAccount={currentAccount} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="ERC-20 Transfer" key="2">
                    <TransferForm transferType="erc20" currentAccount={currentAccount} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Transaction" key="3">
                    <Transaction currentAccount={currentAccount}/>
                </Tabs.TabPane>
            </Tabs>
        </>
    );
};

export default Transfering;
