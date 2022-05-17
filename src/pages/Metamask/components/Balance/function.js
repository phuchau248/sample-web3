import Web3 from 'web3';
import minABI from '../../../../abi/sample.json'
const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4"; //USDT

export const getBalanceToken = async (address) => {
    try {
        const myWeb3 = new Web3(window.ethereum);
        let contract = new myWeb3.eth.Contract(minABI, tokenAddress);
        let balance = await contract.methods.balanceOf(address).call();
        let symbol = await contract.methods.symbol().call();
        return { balance, symbol };
    }
    catch (err) {
        console.log(err);
        return { balance: null, symbol: null };
    }
};

export const getBalanceWallet = async (address) => {
    try {
        const myWeb3 = new Web3(window.ethereum);
        let result = await myWeb3.eth.getBalance(address);
        return {balance: myWeb3.utils.fromWei(result), symbol: 'ETH'};
    } catch (err) {
        console.log(err);
        return { balance: null, symbol: null };
    }
}
