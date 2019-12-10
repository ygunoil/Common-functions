/* eslint-disable */
import getWechatJssdkAuth from './getWechatJssdkAuth.js'

export function changeShareMessage (msg) {
  let {
    title,
    link,
    desc,
    imgUrl,
  } = msg

  console.log('changeShareMessage')
  console.log(wx)

  getWechatJssdkAuth(res => {
    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success () {
      // 用户确认分享后执行的回调函数
      },
      cancel () {}
    })

    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success () {
      // 用户确认分享后执行的回调函数
      },
    })
    wx.onMenuShareQQ({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      success () {
      // 用户确认分享后执行的回调函数
      },
      cancel () {
      // 用户取消分享后执行的回调函数
      }
    })

    wx.onMenuShareWeibo({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      success () {
      // 用户确认分享后执行的回调函数
      },
      cancel () {
      // 用户取消分享后执行的回调函数
      }
    })

    wx.onMenuShareQZone({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      success () {
      // 用户确认分享后执行的回调函数
      },
      cancel () {
      // 用户取消分享后执行的回调函数
      }
    })
  })
}