import Cookies from 'js-cookie'

// 请求
import HostUrl from '~/config/ReqHost'
import * as Req from '~/assets/js/Req'
import * as ReqUrl from '~/config/ReqUrl'

// type 1-展现  show
// type 2-点击  click
const TYPE_ENUM = {
  'show': 1,
  'click': 2,
}
export default function VisitFriendLink (AdId, type = 'show') {
  let intType = TYPE_ENUM[type] || 1
  let cookieId = getCookieId() || 'init'
  if (!AdId) return

  return Req.Post(
    `${HostUrl}${ReqUrl.GuanggaoLog}`,
    {
      AdId: AdId,
      CookieId: cookieId,
      Type: intType,
    }
  )
}
// 获取cookieId
function getCookieId () {
  const cookieTag = 'yfc_basic'
  return Cookies.get(cookieTag)
}