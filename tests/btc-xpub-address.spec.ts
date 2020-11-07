import { expect } from "chai";
import BtcXpubAddress from "../src";

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
    context('valid address at index 0', function() {
        it('should match address', function() {
            const xpub = 'xpub6CzDCPbtLrrn4VpVbyyQLHbdSMpZoHN4iuW64VswCyEpfjM2mJGdaHJ2DyuZwtst96E16VvcERb8BBeJdHSCVmAq9RhtRQg6eAZFrTKCNqf';
            const index = 0;
            const expected = '3Kwuyq6aq64YHWyoE2C5CmA1rQLsZtGsMv';
            return BtcXpubAddress.getAddress(xpub, index)
            .then(function(address) {
                expect(address)
                .to.be.a('string')
                .that.matches(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/)
                .eq(expected);
            })
        })
    })
    context('valid address at index 1', function() {
        it('should not match index 0 address', function() {
            const xpub = 'xpub6CzDCPbtLrrn4VpVbyyQLHbdSMpZoHN4iuW64VswCyEpfjM2mJGdaHJ2DyuZwtst96E16VvcERb8BBeJdHSCVmAq9RhtRQg6eAZFrTKCNqf';
            const index = 1;
            const expected = '3Kwuyq6aq64YHWyoE2C5CmA1rQLsZtGsMv';
            return BtcXpubAddress.getAddress(xpub, index)
            .then(function(address) {
                expect(address)
                .to.be.a('string')
                .that.matches(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/)
                .not.eq(expected);
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
describe('getAddresses', () => {
    context('get requested number of addresses', function() {
        it('should return 10 addresses', function() {
            const xpub = 'xpub6CzDCPbtLrrn4VpVbyyQLHbdSMpZoHN4iuW64VswCyEpfjM2mJGdaHJ2DyuZwtst96E16VvcERb8BBeJdHSCVmAq9RhtRQg6eAZFrTKCNqf';
            const count = 10;
            return BtcXpubAddress.getAddresses(xpub, count)
            .then(function(addresses) {
                expect(addresses)
                .to.be.an('array')
                .to.have.length(10);
            })
        })
    })
    context('valid addresses', function() {
        it('should return 10 valid addresses', function() {
            const xpub = 'xpub6CzDCPbtLrrn4VpVbyyQLHbdSMpZoHN4iuW64VswCyEpfjM2mJGdaHJ2DyuZwtst96E16VvcERb8BBeJdHSCVmAq9RhtRQg6eAZFrTKCNqf';
            const count = 10;
            return BtcXpubAddress.getAddresses(xpub, count)
            .then(function(addresses) {
                addresses.forEach(addy => {
                    expect(addy)
                    .to.be.a('string')
                    .that.matches(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/);
                });
            })
        })
    })
    describe('getAddressesAtIndexes', () => {
        context('get requested number of addresses at indexes', function() {
            it('should return 5 addresses', function() {
                const xpub = 'xpub6CzDCPbtLrrn4VpVbyyQLHbdSMpZoHN4iuW64VswCyEpfjM2mJGdaHJ2DyuZwtst96E16VvcERb8BBeJdHSCVmAq9RhtRQg6eAZFrTKCNqf';
                const indexes = [ 0, 2, 4, 6, 1000000 ];
                return BtcXpubAddress.getAddressesAtIndexes(xpub, indexes)
                .then(function(addresses) {
                    expect(addresses)
                    .to.be.an('array')
                    .to.have.length(indexes.length);
                })
            })
        })
    })
})