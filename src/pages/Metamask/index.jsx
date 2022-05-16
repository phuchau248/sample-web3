import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@mantine/core';
import Web3Context from '../../context/Web3Context';
import BalanceToken from './components/BalanceToken';
import BalanceWallet from './components/BalanceWallet'
import Transfering from './components/Transfering';
const Metamask = ({ style }) => {
    const { currentAccount, connectWallet, loading } = useContext(Web3Context);

    const renderContent = () => {
        if (currentAccount) {
            return (
                <>
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
                    {currentAccount && currentAccount !== null && <BalanceWallet currentAccount={currentAccount} />}
                    {currentAccount && currentAccount !== null && <BalanceToken currentAccount={currentAccount} />}
                    <div>
                    {currentAccount && currentAccount !== null && <Transfering currentAccount={currentAccount} />}
                    </div>
                </>
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
