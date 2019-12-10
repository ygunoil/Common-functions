
// assets
import { DefaultLogo } from '~/assets/img'

export const DefaultLogoExchange = str => {
  if (!str || str === 'unknown') {
    console.log('default')
    return DefaultLogo.Exchange
  } else {
    return str
  }
}

export const DefaultLogoCurrency = str => {
  console.log(str)
  if (!str || str === 'unknown') {
    return DefaultLogo.Currency
  } else {
    return str
  }
}