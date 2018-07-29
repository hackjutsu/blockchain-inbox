const fs = require('fs');
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

let { INFURA_API_KEY } = require('./configs/secret.dummy');
const secretPath = path.resolve(__dirname, 'config', 'secret.js');
if (fs.existsSync(secretPath)) {
  INFURA_API_KEY = require('./configs/secret').INFURA_API_KEY;
}

console.log(INFURA_API_KEY);

const provider = new HDWalletProvider(
  'glide number act target acid boat slender hint dwarf general pear section',
  `https://rinkeby.infura.io/${INFURA_API_KEY}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({gas: '1000000', from: accounts[0]});

  console.log('Contract deployed to', result.options.address);
};

deploy();
