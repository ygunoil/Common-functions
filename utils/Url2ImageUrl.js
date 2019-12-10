import QRCode from 'qrcode'

// URL生成图片URL
export function GenQrcodeUrl (url, cbfn, color = {}) {
  QRCode.toDataURL(
    url,
    {
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        ...color,
        // dark: '#3389FF',
        // light: '#888888',
      }
    },
    (err, imgDataUrl) => {
      if (err) {
        console.log(err)
        return
      }
      typeof cbfn === 'function' && cbfn(imgDataUrl)
    }
  )
}

export default GenQrcodeUrl
