/**
 *
 * @export file转base64
 * @param {*} img File
 * @param {*} callback callback function 回调函数
 */
export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 *
 * @export base64转blob
 * @param {*} base64Data Object base64数据
 * @return {*} blob
 */
export function toBlob (base64Data:string) {
  let byteString = base64Data
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = window.atob(base64Data.split(',')[1]) // base64 解码
  } else {
    byteString = unescape(base64Data.split(',')[1])
  }
  // 获取文件类型
  const mimeString = base64Data.split(';')[0].split(':')[1] // mime类型
  const uintArr = new Uint8Array(byteString.length) // 创建视图
 
  for (let i = 0; i < byteString.length; i++) {
    uintArr[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([uintArr], {
    type: mimeString
  })
  return blob
}


