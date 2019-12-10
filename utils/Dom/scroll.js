export function GetScreenHeight () {
  let d = document.createElement('div')
  let rect = {}
  d.style.height = '100vh'
  d.style.opacity = 0

  if (document) {
    document.body.appendChild(d)
    rect = d.getBoundingClientRect()
    document.body.removeChild(d)
  }

  return rect['height']
}

// 获取元素顶部高度
export function GetElementTop (elem) {
  if (elem && document) {
    return elem.getBoundingClientRect()['top']
  }
  return undefined
}

let tempScreenHeight = null
export function IsElementShow (elem, offset = -200) {
  if (elem) {
    if (tempScreenHeight === null) {
      tempScreenHeight = GetScreenHeight()
    }

    let top = GetElementTop(elem)
    return (top + offset) < tempScreenHeight
  }
}

let onWheelEvent = null
export function WhenScroll (cbfn) {
  let isBinded = false
  if (document && document.onwheel) {
    if (isBinded) return
    document.onwheel = cbfn
  }
  if (document && document.addEventListener) {
    if (isBinded) return
    document.addEventListener('scroll', cbfn)
    onWheelEvent = cbfn
  }
}

export function UnbindWhenScroll () {
  if (document && document.addEventListener && document.removeEventListener) {
    document.removeEventListener('scroll', onWheelEvent)
  }
  if (document) {
    document.onwheel = null
  }
}

export function ScrollToHeader (tag) {
  if (!tag) return

  // back to top
  if (document) {
    let elem = document.querySelector(tag)
    // console.log(elem)
    if (elem) {
      elem.scrollIntoView()
    }
  }
}
