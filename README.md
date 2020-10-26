# BTC X-Pub Address creator [![Downloads](https://img.shields.io/npm/dm/btc-xpub-address.svg)](https://npmjs.com/btc-xpub-address) [![npm version](https://img.shields.io/npm/v/btc-xpub-address.svg?style=flat)](https://www.npmjs.com/package/btc-xpub-address)

Generate a BTC Address from an x-pub.  


## Installation
```
npm i btc-xpub-address
```

## Uses
### Get one (1) BTC Address:
```
import BtcXpubAddress from 'btc-xpub-address';

const xpub = 'your xpub';
const address = await BtcXpubAddress.getAddress(xpub);
```
### Get multiple BTC addresses:
```
import BtcXpubAddress from 'btc-xpub-address';

const xpub = 'your xpub';
const address = await BtcXpubAddress.getAddress(xpub, 10); // Get 10 addresses from your XPUB
```
For more information about BTC X-Pubs click [here](https://support.samourai.io/article/49-xpub-s-ypub-s-zpub-s)