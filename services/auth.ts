import request, { fileRequestPost } from "@/utils/request"
/**
 * AuthLoginRequest
 */
export interface IRequestLogin {
  email?: null | string;
  phoneNumber?: null | string;
  /**
   * 第三方平台校验码
   */
  thirdPartyCode?: null | string;
  /**
   * qq wx phone email
   */
  type?: null | string;
  /**
   * 系统验证码
   */
  verifyCode?: null | string;
}
export interface reStockUser {
  avatar?: null | string;
  email?: null | string;
  emailVerifyCode?: null | string;
  Id?: number | null;
  nickName?: null | string;
  password?: null | string;
  phone?: null | string;
  phoneVerifyCode?: null | string;
  sex?: null | string;
}
/**
 * AuthLoginRequest
 */
export interface IRequestRegister {
  email?: null | string;
  phoneNumber?: null | string;
  /**
   * 第三方平台校验码
   */
  thirdPartyCode?: null | string;
  /**
   * qq wx phone email
   */
  type?: null | string;
  /**
   * 系统验证码
   */
  verifyCode?: null | string;
}
//注册用户
export const Register = (data: IRequestRegister) => {
  return request('/v1/auth/register',{
    method:'post',
    data
  })
}
export const Login = (data: IRequestLogin)=>{
  return request('/v1/auth/login',{
    method:'post',
    data
  }) 
}
export interface IVerifyCode {
  email?: null | string;
  phone?: null | string;
}

// 发送验证码
export const SendVerifyCode = (param: IVerifyCode) => {
  return request('/v1/auth/send-code',{
    method:'post',
    data:param
  })
}
//补充用户信息
export const restockUserInfo = async (data: reStockUser) => {
  return request(`/v1/auth/restock-info`,{
    method: 'post',
    data

  })
}
//补充用户信息-头像上传
export const restockUserInfoAvatar = async (file: FormData) => {
  return fileRequestPost(`/v1/auth/upload-avatar`,file,{
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  })
}
export const logout = async () => {
  return request('/v1/auth/logout',{
    method:'post'
  })
}