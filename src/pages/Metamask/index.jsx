import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@mantine/core';
import Web3Context from '../../context/Web3Context';
import Balance from './components/Balance';
import Transfering from './components/Transfering/';
import { Divider, Card, Space } from 'antd'

const Metamask = ({ style }) => {
    const { currentAccount, connectWallet, loading } = useContext(Web3Context);

    const renderContent = () => {
        if (currentAccount) {
            return (
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: theme.colors.green[2],
                            color: theme.colors.gray[9],
                            textAlign: 'center',
                            padding: theme.spacing.sm,
                            borderRadius: theme.radius.sm,
                        })}
                    >
                        Connected: {currentAccount}
                    </Box>
                    {currentAccount !== null && (
                        <>
                            <Card>
                                <Balance currentAccount={currentAccount} />
                                <Divider />
                                <Transfering currentAccount={currentAccount} />
                            </Card>
                        </>
                    )}





                </Space>
            );

        } else {
            return (
                <Button onClick={connectWallet} fullWidth='true' disabled={loading}>
                    Connect Wallet
                </Button>
            );
        }
    };

    return <div style={style}>{renderContent()}</div>;
};

export default Metamask;
