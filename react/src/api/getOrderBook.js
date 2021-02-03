import _ from 'lodash';

const fetchCrypto = url => fetch(url, {
    headers: {
        'accept': 'application/json'
    }
})
.then(res => res.json())
.then((info) => {
    return info;
})
.catch(error => {
    return error;
});

export const getOrderBook = (cryptoName) => {
    const btcUrl = `https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5000`;
    const ethUrl = `https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=5000`;
    const xrpUrl = `https://api.binance.com/api/v3/depth?symbol=XRPUSDT&limit=5000`;

    return Promise.all([
        fetchCrypto(btcUrl),
        fetchCrypto(ethUrl),
        fetchCrypto(xrpUrl)
    ]);
}
