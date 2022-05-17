import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd'
import TransferForm from './components/TransferForm';

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
                <Tabs.TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </Tabs.TabPane>
            </Tabs>
        </>
    );
};

export default Transfering;
