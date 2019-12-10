const DEFAULT_DIGITS = 2
// 小于1的保留位数
const DEFAULT_DIGITS_ZERO = 8

const WAN = 10000
const WAN_CHN = '万'
const YI = 100000000
const YI_CHN = '亿'
const WAN_YI = WAN * YI
const WAN_YI_CHN = '万亿'

export function CurrencyFormat (v, defaultDegits = DEFAULT_DIGITS, underOneDecimalCount = DEFAULT_DIGITS_ZERO) {
  if (!v) return '?'

  let value = parseFloat(v)
  // if (typeof v === 'string') value = +v
  if (!value) return value

  // 如果小于1
  if (value < 1) return toFixed(value, underOneDecimalCount)
  if (value < WAN) return toFixed(value, defaultDegits)
  // if (value >= WAN) return toFixed(value / WAN, defaultDegits) + WAN_CHN
  if (value < YI) return toFixed(value / WAN, defaultDegits) + WAN_CHN
  if (value < WAN_YI) return toFixed(value / YI, defaultDegits) + YI_CHN
  return toFixed(value / WAN_YI, defaultDegits) + WAN_YI_CHN
}

function toFixed (v, defaultDigits = DEFAULT_DIGITS) {
  return v.toFixed(defaultDigits)
}

function toFixed8 (v) {
  return v.toFixed(8)
}

export function PriceFormat (v) {
  if (!v) return v
  let value = v
  if (typeof v === 'string') value = +v
  if (!value) return v

  if (value > 1) return toFixed(value)
  if (value > 0) return toFixed8(value)
  return toFixed(value)
}

// 转换为数字
export function Parse (value) {
  if (!value) return value

  if (typeof value === 'number') return value
  if (typeof value !== 'string') return value
  // str
  let v = value.replace(',', '')
  return parseFloat(v)
}

// 指定位数
export function WithDecimalsCount (decimalCount = DEFAULT_DIGITS, underOneDecimalCount = DEFAULT_DIGITS_ZERO) {
  return function (v) {
    return CurrencyFormat(v, decimalCount, underOneDecimalCount)
  }
}

export default CurrencyFormat
