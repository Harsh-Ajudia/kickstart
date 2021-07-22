const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')

const buildPath = path.resolve(__dirname, 'build')
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')

console.log(`Removing old build folder: ${buildPath}`)
fs.removeSync(buildPath)

console.log(`Compiling solidity: ${campaignPath}`)
const src = fs.readFileSync(campaignPath, 'utf8')
const output = solc.compile(src, 1).contracts

fs.ensureDirSync(buildPath)

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(/:/g, '') + '.json'),
        output[contract]
    )
}