import request from "@/utils/request"

export interface Response {
  code?: number | null;
  data?: any[] | null;
  msg?: null | string;
  requestId?: null | string;
}
export interface TodoListResponse {
  /**
     * 完成日期
     */
  completionDate?: null | string |undefined;
  /**
   * 用户id  user_id  loves_id
   */
  coupleId?: number | null | string;
  /**
   * 截止日期
   */
  deadline?: null | string;
  /**
   * 描述
   */
  description?: null | string;
  id?: number | null | string;
  msgTaskId?: number | null | string;
  reminder?: boolean | null | string;
  /**
   * 标题
   */
  title?: null | string;
  widget?: boolean | null;
  status?: number|string|null
  [property: string]: any;
}
// 获取代办
export const getTodoListByCoupleId = async( ):Promise<Response> =>{
  return request(`/v1/loves/todo/page`,{
    method:'get',
  })
}
//创建代办
export const createTodoList = async(data:TodoListResponse ):Promise<Response> =>{
  return request(`/v1/loves/todo`,{
    method:'post',
    data
  })
}
//更新代办
export const updateTodoList = async(data:TodoListResponse ):Promise<Response> =>{
  return request(`/v1/loves/todo`,{
    method:'put',
    data
  })
}
// 删除代办
export const deleteTodoList = async(id:string|number ):Promise<Response> =>{
  return request(`/v1/loves/todo?todoId=${id}`,{
    method:'delete',
  })
}

