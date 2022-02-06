const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode} = require('./compile.js');

const provider = new HDWalletProvider('ADD YOUR Wallet Phrase',
    'ADD your Infura Rinkaby URL');
const web3 = new Web3(provider);


const deploy = async() => 
{
    const accounts = await web3.eth.getAccounts();
    console.log('Deploy Using Account : ', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['First Contract'] })
        .send({gas: '1000000', from: accounts[0] });
    
    console.log('Contract Address: ', result.options.address);
};
deploy();

provider.engine.stop();