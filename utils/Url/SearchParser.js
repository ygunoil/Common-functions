// SearchParser

// 将Search拆解为对象
// '?name=a' => {name: 'a'}
export function Parse (searchStr) {
  if (!searchStr) return {}

  // searchStr = decodeURIComponent(searchStr)
  let str = searchStr[0] === '?'
    ? searchStr.substr(1)
    : searchStr

  return str.split('&').reduceRight((dict, item) => {
    let p = item.split('=')
    let p0 = decodeURIComponent(p[0] || '')
    let p1 = decodeURIComponent(p[1] || '')

    dict[p0] = p1 || ''
    dict[p0.toLowerCase()] = (p1 || '').toLowerCase()
    return dict
  }, {})
}

export function ParseAfter (searchStr) {
  if (!searchStr) return {}

  let str = searchStr[0] === '?'
    ? searchStr.substr(1)
    : searchStr

  return str.split('&').reduceRight((dict, item) => {
    let p = item.split('=')

    dict[decodeURIComponent(p[0])] = decodeURIComponent(p[1]) || ''
    return dict
  }, {})
}

// 将对象连接为字符串
// {name: 'a'} => '?name=a'
export function Join (dict, prefix = '?') {
  if (!dict) return ''
  if (typeof dict !== 'object') return ''

  let keys = keyOrder(Object.keys(dict))

  // with prefix
  return prefix +
    keys.map(key => {
      return `${key}=${dict[key] || ''}`
    }).join('&')
}

// 字母顺序
function keyOrder (list) {
  return list.sort((p, n) => {
    return p > n
  })
}
