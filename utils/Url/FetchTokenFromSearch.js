import * as LoginUtils from '~/components/common/Login.js'
import * as SearchParser from '~/utils/Url/SearchParser.js'

// FetchTokenFromSearch
export default function FetchTokenFromSearch (tokenKeyName = 'token') {
  let searchString = ''
  try {
    searchString = location.search
  } catch (err) {
    if (err) {}
  }

  let d = SearchParser.Parse(searchString)
  let token = d[tokenKeyName]
  LoginUtils.SetLoginTokenAfterCheck(token)
}