import logo from './logo.svg';
import './App.css';
import Metamask from './pages/Metamask'
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AppContextProvider } from './context/AppContext';
import { Web3ContextProvider } from './context/Web3Context';
  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AppContextProvider>
          <Web3ContextProvider>
            <MantineProvider theme={{ primaryColor: 'indigo' }}>
              <NotificationsProvider>
                <Metamask />
              </NotificationsProvider>
            </MantineProvider>
          </Web3ContextProvider>
        </AppContextProvider>
      </header>
    </div>
  );
}

export default App;
