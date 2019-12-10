// SCHEME类型
const ARTICLE = 'articleDetail'
const CONTRIBUTE = 'contributeDetail'
const AUTHOR = 'authorDetail'
const ASK = 'questiondetail'
const TAG = 'tag'

const SCHEME_HOST = 'biche://yaofache.com'
const SCHEME_DICT = {
    [ARTICLE]: `${SCHEME_HOST}?type=article&id=$id`,
    [CONTRIBUTE]: `${SCHEME_HOST}?type=contributeDetail&id=$id`,
    [AUTHOR]: `${SCHEME_HOST}?type=authordetail&id=$id`,
    [ASK]: `${SCHEME_HOST}?type=questiondetail&id=$id`,
    [TAG]: `${SCHEME_HOST}?type=tag&id=$id`,
}
// 替换参数
// 'articleDetail', ['id', 'Jonham']
// 输出 => biche://yaofache.com?type=article&id=Jonham
function replaceParams (type, replaceDict = {}) {
    let item = SCHEME_DICT[type]
    if (!item) return ''

    Object.keys(replaceDict).forEach(key => {
        let value = replaceDict[key]
        key = '$' + key
        item = item.replace(key, value)
    })

    return item
}

export function parseInnerLinkUrl (innerLinkUrl, ThisSiteOrigin = 'https://biche.yaofache.com', isForApp = false) {
    let defaultUrl = 'javascript:;'

    if (!innerLinkUrl) return defaultUrl

    let originIndex = innerLinkUrl.indexOf(ThisSiteOrigin)

    if (originIndex === 0) {
        let d = getInnerLinkParams(innerLinkUrl, ThisSiteOrigin)

        return {
            type: d.type,
            id: d['id'],
            url: isForApp ? d['forApp'] : d['forWeb'],
        }
    } else {
        // 不属于此 Origin
        let bicheDeepLink = 'biche://yaofache.com?type='
        if (innerLinkUrl.indexOf(bicheDeepLink) === 0) {
            return {
                type: '',
                id: '',
                forAppOnly: true,
                url: innerLinkUrl,
            }
        } else {
            return {
                type: '',
                url: defaultUrl,
            }
        }
    }
}

export function getInnerLinkParams (link, ThisSiteOrigin) {
    if (link.indexOf('/u/') !== -1) {
        // user link
        let d = link.match(RegExp(`^${ThisSiteOrigin}/u/([0-9a-zA-Z]+)`))

        if (!d) {
            return {
                type: 'error'
            }
        }
        let id = d[1]

        return {
            type: 'user',
            id,
            forWeb: `/u/${id}`,
            forApp: replaceParams(AUTHOR, {id}),
        }
    }

    if (link.indexOf('/a/') !== -1) {
        // article link
        let d = link.match(RegExp(`^${ThisSiteOrigin}/a/([0-9a-zA-Z]+)`))

        if (!d) {
            return {
                type: 'error'
            }
        }
        let id = d[1]

        return {
            type: 'article',
            id,
            forWeb: `/a/${id}`,
            forApp: replaceParams(ARTICLE, {id}),
        }
    }

    return {
        type: 'error'
    }
}

export function ParseArticleDeepLink (articleId) {
    if (!articleId) return 'javascript:;'

    return replaceParams(ARTICLE, {id: articleId})
}

export function ParseAuthorDeepLink (authorId) {
    if (!authorId) return 'javascript:;'

    return replaceParams(AUTHOR, {id: authorId})
}

export function ParseAskDeepLink (askId) {
    if (!askId) return 'javascript:;'

    return replaceParams(ASK, {id: askId})
}

export function ParseTagDeepLink (tagId) {
    if (!tagId) return 'javascript:;'

    return replaceParams(TAG, {id: tagId})
}

// function parseDeeplinkPramas (innerLinkUrl) {
//   let bicheDeeplink = 'biche://yaofache.com?'
//   let l = innerLinkUrl.split(bicheDeeplink)
//   if (l.length === 2) {
//     let paramsStr = l[1]

//     return {
//       params: paramsStr.split('&').map(item => {
//         return item.split('=')
//       }).reduce((d, item) => {
//         return d
//       }, {}),
//     }
//   } else {
//     return {
//       params: {},
//     }
//   }
// }
