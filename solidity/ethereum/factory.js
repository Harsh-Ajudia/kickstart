import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9Dd3195A0929ef08A3D2bFAda8064B651E930044'
)

export default instance