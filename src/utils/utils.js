import { KEYUTIL, KJUR, hextob64 } from "jsrsasign"
import Conf from "../config.json"

function EncryptOAEP(text) {
  let pubKey = KEYUTIL.getKey(Conf.publicKey)
  let hexData = KJUR.crypto.Cipher.encrypt(text, pubKey, "RSAOAEP256")
  return hextob64(hexData)
}

export { EncryptOAEP }
