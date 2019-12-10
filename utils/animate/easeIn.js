// 返回比例
/* 返回的函数
 * time 是次数，返回一个值
 * function each (time) {
 *
 * }
*/

function pow3 (x) {
  return Math.pow(x, 3)
}
// 从1开始，到max个数字
// 返回一个比例 [0, 1]
export function EaseInFactory (max = 100) {
  let xList = []
  let from = 1
  while (from <= max) {
    xList.push(from)
    from += 1
  }
  let yList = xList.map(pow3)
  let maxY = yList[yList.length - 1]
  let i = 1

  return function (time) {
    let index = (time && time <= max) ? time : i - 1
    i = i + 1
    return yList[index < max ? index : (max - 1)] / maxY
  }
}
