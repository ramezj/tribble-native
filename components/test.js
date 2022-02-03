const ethers = require('ethers');

const test = async () => {
    const connection = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/aw_ATN5yoZ578XsQUVEhaevmchG9e_iT');
    const wallet = new ethers.Wallet('0x005ba048a8021a07ae353ef05865e7259763bd41758615433e482b6417bf7f14')
    const signer = wallet.connect(connection);
    const balance = await signer.getBalance();
    console.log(balance);
}

test();