import type { SysUserVo } from "@/hooks/useUser";
import request from "@/utils/request";
export interface Response {
  code?: number | null;
  data?: SysUserVo;
  msg?: null | string;
  requestId?: null | string;
}
export interface User {
  avatar?: null | string;
  email?: null | string;
  nickName?: null | string;
  password?: null | string;
  phoneNumber?: null | string;
  sex?: null | string;
  smtpCode?: null | string;
  userName?: null | string;
}

// 获取用户信息
export const getUserInfo = async() =>{
  return request(`/v1/user/sys`,{
    method:'get',
  })
}

//更新用户信息
export const updateUserInfo = async (data: User) => {
  return request(`/v1/user/sys`,{
    method: 'put',
    data

  })
}
// 获取情侣在一起的总天数
export const getTotalDays = async ()=>{
  return request('/v1/user/couples/together',{
    method:'get'
  })
}
// 获取用户签到总天数
export const getSignInTotal = async ()=>{
  return request('/v1/user/sign-in',{
    method:'get'
  })
}
// 获取用户当月签到总天数
export const getSignInTotalMonth = async (param: any)=>{
  return request(`/v1/user/sign-in/month?date=${param}`,{
    method:'get'
  })
}
// 用户签到
export const SignInToday = async ()=>{
  return request(`/v1/user/sign-in`,{
    method:'post'
  })
}


// 伴侣邀请
export const inviteCouple = async (data : {
    coupleEmail?: string;
    couplePhone?: string;
})=>{
  return request(`/v1/user/invited`,{
    method:'post',
    data
  })
}
// 邀请二维码
export const getInviteQRCode = async() => {
  return request('/v1/user/invited/qr',{
    method:'post'
  })
}
//通过邀请码绑定情侣信息
export const bindingCouple = async(invitedCode: string) => {
  return request('/v1/user/couples/invited',{
    method:'post',
    data:{
      invitedCode
    }
  })
}