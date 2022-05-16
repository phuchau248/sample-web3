import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { showNotification } from '@mantine/notifications';
import Web3 from 'web3';
import Web3Context from '../context/Web3Context';
import SampleData from '../abi/sample.json';

const useContract = () => {
  const { setLoading } = useContext(Web3Context);
  const [contract, setContract] = useState(null);
  const [supply, setSupply] = useState(null);
  const [base, setBase] = useState(null);

  useEffect(() => {
    const connectToContract = () => {
      // Declare provider
      let provider;

      // If user is on correct chain, set MetaMask as provider
      if (
        window.ethereum &&
        window.ethereum.networkVersion === process.env.REACT_APP_CHAIN_ID
      ) {
        provider = window.ethereum;
      } else {
        // else if contract on mainnet, use infura mainnet
        if (process.env.REACT_APP_CHAIN_ID === 1)
          provider = process.env.REACT_APP_MAINNET_JSONRPC;
        // else use infura rinkeby
        provider = process.env.REACT_APP_RINKEBY_JSONRPC;
      }
      const web3 = new Web3(provider);
      setContract(
        () =>
          new web3.eth.Contract(
            SampleData,
            process.env.REACT_APP_CONTRACT_ADDRESS
          )
      );
    };
    if (!contract) connectToContract();
  }, [contract]);

  // gets config from contract (check factoria dev docs)
  // TODO get other things from contract here if needed
  const getConfig = useCallback(async () => {
    if (!contract) return;
    setLoading(() => true);
    try {
      // get config from contract
      const config = await contract.methods.config().call();
      // set supply and base from config
      setSupply(() => config.supply);
      setBase(() => {
        if (config.base === '') {
          showNotification({
            id: 'placeholder-notification',
            title: 'The art will be revealed soon!',
          });
        }
        return config.base;
      });
    } catch (e) {
      // if there's an error, alert user
      console.error(e);
      showNotification({
        id: 'connection-failed',
        title: 'Something went wrong...',
        message: "We couldn't connect to the contract :(",
        color: 'red',
      });
    }

    setLoading(() => false);
  }, [contract, setLoading]);

  const estimateGas = async (myContract, action, params, overwrite) => {
    try {
      const gas = await myContract.methods[action](...params).estimateGas(
        overwrite
      );
      return gas;
    } catch (error) {
      let _error = error;
      try {
        let tmp = error
          .toString()
          .replace('Error: Internal JSON-RPC error.', '');
        _error = JSON.parse(tmp);
      } catch (e) {
        _error = error;
      }
      throw _error;
    }
  };
  const sendRawTx = async (abi, addressContract, action, params, overwrite) => {
    const myWeb3 = new Web3(window.ethereum);
    myWeb3.eth.extend({
      methods: [
        {
          name: 'chainId',
          call: 'eth_chainId',
          outputFormatter: Web3.utils.hexToNumber,
        },
      ],
    });
    const myContract = new myWeb3.eth.Contract(abi, addressContract);
    const gas = await estimateGas(myContract, action, params, overwrite);
    const rs = myContract.methods[action](...params).send(overwrite);

    return rs;
  };
  const mintNft = useCallback(async (myAddress, data) => {
    if (!myAddress) {
      showNotification({
        id: 'connect-to-metamask',
        title: 'Please connect to MetaMask.',
      });
      return;
    }
    setLoading(() => true);
    try {
      let overwrite = { from: myAddress };
      const res = await sendRawTx(
        SampleData,
        process.env.REACT_APP_CONTRACT_ADDRESS,
        'mint',
        [data.address, data.tokenId],
        overwrite
      );
      setLoading(() => false);
      showNotification({
        id: 'connect-to-metamask',
        title: 'Successfully',
        color: 'green',
      });
      return res;
    } catch (e) {
      console.error(e);
      showNotification({
        id: 'connect-to-metamask',
        title: e.message ? e.message : e,
        color: 'red',
      });
      throw new Error(e.code)
    } finally {
      setLoading(() => false);
    }
  }, []);

  const mintBatchNft = useCallback(async (myAddress, data) => {
    if (!myAddress) {
      showNotification({
        id: 'connect-to-metamask',
        title: 'Please connect to MetaMask.',
      });
      return;
    }
    setLoading(() => true);
    try {
      let overwrite = { from: myAddress };
      const res = await sendRawTx(
        SampleData,
        process.env.REACT_APP_CONTRACT_ADDRESS,
        'mintBatch',
        [data.addresses, data.tokenIds],
        overwrite
      );
      setLoading(() => false);
      showNotification({
        id: 'connect-to-metamask',
        title: 'Successfully',
        color: 'green',
      });
      return res;
    } catch (e) {
      console.error(e);
      showNotification({
        id: 'connect-to-metamask',
        title: e.message ? e.message : e,
        color: 'red',
      });
    }
    setLoading(() => false);
  }, []);

  const getSignature = async (address, tokenIds) => {
    const web3 = new Web3(window.ethereum);
    console.log("aaaaa------->", typeof tokenIds.join(''), tokenIds.join(''))
    const stringTokenIds = tokenIds.join(',');
    console.log("aaaaa------->", stringTokenIds)
    let msgHash = web3.utils.soliditySha3({ t: 'string', v: stringTokenIds })
    msgHash = msgHash.slice(2, msgHash.length)
    const signature = await web3.eth.personal.sign(msgHash, address)
    console.log("msgHash===>", msgHash)
    console.log("signature===>", signature)
    return signature
  }

  // TODO set return for anything we add later
  return useMemo(() => {
    return { supply, base, getConfig, mintNft, mintBatchNft, getSignature };
  }, [supply, base, getConfig]);
};

export default useContract;
