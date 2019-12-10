export default function _IsMobile (userAgent = '') {
  try {
    if (!userAgent) return false

    let ua = userAgent.toLowerCase()
    if (ua.indexOf('android') !== -1 || ua.indexOf('iphone') !== -1) {
      return true
    }
    return false
  } catch (err) {
    if (err || 'ignore') {
      return false
    }
  }
}

export function GetUserAgent (req = {}) {
  let headers = req.headers || {}
  return headers['user-agent'] || ''
}

export function IsWechat (ua) {
  if (!ua) return false

  ua = ua.toLowerCase()
  return ua.match(/MicroMessenger/i)
}

export const IsMobile = _IsMobile