// History Navigator.js
// 不刷新的情况下， 更新URL
import * as SearchParser from '~/utils/Url/SearchParser.js'

// 导航, apply searchParam
export function Parse (searchParam) {
  try {
    if (!location) return
  } catch (err) {
    return ''
  }

  if (!searchParam) return
  if (typeof searchParam !== 'object') return

  let {
    pathname, search, hash
  } = location

  let searchDict = SearchParser.Parse(search)

  searchDict = {
    ...searchDict,
    ...searchParam,
  }

  return `${pathname}${SearchParser.Join(searchDict)}${hash}`
}

export function NavTo (searchParam) {
  let joint = Parse(searchParam)

  if (history) {
    // no reload update
    history.pushState({}, 'replaceSearch', joint)
  } else {
    // fallback
    location.href = joint
  }
}
