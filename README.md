# bn2string
Provide ready-to-use display strings for BN.js instances.

## Usage
Assume we have a balance of around 12500 Tether (USDT) tokens. USDT is specified with 6 decimals.
For display in a GUI we want to have the human-readable USDT value, rounded to 2 decimals and in full precision.

```javascript
var BN = require('bn.js')
var bn2DisplayString = require('@triplespeeder/bn2string')

const value = new BN('12525652700')
const decimals = new BN('6')
const roundToDecimals = new BN('2')

var {precise, rounded} = bn2DisplayString({value, decimals, roundToDecimals})

console.log("Precise balance: " + precise + " USDT")
console.log("Rounded balance: " + rounded + " USDT")
```

Output:
```bash
[michael]$ node example.js
Precise balance: 12 525.652700 USDT
Rounded balance: 12 525.65 USDT
```

### Changing the decimal separator
By default '.' is used as decimal separator. This can be changed by providing a different symbol, e.g.
```javascript
var {precise, rounded} = bn2DisplayString({value, decimals, roundToDecimals, decimalSeparator:','})
```
Output:
```bash
[michael]$ node example.js
Precise balance: 12 525,652700 USDT
Rounded balance: 12 525,65 USDT
```

### Changing digit grouping
By default the integer digits are grouped as triplets and separated by unicode symbol ```u202F```, the "narrow no-break space" (See https://en.wikipedia.org/wiki/Decimal_separator#Digit_grouping for reasoning). This can be changed with the optional parameter 'groupSeparator':
```javascript
var {precise, rounded} = bn2DisplayString({value, decimals, roundToDecimals, groupSeparator: ','})
```
Output:
```bash
[michael]$ node example.js
Precise balance: 12,525.652700 USDT
Rounded balance: 12,525.65 USDT

```

