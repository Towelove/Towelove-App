import request, { IResponse } from "@/utils/request";
/**
 * Result«List«Message»»
 */
export interface Response {
  code?: number | null;
  data?: Message[] | null;
  msg?: null | string;
  requestId?: null | string;
}

export interface Message {
  avatarUrl?:  string;
  content?: null | string;
  coupleId?: number | null | string;
  createTime?: null | string;
  dialogStyle?: number | null;
  id?: number | null;
  userId?: number | null;
  [property: string]: any;
}
// 获取留言板信息
export const getMessagesByCoupleId = async(param:number ):Promise<Response> =>{
  return request(`/v1/loves/message/board/couple/${param}`,{
    method:'get',
  })
}
// 创建留言板信息
export const createMessages = async(data:Message ):Promise<Response> =>{
  return request(`/v1/loves/message/board`,{
    method:'post',
    data
  })
}
// 更新留言板信息
export const updateMessages = async(messageId:number,data:Message ):Promise<Response> =>{
  return request(`/v1/loves/message/board/${messageId}`,{
    method:'put',
    data
  })
}
// 删除留言板信息
export const deleteMessages = async(messageId:string ):Promise<IResponse> =>{
  return request(`/v1/loves/message/board/${messageId}`,{
    method:'delete',
  })
}