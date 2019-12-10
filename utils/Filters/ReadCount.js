// ReadCount.js
// 处理阅读数 和 文章数

const DEFAULT_DEGITS = 1
export default function ParseReadCount (val) {
  let v = parseFloat(val)
  if (v === 0) return v
  if (!v) return '0'

  if (v > 1000) {
    return (v / 1000).toFixed(DEFAULT_DEGITS) + 'K'
  }
  return v
}