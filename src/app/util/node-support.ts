import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js'

export function signMessage(message: string, secret: string): string {
  return  CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, secret))

}
