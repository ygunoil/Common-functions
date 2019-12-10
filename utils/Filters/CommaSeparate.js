// 逗号分隔
export default function CommaSeparate (value) {
  if (!value) return value
  if (typeof (+value) !== 'number') return value

  let pair = `${value}`.split('.')
  pair[0] = split(+pair[0])
  return pair.join('.')
}

function split (value) {
  let list = []
  let rest = value
  let v = value % 1000

  if (rest > 1000) {
    while (rest > 0) {
      list.unshift(v)
      rest = parseInt(rest / 1000)
      v = rest % 1000
    }
  } else {
    list.unshift(v)
  }

  list = list.map((item, index) => {
    if (index === 0) return +item
    return fillZero(item)
  })
  return list.join(',')
}

function fillZero (v) {
  return `000${v}`.substr(-3)
}

// testList = [
//   1,
//   12,
//   123,
//   1234,
//   12345,
//   123456,
//   1234567,
//   12345678,
//   123456789,
//   123450009,
//   100000000009,
//   10000000000009,
// ]
// console.log(testList.map(split))