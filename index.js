var BN = require('bn.js')
var assert = require('assert')

function bnToDisplayString(bignumber, decimals, roundToDecimals, decimalSeparator='.') {
    assert(BN.isBN(bignumber))
    assert(BN.isBN(decimals))
    assert(BN.isBN(roundToDecimals))

    // get full precision integer and fraction
    let divisor = new BN(10).pow(decimals)
    const preciseInteger = bignumber.div(divisor)
    const preciseFraction = bignumber.mod(divisor).abs()

    // get rounded integer and fraction
    let roundedInteger = preciseInteger
    let roundedFraction = preciseFraction
    let decimalsDiff = roundToDecimals.sub(decimals)
    if (decimalsDiff > 0) {
        // requested precision is greater than available precision.
        // => Just add trailing zeros to fraction
        roundedFraction = preciseFraction.mul(new BN(10).pow(decimalsDiff))
    } else if (decimalsDiff < 0) {
        // requested precision is less than available precision.
        // => Round down provided number to requested precision
        let roundingDivisor = new BN(10).pow(decimalsDiff.abs())
        let roundedAmount = bignumber.divRound(roundingDivisor)
        // now get whole and fraction parts
        let divisor = new BN(10).pow(roundToDecimals)
        roundedInteger = roundedAmount.div(divisor)
        roundedFraction = roundedAmount.mod(divisor).abs()
    }

    // return precise and rounded result as strings, including eventual trailing zeros
    // Use unicode character u202F ("narrow no-break space") for digit grouping, see
    // https://en.wikipedia.org/wiki/Decimal_separator#Digit_grouping
    const groupSeparator = '$1\u202F'
    let preciseString = `${preciseInteger.toString(10).replace(/(\d)(?=(\d{3})+(?!\d))/g, groupSeparator)}`
    if (decimals>0) {
        preciseString +=`${decimalSeparator}${preciseFraction.toString(10, decimals)}`
    }
    return {
        precise: preciseString,
        rounded: `${roundedInteger.toString(10).replace(/(\d)(?=(\d{3})+(?!\d))/g, groupSeparator)}${decimalSeparator}${roundedFraction.toString(10, roundToDecimals)}`,
    }
}

module.exports = bnToDisplayString