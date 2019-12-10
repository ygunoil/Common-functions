const TAG = 'yfc_history_list'
const MAX_LENGTH = 10

export function GetList () {
  try {
    let v = localStorage[TAG]
    return JSON.parse(v) || []
  } catch (err) {
    console.log(err)
    return []
  }
}

// push item into list and keep list length less than MAX_LENGTH
export function PushItem (item, checkUnique = false) {
  try {
    if (item) {
      let lastList = localStorage[TAG] ? JSON.parse(localStorage[TAG]) : []
      if (checkUnique) {
        let index = lastList.indexOf(item)
        if (index !== -1) {
          lastList.splice(index, 1)
        }
      }
      lastList.push(item)
      let list = lastList.slice(-MAX_LENGTH)

      let str = JSON.stringify(list)
      localStorage[TAG] = str
      // 等价于 localStorage.setItem(TAG, str)
      return true
    }
    return false
  } catch (err) {
    console.log(err)
    return false
  }
}

// overwrite list
export function SetList (list) {
  try {
    if (list) {
      let str = JSON.stringify(list)
      localStorage[TAG] = str
      return true
    }
    return false
  } catch (err) {
    console.log(err)
    return false
  }
}
