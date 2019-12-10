
const SECOND = 1000
const MINUTE = 1000 * 60
const HOUR = 1000 * 60 * 60
const DAY = 1000 * 60 * 60 * 24
const WEEK = 1000 * 60 * 60 * 24 * 7
const MONTH = 1000 * 60 * 60 * 24 * 30

export default function LastUpdateTime (tag) {
  let d = new Date(tag)
  let now = Date.now()

  let offset = now - d
  if (offset < SECOND) return '刚刚'
  if (offset < MINUTE) return '刚刚'

  if (offset < HOUR) {
    let m = parseInt(offset / MINUTE)
    return `${m}分钟前`
  }
  if (offset < DAY) {
    let m = parseInt(offset / HOUR)
    return `${m}小时前`
  }
  if (offset < WEEK) {
    let m = parseInt(offset / DAY)
    return `${m}天前`
  }
  if (offset < MONTH) {
    let m = parseInt(offset / WEEK)
    return `${m}周前`
  }
}