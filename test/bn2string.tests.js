var bnToString = require('../index')
var BN = require('bn.js')
var {describe, it} = require('mocha');
var assert = require('assert');

// Us narrow non-breaking space for digit grouping, see
// https://en.wikipedia.org/wiki/Decimal_separator#Digit_grouping
const narrownbsp = '\u202F'

describe('Various decimals', function() {
    it('handles 1 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('1')
        const roundToDecimals = new BN('3')
        const expected = '5'+narrownbsp+'358'+narrownbsp+'305.2'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expected)
    })
    it('handles 6 decimals', function() {
        const value = new BN('53583052')
        const decimals = new BN('6')
        const roundToDecimals = new BN('3')
        const expected = '53.583052'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expected)
    })
    it('handles 18 decimals', function() {
        const value = new BN('1234567890123456789123456')
        const decimals = new BN('18')
        const roundToDecimals = new BN('3')
        const expected = '1'+narrownbsp+'234'+narrownbsp+'567.890123456789123456'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expected)
    })
    it('handles 0 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('0')
        const roundToDecimals = new BN('3')
        const expected = '53'+narrownbsp+'583'+narrownbsp+'052'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expected)
    })
    it('handles 2 leading zeros in fraction', function() {
        const value = new BN('123456')
        const decimals = new BN('8')
        const roundToDecimals = new BN('3')
        const expected = '0.00123456'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expected)
    })
    it('handles 10 leading zeros in fraction', function() {
        const value = new BN('123456')
        const decimals = new BN('16')
        const roundToDecimals = new BN('3')
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, '0.0000000000123456')
    })
})

describe('Rounding', function() {
    it('rounds to 1 decimal places when number has 0 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('0')
        const roundToDecimals = new BN('1')
        const expected = '53'+narrownbsp+'583'+narrownbsp+'052.0'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds to 1 decimal places when number has 1 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('1')
        const roundToDecimals = new BN('1')
        const expected = '5'+narrownbsp+'358'+narrownbsp+'305.2'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds to 6 decimal places when number has 0 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('0')
        const roundToDecimals = new BN('6')
        const expected = '53'+narrownbsp+'583'+narrownbsp+'052.000000'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds to 6 decimal places when number has 1 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('1')
        const roundToDecimals = new BN('6')
        const expected = '5'+narrownbsp+'358'+narrownbsp+'305.200000'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds to 6 decimal places when number has 3 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('3')
        const roundToDecimals = new BN('6')
        const expected = '53'+narrownbsp+'583.052000'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds to 6 decimal places when number has 6 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('6')
        const roundToDecimals = new BN('6')
        const expected = '53.583052'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds to 2 decimal places when number has 3 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('3')
        const roundToDecimals = new BN('2')
        const expected = '53'+narrownbsp+'583.05'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds down to 2 decimal places when number has 6 decimal', function() {
        const value = new BN('53583052')
        const decimals = new BN('6')
        const roundToDecimals = new BN('2')
        const expected = '53.58'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds up to 2 decimal places when number has 6 decimal', function() {
        const value = new BN('53588052')
        const decimals = new BN('6')
        const roundToDecimals = new BN('2')
        const expected = '53.59'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, expected)
    })
    it('rounds over decimal point #1', function() {
        const value = new BN('999')
        const decimals = new BN('3')
        const roundToDecimals = new BN('2')
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, '1.00')
    })
    it('rounds over decimal point #2', function() {
        const value = new BN('1999')
        const decimals = new BN('3')
        const roundToDecimals = new BN('2')
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, '2.00')
    })
    it('rounds over decimal point #3', function() {
        const value = new BN('1009')
        const decimals = new BN('3')
        const roundToDecimals = new BN('3')
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, '1.009')
    })
    it('rounds over decimal point #4', function() {
        const value = new BN('1009')
        const decimals = new BN('3')
        const roundToDecimals = new BN('2')
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, '1.01')
    })
    it('rounds over decimal point #5', function() {
        const value = new BN('1009')
        const decimals = new BN('3')
        const roundToDecimals = new BN('1')
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(rounded, '1.0')
    })
    it('rounds to 0 decimal places', function() {
        const value = new BN('1009')
        const decimals = new BN('2')
        const roundToDecimals = new BN('0')
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, '10.09')
        assert.strictEqual(rounded, '10')
    })
})

describe('Negative numbers', function() {
    it ('is signed when requested decimals less than available', function() {
        const value = new BN('-53588052')
        const decimals = new BN('2')
        const roundToDecimals = new BN('4')
        const expectedPrecise = '-535'+narrownbsp+'880.52'
        const expectedRounded = '-535'+narrownbsp+'880.5200'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
    it ('is signed when requested decimals equal available', function() {
        const value = new BN('-53588052')
        const decimals = new BN('3')
        const roundToDecimals = new BN('3')
        const expectedPrecise = '-53'+narrownbsp+'588.052'
        const expectedRounded = '-53'+narrownbsp+'588.052'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
    it ('is signed when requested decimals greater than available', function() {
        const value = new BN('-53588052')
        const decimals = new BN('4')
        const roundToDecimals = new BN('2')
        const expectedPrecise = '-5'+narrownbsp+'358.8052'
        const expectedRounded = '-5'+narrownbsp+'358.80'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
})

describe('Decimal separator', function(){
    it('use default separator when nothing provided', function(){
        const value = new BN('1200')
        const decimals = new BN('3')
        const roundToDecimals = new BN('3')
        const expectedPrecise = '1.200'
        const expectedRounded = '1.200'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
    it('uses provided separator', function(){
        const value = new BN('1200')
        const decimals = new BN('3')
        const roundToDecimals = new BN('3')
        const decimalSeparator = ','
        const expectedPrecise = '1,200'
        const expectedRounded = '1,200'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals, decimalSeparator})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
})

describe('Integer grouping', function(){
    it('use default "narrow no-break space" when nothing provided', function(){
        const value = new BN('1200000000')
        const decimals = new BN('3')
        const roundToDecimals = new BN('3')
        const separator = narrownbsp
        const expectedPrecise = '1' + separator + '200' + separator + '000.000'
        const expectedRounded = '1' + separator + '200' + separator + '000.000'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
    it('uses provided separator', function(){
        const value = new BN('1200000000')
        const decimals = new BN('3')
        const roundToDecimals = new BN('3')
        const separator = ','
        const expectedPrecise = '1' + separator + '200' + separator + '000.000'
        const expectedRounded = '1' + separator + '200' + separator + '000.000'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals, groupSeparator: separator})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
    it('allows empty string as separator', function(){
        const value = new BN('1200000000')
        const decimals = new BN('3')
        const roundToDecimals = new BN('3')
        const separator = ''
        const expectedPrecise = '1200000.000'
        const expectedRounded = '1200000.000'
        const {precise, rounded} = bnToString({value, decimals, roundToDecimals, groupSeparator: separator})
        assert.strictEqual(precise, expectedPrecise)
        assert.strictEqual(rounded, expectedRounded)
    })
})