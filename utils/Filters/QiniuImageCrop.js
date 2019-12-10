export function imgCrop (imgStr, maxWidth, maxHeight) {
  if (!imgStr) return imgStr

  if (imgStr.indexOf('https://static') === 0) {
    let paramStr = (maxWidth ? '/w/' + maxWidth : '') + (maxHeight ? '/h/' + maxHeight : '')

    // 已经有了 ? 或者 &
    if (imgStr.indexOf('?') !== -1 || imgStr.indexOf('&') !== -1) {
      return imgStr + `&imageView2/1${paramStr}`
    } else {
      return imgStr + `?imageView2/1${paramStr}`
    }
  }
}
export default imgCrop
