import * as bjs from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import * as crypto from 'crypto';

export class BtcXpubAddress {
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
   */
  static getAddress = async(xpub: string): Promise<string> => {
    const index = await BtcXpubAddress.getRandomNumber();

    try{
      const address = await BtcXpubAddress.getBtcAddress(xpub, index)!;

      return address?.toString();
    }catch(err){
      throw err;
    }
  }
}
