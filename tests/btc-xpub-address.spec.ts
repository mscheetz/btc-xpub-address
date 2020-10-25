import { expect } from "chai";
import { BtcXpubAddress } from "../src";

describe('getAddress', () => {
    context('valid address', function() {
        it('should return address', function() {
            const xpub = 'xpub6CzDCPbtLrrn4VpVbyyQLHbdSMpZoHN4iuW64VswCyEpfjM2mJGdaHJ2DyuZwtst96E16VvcERb8BBeJdHSCVmAq9RhtRQg6eAZFrTKCNqf';
            return BtcXpubAddress.getAddress(xpub)
            .then(function(address) {
                expect(address)
                .to.be.a('string')
                .that.matches(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/);
            })
        })
    })
    context('bad xpub - non-base58 character', function() {
        it('throws an error', function() {
            const xpub = 'xpubinvalid';
            return BtcXpubAddress.getAddress(xpub)
            .catch(function(err) {
                expect(function() { throw err })
                .to.throw(Error, 'Non-base58 character');
            })
        })
    })
    context('bad xpub - invalid checksum', function() {
        it('throws an error', function() {
            const xpub = 'xpubabaaadccccccaaaaa';
            return BtcXpubAddress.getAddress(xpub)
            .catch(function(err) {
                expect(function() { throw err })
                .to.throw(Error, 'Invalid checksum');
            })
        })
    })
})