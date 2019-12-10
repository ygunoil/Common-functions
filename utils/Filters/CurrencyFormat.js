const DEFAULT_DIGITS = 2

const WAN = 10000
const WAN_CHN = '万'
const YI = 100000000
const YI_CHN = '亿'
const WAN_YI = WAN * YI
const WAN_YI_CHN = '万亿'

export function CurrencyFormat (v) {
  if (!v) return '?'
  let value = v
  if (typeof v === 'string') value = +v
  if (!value) return v

  if (value < WAN) return toFixed(value)
  // if (value >= WAN) return toFixed(value / WAN) + WAN_CHN
  if (value < YI) return toFixed(value / WAN) + WAN_CHN
  if (value < WAN_YI) return toFixed(value / YI) + YI_CHN
  return toFixed(value / WAN_YI) + WAN_YI_CHN
}

function toFixed (v) {
  return v.toFixed(DEFAULT_DIGITS)
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

export default CurrencyFormat