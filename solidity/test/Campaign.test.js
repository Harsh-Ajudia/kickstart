const assert = require('assert')
const Web3 = require('web3')
const ganache = require('ganache-cli')

const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaign
let campaignAddress

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    factory = await web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' })

    await factory.methods.createCampaign('100')
        .send({ from: accounts[0], gas: '1000000' })

    const addresses = await factory.methods.getDeployedCampaigns().call()
    campaignAddress = addresses[0]

    
})