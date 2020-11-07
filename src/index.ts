/**
 * Copyright (c) 2020
 * 
 * Generate BTC addresses from an X-PUB
 * 
 * @summary BTC address generators
 * @author Matt Scheetz
 * 
 * Created at     : 2020-10-25
 * Last modified  : 2020-11-07
 */
import * as bjs from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import * as crypto from 'crypto';

class BtcXpubAddress {
  /**
   * Get a random number
   */
  private static getRandomNumber = async(): Promise<number> => {
    return new Promise((res, rej) => {
      crypto.randomBytes(256, (err, buff) => {
        if(err) {
          console.error(err);
          rej(err.message);        
        }

        const newNumber = BtcXpubAddress.bufferToNumber(buff);

        res(newNumber);
      })
    })
  }

  /**
   * Convert a Buffer to a Number
   * @param buff Buffer to convert
   */
  private static bufferToNumber = (buff: Buffer): number => {
    let newNumber = crypto.createHash("sha256")
                          .update(buff.slice(0, 16))
                          .digest()
                          .readInt16LE();

    newNumber = Math.abs(newNumber);

    return newNumber;
  }

  /**
   * Get BTC public address
   * @param xpub BTC x-pub key
   * @param addressIndex Address index
   */
  private static getBtcAddress = (xpub: string, addressIndex: number = 0) => {
    try{
      const { address } = bjs.payments.p2sh({
        redeem: bjs.payments.p2wpkh({
          pubkey: bip32
            .fromBase58(xpub)
            .derive(0)
            .derive(addressIndex).publicKey
        })
      });
      
      return address;
    } catch(err) {
      throw err;
    }
  }

  /**
   * Get a BTC address from an X-Pub
   * @param xpub BTC X-Pub
   * @param idx Address index (optional)
   */
  static getAddress = async(xpub: string, idx?: number): Promise<string> => {
    const index = typeof(idx) === 'undefined' 
        ? await BtcXpubAddress.getRandomNumber()
        : idx;

    try{
      const address = await BtcXpubAddress.getBtcAddress(xpub, index)!;

      return address?.toString();
    }catch(err){
      throw err;
    }
  }

  /**
   * Get a collection of BTC addresses from an X-Pub
   * @param xpub BTC X-Pub
   * @param numberAddresses Number of addresses to return
   */
  static getAddresses = async(xpub: string, numberAddresses: number): Promise<string[]> => {
    let addresses: string[] = [];

    for(let i = 0; i < numberAddresses; i++){
      addresses.push(await BtcXpubAddress.getAddress(xpub));
    }
    
    return addresses;
  }

  /**
   * Get a collection of BTC addresses from an X-Pub for given indexes
   * @param xpub BTC X-Pub
   * @param indexes Number of addresses to return
   */
  static getAddressesAtIndexes = async(xpub: string, indexes: number[]): Promise<string[]> => {
    let addresses: string[] = [];

    for(let i = 0; i < indexes.length; i++) {
      addresses.push(await BtcXpubAddress.getAddress(xpub, indexes[i]));
    }
    
    return addresses;
  }
}
export default BtcXpubAddress;