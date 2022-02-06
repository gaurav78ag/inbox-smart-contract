const assert = require("assert");
const Web3 = require("web3");
const ganache = require("ganache-cli");

const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach( async () => 
    {
        accounts = await web3.eth.getAccounts();
        inbox = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({data: bytecode, arguments: ['Hi There!'] })
            .send({from: accounts[0], gas:'1000000' })

    });

describe('Inbox', () => 
    {
        it('Deploys a Contract', () => 
            {
                assert.ok(inbox.options.address);
            });
        it('Get the value of contract', async () =>
            {
                const message = await inbox.methods.message().call();
                assert.equal(message, 'Hi There!');
            });
        it('change message', async () => 
            {
                await inbox.methods.setMessage('Bye').send({from: accounts[0]})
                const message = await inbox.methods.message().call();
                assert.equal(message,'Bye');
            });
    });

