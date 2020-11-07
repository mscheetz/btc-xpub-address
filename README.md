# BTC X-Pub Address creator [![Downloads](https://img.shields.io/npm/dm/btc-xpub-address.svg)](https://npmjs.com/btc-xpub-address) [![npm version](https://img.shields.io/npm/v/btc-xpub-address.svg?style=flat)](https://www.npmjs.com/package/btc-xpub-address)

Generate a BTC Address from an x-pub.  


## Installation
```
npm i btc-xpub-address
```

## Uses
### Get one (1) random BTC Address:
```
import BtcXpubAddress from 'btc-xpub-address';

const xpub = 'your xpub';
const address = await BtcXpubAddress.getAddress(xpub);
```
### Get one (1) BTC Address at an index:
```
import BtcXpubAddress from 'btc-xpub-address';

const xpub = 'your xpub';
const index = 0;
const address = await BtcXpubAddress.getAddress(xpub, index);
```
### Get multiple BTC addresses (10):
```
import BtcXpubAddress from 'btc-xpub-address';

const xpub = 'your xpub';
const address = await BtcXpubAddress.getAddresses(xpub, 10);
```
### Get BTC addresses at provided indexes:
```
import BtcXpubAddress from 'btc-xpub-address';

const xpub = 'your xpub';
const indexes = [ 0, 1000, 10000, 1000000 ];
const address = await BtcXpubAddress.getAddressesAtIndexes(xpub, indexes);
```
For more information about BTC X-Pubs click [here](https://support.samourai.io/article/49-xpub-s-ypub-s-zpub-s)