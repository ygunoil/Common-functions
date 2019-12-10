
// 文章列表  biche://yaofache.com?type=articlelist
let schemeList = [
  {
    nameCn: '我的',
    name: 'mine',
    type: 'mine',
    scheme: 'biche://yaofache.com?type=mine',
  },
  {
    nameCn: '文章列表',
    name: 'articlelist',
    type: 'articlelist',
    scheme: 'biche://yaofache.com?type=articlelist',
  },
  {
    nameCn: '发表文章',
    name: 'publisharticle',
    type: 'publisharticle',
    scheme: 'biche://yaofache.com?type=publisharticle',
  },
  {
    nameCn: '文章',
    name: 'article',
    type: 'article',
    keyword: '$ARTICLE_ID',
    scheme: 'biche://yaofache.com?type=article&id=$ARTICLE_ID',
  },
  {
    nameCn: '作者',
    name: 'authordetail',
    type: 'authordetail',
    keyword: '$AUTHOR_DETAIL_ID',
    scheme: 'biche://yaofache.com?type=authordetail&id=$AUTHOR_DETAIL_ID',
  },
  {
    nameCn: '首页',
    name: 'homePage',
    type: 'homepage',
    scheme: 'biche://yaofache.com?type=homepage',
  },
  {
    nameCn: '问答列表',
    name: 'askList',
    type: 'questionandanswer',
    scheme: 'biche://yaofache.com?type=questionandanswer',
  },
  {
    nameCn: '邀请页面',
    name: 'invite',
    type: 'invitefriends',
    scheme: 'biche://yaofache.com?type=invitefriends',
  },
  {
    nameCn: '动态',
    name: 'dynamic',
    type: 'dynamic',
    scheme: 'biche://yaofache.com?type=dynamic',
  },
  {
    nameCn: '搜索用户',
    name: 'userSearch',
    type: 'usersearch',
    scheme: 'biche://yaofache.com?type=usersearch',
  },
  {
    nameCn: '系统消息',
    name: 'systemMessage',
    type: 'systemmessage',
    scheme: 'biche://yaofache.com?type=systemmessage',
  },
  {
    nameCn: '作者详情',
    name: 'authorDetail',
    keyword: '$AUTHOR_ID',
    type: 'authordetail',
    scheme: 'biche://yaofache.com?type=authordetail&id=$AUTHOR_ID',
  },
  {
    nameCn: '提问',
    name: 'ask',
    type: 'askquestion',
    scheme: 'biche://yaofache.com?type=askquestion',
  },
  {
    nameCn: '问题详情',
    name: 'askDetail',
    keyword: '$QUESTION_ID',
    type: 'questiondetail',
    scheme: 'biche://yaofache.com?type=questiondetail&id=$QUESTION_ID',
  },
  {
    nameCn: '动态赞列表',
    name: 'dynamicPraise',
    type: 'dynamicpraise',
    scheme: 'biche://yaofache.com?type=dynamicpraise',
  },
  {
    nameCn: '动态评论列表',
    name: 'dynamicComment',
    type: 'dynamiccomment',
    scheme: 'biche://yaofache.com?type=dynamiccomment',
  },
  {
    nameCn: '动态关注列表',
    name: 'dynamicFollow',
    type: 'dynamicfollow',
    scheme: 'biche://yaofache.com?type=dynamicfollow',
  },
  {
    nameCn: '动态粉丝列表',
    name: 'dynamicFans',
    type: 'dynamicfans',
    scheme: 'biche://yaofache.com?type=dynamicfans',
  },
  {
    nameCn: '动态收藏列表',
    name: 'dynamicCollection',
    type: 'dynamiccollection',
    scheme: 'biche://yaofache.com?type=dynamiccollection',
  },
  {
    nameCn: '动态草稿列表',
    name: 'dynamicDrafts',
    type: 'dynamicdrafts',
    scheme: 'biche://yaofache.com?type=dynamicdrafts',
  },
  {
    nameCn: '动态推送列表',
    name: 'pushMessage',
    type: 'pushmessage',
    scheme: 'biche://yaofache.com?type=pushmessage',
  },
  {
    nameCn: '发表文章',
    name: 'publishArticle',
    type: 'publisharticle',
    scheme: 'biche://yaofache.com?type=publisharticle',
  },
  {
    nameCn: 'web页面',
    name: 'webpage',
    keyword: '$URL',
    type: 'webpage',
    scheme: 'biche://yaofache.com?type=webpage&link=$URL',
  },
  {
    nameCn: '我的奖励',
    name: 'myReward',
    type: 'myreward',
    scheme: 'biche://yaofache.com?type=myreward',
  },
  {
    nameCn: '话题详情',
    name: 'tagDetail',
    keyword: '$TAG_ID',
    type: 'tag',
    scheme: 'biche://yaofache.com?type=tag&id=$TAG_ID',
  },
]

let list = [
  ...schemeList,
]
// 英文名字典
let nameDict = list.reduce((dict, item) => {
  let { name } = item
  dict[name] = item

  return dict
}, {})

// 中文名字典
let cnNameDict = list.reduce((dict, item) => {
  let { nameCn } = item
  dict[nameCn] = item

  return dict
}, {})

export function FindByName (name) {
  return nameDict[name] ? nameDict[name] : {}
}
export function FindByNameCn (cnName) {
  return cnNameDict[cnName] ? cnNameDict[cnName] : {}
}
export default {
  ...nameDict,

  FindByName,
  FindByNameCn,
}
