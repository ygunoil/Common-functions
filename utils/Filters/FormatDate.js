export function FormatDate (val, type) {
  if (!val) return
  let date = new Date(val)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  // let second = date.getSeconds()

  if (type === 1) {
    return year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
  } else if (type === 2) {
    return year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day) + ' ' + (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes)
  } else if (type === 3) {
    return year + '.' + (month > 9 ? month : '0' + month) + '.' + (day > 9 ? day : '0' + day) + ' ' + (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes)
  }
}

// return string
// jointType 为日期连接格式
// substrLength 为整个标准字符串的截取长度
// centerStr 为日期和时间的中间连接符号
// length为截取长度 2018-05-11T12:12:12
// length16: 2018.05.11 12:12 [DEFAULT]
// length19: 2018.05.11 12:12:12
export function FormatDateByCut (jointType = '.', substrLength = 16, centerStr = ' ') {
  return function (dateString) {
    if (!dateString) return ''
    return dateString
      .substr(0, substrLength)
      .replace('T', centerStr)
      .replace(/-/g, jointType)
  }
}

export function FormatDateByShort (val) {
  if (!val) return ''
  return val.split('T')[0].substr(5) + ' ' + val.split('T')[1].substr(0, 5)
}

export default FormatDate