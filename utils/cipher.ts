import { LOVE_CIPHER_KEY } from "@/config/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
// 获取加密后的数据 
export const cipher = (value:any) => {
  const cipherData = CryptoJS.AES.encrypt(JSON.stringify(value), LOVE_CIPHER_KEY).toString();
  return cipherData
}
// 加密存储localStorage，value为存储的值，name为存储名
export const cipherLocal = async(name: string, value: string) => {
  const cipherData = CryptoJS.AES.encrypt(JSON.stringify(value), LOVE_CIPHER_KEY).toString();
  await AsyncStorage.setItem(name, cipherData)
}
//解密获取存储localStorage的value
export const retrievedLocal = async (name: string) => {
  const item = await AsyncStorage.getItem(name)
  if(!item) return 
  const retrievedData = item
  // 解密
  const bytes = CryptoJS.AES.decrypt(retrievedData as string | any, LOVE_CIPHER_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData
}
export const getLocal = async(value:any) => {
  const item = await AsyncStorage.getItem(value)
  if(item) {
    return true
  }
  return false
}
// 加密某个数据
export const encryption = (value:any) => {
  const key = CryptoJS.AES.encrypt(value, LOVE_CIPHER_KEY).toString();
  return key
}