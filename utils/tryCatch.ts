import { message } from "antd"

export const handleFnTryCatch = (fn: () => any) => {
  try {
    fn()
  }catch {
    return
  }
}
// 通用处理接口res函数
export const handleRes = async (Todo:any,fn:any) => {
  const res = await Todo()
  if(res.code === 200) {
    fn(res)
  }else {
    message.warning(res.msg)
  }
}