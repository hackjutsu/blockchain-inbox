const assert = require('assert');
const ganache = require('ganache-cli');
// Web3 is a constructor function, which we usually capitalize.
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accoutns to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // teach web3 about what methods an Inbox contract has
    .deploy({ data: bytecode, arguments: ['Hi there!'] }) // tell web3 that we want to deploy a new copy of this contract
    .send({ from: accounts[0], gas: '1000000' }); // instructs web3 to send out a transaction that creates this contract

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address); // check value defined
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // send transaction
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
