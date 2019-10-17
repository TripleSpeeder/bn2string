var BN = require('bn.js')
var assert = require('assert')

// By default use unicode character u202F ("narrow no-break space") as digit group separator, see
// https://en.wikipedia.org/wiki/Decimal_separator#Digit_grouping
function bnToDisplayString({value, decimals, roundToDecimals, decimalSeparator='.', groupSeparator='\u202F'}) {
    assert(BN.isBN(value))
    assert(BN.isBN(decimals))
    assert(BN.isBN(roundToDecimals))

    // get full precision integer and fraction
    let divisor = new BN(10).pow(decimals)
    const preciseInteger = value.div(divisor)
    const preciseFraction = value.mod(divisor).abs()

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
        let roundedAmount = value.divRound(roundingDivisor)
        // now get whole and fraction parts
        let divisor = new BN(10).pow(roundToDecimals)
        roundedInteger = roundedAmount.div(divisor)
        roundedFraction = roundedAmount.mod(divisor).abs()
    }

    // return precise and rounded result as strings, including eventual trailing zeros
    // const groupSeparator = '$1\u202F'
    let preciseString = `${preciseInteger.toString(10).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1'+groupSeparator)}`
    if (decimals>0) {
        preciseString +=`${decimalSeparator}${preciseFraction.toString(10, decimals)}`
    }
    let roundedString = `${roundedInteger.toString(10).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1'+groupSeparator)}`
    if (roundToDecimals > 0) {
        roundedString += `${decimalSeparator}${roundedFraction.toString(10, roundToDecimals)}`
    }
    return {
        precise: preciseString,
        rounded: roundedString,
    }
}

module.exports = bnToDisplayString