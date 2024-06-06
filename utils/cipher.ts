import AsyncStorage from "@react-native-async-storage/async-storage";
// 获取加密后的数据 
export const cipher = (value:any) => {
  return value
}
// 加密存储localStorage，value为存储的值，name为存储名
export const cipherLocal = async(name: string, value: string) => {
  await AsyncStorage.setItem(name, value)
}
//解密获取存储localStorage的value
export const retrievedLocal = async (name: string) => {
  const item = await AsyncStorage.getItem(name)
  if(!item) return 
  return item
}
export const getLocal = async(value:any) => {
  const item = await AsyncStorage.getItem(value)
  if(item) {
    return item
  }
  return ''
}
// 加密某个数据
export const encryption = (value:any) => {
  return value
}