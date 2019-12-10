

/* eslint-disable */
// import * as Req from '@/api/index.js'
// import * as Req from '@/assets/js/Req'
import Req from 'axios'

export default function getWechatJssdkAuth (cbfn = x => x) {
  // 禁用分享
  let pageUrl = location.href.split('#')[0]
  // let pageUrl = 'https://candy.yaofache.cn/'
  console.log(`pageUrl: ${pageUrl}`)

  let postUr = 'https://candy.yaofache.cn/auth-api?url=' + pageUrl

  Req.get(postUr).then(result => {
    let jsConfig = result.data.data

    let configs = {
      // debug: true,
      debug: false,
      appId: jsConfig.appId,
      timestamp: jsConfig.timestamp,
      nonceStr: jsConfig.noncestr,
      signature: jsConfig.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
      ]
    }
    console.log(configs)

    wx.config(configs)
    wx.ready(function () {
      console.log('wx.ready')
      try {
        cbfn && cbfn()
      } catch(err) {
        console.log(err)
      }
    })
    wx.error(function (res) {
      // 出错时 调用接口，重新授权。
      console.log(res)
    })
  })
}
