import CryptoJS from 'crypto-js'

export function signMessage(message: string, secret: string): string {
  return  CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, secret))
}
