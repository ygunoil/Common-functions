export function IsBicheApp (href, ua) {
  if (!href) return false

  if (ua) {
    if (ua.toLowerCase().indexOf('biche_') !== -1) return true
  }

  let url = href.toLowerCase()
	console.log(url)
  // 带有client字段
  return url.indexOf('client=ios') !== -1 || url.indexOf('clientid=android') !== -1
}

export function IsBicheAppNative (ua) {
  if (!ua) return false

  let uaStr = ua.toLowerCase()

  // 带有client字段
  return uaStr.indexOf('biche_') !== -1
}

export function IsBicheAppIos (href, ua) {
  if (!href) return false
  if (ua) {
    let lowerStr = ua.toLowerCase()
    if (lowerStr.indexOf('biche_') !== -1 && lowerStr.indexOf('iphone') !== -1) {
      return true
    }
  }
  let url = href.toLowerCase()

  // 带有client字段
  return url.indexOf('client=ios') !== -1
}

// fallbackUrl 出问题的回退跳转地址
// duration 跳转延时
export function DeepLinkHandler (fallbackUrl, duration = 1500) {
  let successList = []
  let failList = []
  let isCancelled = false

  // document.visibilityState
  let counter = setTimeout(() => {
    if (isCancelled) return
    if (document.visibilityState === 'hidden' || document.visibilityState !== 'visible') return

    location.href = fallbackUrl
  }, duration)

  return {
    Cancel () {
      isCancelled = true
      clearTimeout(counter)

      return this
    },
    OnSuccess (fn) {
      if (isCancelled) return
      if (typeof fn === 'function') successList.push(fn)

      return this
    },
    OnFail (fn) {
      if (isCancelled) return
      if (typeof fn === 'function') failList.push(fn)

      return this
    },
  }
}