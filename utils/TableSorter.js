import LodashOrderBy from 'lodash/orderBy'

const SORTER = {
  desc: [
    'desc',
    'down',
    '倒序',
  ],
  asc: [
    'asc',
    'up',
    '正序',
  ],
}
const DESC = 'desc'
const ASC = 'asc'

function isDesc (sorter) {
  return SORTER.desc.indexOf(sorter) !== -1
}
function isAsc (sorter) {
  return SORTER.asc.indexOf(sorter) !== -1
}
// 生成排序函数
// function getSorter (key, type) {
//   return function (pre, current) {
//     let preValue = pre[key]
//     let currentValue = current[key]

//     if (type === DESC) {
//       return preValue <= currentValue
//     } else {
//       return preValue > currentValue
//     }
//   }
// }
// 检查是否是排序函数
function isSorterFunction (fn) {
  if (typeof fn !== 'function') return false
  let result1 = fn(1, 2)
  let result2 = fn(2, 1)

  if (result1 !== result2 && typeof result1 === 'boolean' && typeof result2 === 'boolean') {
    return true
  } else {
    return false
  }
}

// sorter 可以为：
// 倒序 desc down
// 正序 asc  up
export default function TableSorter (list, key, sorter, mode = 'number') {
  if (!list) return list
  if (!key) return list
  if (!sorter) {
    console.error('TableSorter must receive a "sorter" parameter.')
    return list
  }

  let l = [...list]
  let first = l[0]
  if (first[key] === undefined) return list

  if (isSorterFunction(sorter)) {
    return l.sort(sorter)
  } else if (isDesc(sorter)) {
    return LodashOrderBy(list, item => mode === 'number' ? +item[key] : item[key], DESC)
  } else if (isAsc(sorter)) {
    return LodashOrderBy(list, item => mode === 'number' ? +item[key] : item[key], ASC)
  }
  return l
}