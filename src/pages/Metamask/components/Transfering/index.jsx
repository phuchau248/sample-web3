import React from 'react';
import { Tabs } from 'antd'
import TransferForm from './components/TransferForm';
import Transaction from './components/Transaction';
import ApproveERC20 from './components/ApproveERC20';
import Allowance from './components/Allowance';


const Transfering = ({ currentAccount }) => {

    const [ranKey, setRanKey] = React.useState(0)
    const refresh = (e) => {
        if (e === '3' || e === '5') {
            setRanKey(ranKey + 1);
        }
    }

    return (
        <>
            <Tabs defaultActiveKey="1" onChange={refresh}>
                <Tabs.TabPane tab="Native Transfer" key="1">
                    <TransferForm transferType="native" currentAccount={currentAccount} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="ERC-20 Transfer" key="2">
                    <TransferForm transferType="erc20" currentAccount={currentAccount} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Transactions" key="3">
                    <Transaction currentAccount={currentAccount} ranKey={ranKey} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Approve ERC20" key="4">
                    <ApproveERC20 currentAccount={currentAccount} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Allowance" key="5">
                    <Allowance currentAccount={currentAccount} ranKey={ranKey} />
                </Tabs.TabPane>
            </Tabs>
        </>
    );
};

export default Transfering;
