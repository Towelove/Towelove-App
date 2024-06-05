import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

import { proBasePath, basePath, LOVE_TOKEN_NAME, LOVE_COUPLE_ID } from '@/config/constant';

import JSONBigInt from 'json-bigint'
import { getLocal, retrievedLocal } from './cipher';

const JSONBigIntStr = JSONBigInt({
  storeAsString:true
})
// http 状态码
const statusMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',

};

// 业务状态码
const codeMessage: Record<number, string> = {
  0: '成功',
  500: '服务器内部错误',
  404: '未知错误',
  10000400: '非法请求',
  10000887: '无效登录态',
  20000004: '无权访问',
};
export interface IResponse {
  code?: number | null;
  data?: any;
  msg?: null | string;
  requestId?: null | string;
  status?: any
  statusText?: any
}
export const DevTestToken = '52cbc3f2-a3ea-4d3b-8c52-3699560c10c2'
// 业务状态码统一处理器
const bizCodeHandler = async (response: IResponse) => {

  // 非json响应直接返回，不判断业务状态码，也没有业务状态码
  if (
    //@ts-ignore
    !response.headers.has('content-type') ||
    //@ts-ignore
    !response.headers.get('content-type')?.includes('application/json')
  ) {
    return response.data;
  }

  //@ts-ignore
  const res = response.data
  if (res && res.code !== 0) {
    if(res.code === 201) {
      // 未完善信息
      return Promise.resolve(res);
    }
    if (res.msg) {
      // 这里做错误提示
      // message.error(data.msg);
      return Promise.resolve(res);
    } else if (codeMessage[res.code]) {
      console.log(codeMessage[res.code]);
      return Promise.resolve(res);
    }
    //10086 待定替换
    if (res && res.code === 10086) {
      history.pushState(null, '', `/login`);
    }
  }

  return Promise.resolve(res);
};

/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */
const errorHandler = (error: { response: IResponse }): IResponse => {
  const { response } = error;
  if (response && response.status) {
    const errorText = statusMessage[response.status] || response.statusText;
    console.log(errorText, '请求失败')
  } else if (!response) {
    console.log('网络异常,连接服务器失败')
  }
  return response;
};


export const instance = axios.create({
  withCredentials: true,
  baseURL: false? basePath+'api' : proBasePath, //开发模式跨域使用vite配置 生产模式直接请求同源地址
  // baseURL: import.meta.env.DEV? proBasePath : proBasePath, //开发模式跨域使用vite配置 生产模式直接请求同源地址
  timeout: 20000,
  responseType: 'json',
  headers: {
    "Access-Control-Allow-Origin" : "*",
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  transformResponse:[(data)=>{
    return JSONBigIntStr.parse(data)
  }]
  // withCredentials: true,
})
export const instanceNumber = axios.create({
  withCredentials: true,
  baseURL: false? basePath+'api' : proBasePath, //开发模式跨域使用vite配置 生产模式直接请求同源地址
  // baseURL: import.meta.env.DEV? proBasePath : proBasePath, //开发模式跨域使用vite配置 生产模式直接请求同源地址
  timeout: 10000,
  responseType: 'json',
  headers: {
    "Access-Control-Allow-Origin" : "*",
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },

  // withCredentials: true,
})

instance.interceptors.response.use(bizCodeHandler, (error) => {

  return Promise.resolve(error);
});
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const tokenName = LOVE_TOKEN_NAME
    const coupleName = LOVE_COUPLE_ID
   
    // 登录后local如果有token，加入请求参数中
    let localToken:any
    let localCoupleId:any
    getLocal(tokenName).then(local=>{
      if(local) {
        localToken = retrievedLocal(tokenName)
      }
      // local如果有CoupleId，加入请求参数中
      
      if(local) {
        localCoupleId = retrievedLocal(coupleName)
      }
      if (localToken) {
        config.headers.set("Authorization", localToken as string,)
        if(localCoupleId){
          config.headers.set("X-USER-COUPLE", localCoupleId,)
        }
        return config
      }
    })
    return config;
  },
  errorHandler
);
const request = async (url: string,config: AxiosRequestConfig) => {
  const res:IResponse = await instance(url,config)
  return res
}
// 不走json-bigint渠道
export const requestAsNumber = async (url: string,config: AxiosRequestConfig) => {
  const res:IResponse = await instanceNumber(url,config)
  return res
}
// 文件上传专用渠道
export const fileRequestPost = async (url:string,data:File | FormData,config:AxiosRequestConfig) => {
  const res:IResponse = await instance.post(url,data,config)
  return res 
}
export default request;
