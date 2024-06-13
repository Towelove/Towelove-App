import axios from 'axios';
import JSONBigInt from 'json-bigint'

const JSONBigIntStr = JSONBigInt({
  storeAsString:true
})

export const client = axios.create({
  baseURL: 'https://web.towelove.cn/api',
  withCredentials: true,
  timeout: 10000,
  responseType: 'json',
  headers: {
    "Access-Control-Allow-Origin" : "*",
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  transformResponse:[(data)=>{
    return JSONBigIntStr.parse(data)
  }]
});
