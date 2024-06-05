import request from "@/utils/request"
/**
 * 埋点
 */
export interface Point {
  // 用户浏览器指纹
  fingerprint?: string | null |undefined;
  // 点击事件 点击元素id
  elementId?: null | string;
  /**
   * 事件id
   * 1.统计用户点击事件
   * 2.统计用户停留时间事件
   * 3.统计用户来源事件
   */
  eventId?: number;
  /**
   * 页面停留时间
   * 页面id，可以使用url
   */
  pageId?: null | string;
  /**
   * 用户来源：1二维码扫码，2介绍页，3输入url链接
   */
  source?: number | null;
  // 页面停留时间
  stayTime?: number | null;
  [property: string]: any;
}

// 点击埋点
export const buryPoint = async (data:Point) => {
  return request('/v1/server/center/collect',{
    method:'post',
    data:{
      ...data,
      eventId: 1, //用户点击事件id
    }
  })
}
// 页面来源埋点
export const originPoint = async (source:number,fingerprint:string) => {
  return request('/v1/server/center/collect',{
    method:'post',
    data:{
      eventId: 3, //统计用户来源事件id
      source, // 用户来源：1 二维码扫码，2 介绍页，3输入url链接
      fingerprint, //包括浏览器指纹的用户信息
    }
  })
}
// 页面停留时间埋点
export const stayPoint = async (data:Point) => {
  return request('/v1/server/center/collect',{
    method:'post',
    data:{
      ...data,
      eventId: 2, //统计用户停留时间事件
    }
  })
}

// 获取全量埋点数据
export const getAllPoint = async () => {
  return request('/v1/server/center/collect',{
    method:'get',
  })
}