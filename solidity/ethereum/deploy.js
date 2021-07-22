const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const dotenv = require('dotenv');
dotenv.config();
const provider = new HDWalletProvider(
    process.env.METAMASK_MNEMONIC,
    process.env.RINKEBY_URL_INFURA
)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: account })

    console.log(`deployed from ${account}`)
    console.log(`deployed to ${result.options.address}`)
}
deploy()