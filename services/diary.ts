import request from "@/utils/request"
export interface DiaryImageDto {
  createTime?: null | string;
  id?: number | null;
  url?: null | string;
  position?: {x:string|number,y:string|number}
  [property: string]: any;
}
export interface IDiary {
  id?: number|string,
  title?: string,
  diaryCollectionId?: string|number
  content:string|any,
  synchronous?: boolean,
  images?: DiaryImageDto[],
  updateTime?: string
  share?: boolean
  [property: string]: any;
}
export interface CreateDiary {
  content?: null | string;
  //日记册id
  diaryCollectionId?: number | null;
  images?: DiaryImageDto[] | any[];
  synchronous?: boolean | null;
  title?: null | string;
  [property: string]: any;
}
export interface IDiaries {
  coupleId?: number | null;
    cover?: null | string;
    createTime?: null | string;
    id?: number | null | string;
    status?: number | null;
    title?: null | string;
    share?: boolean
    userId?: number | null;
    [property: string]: any;
}
export interface CommonPageParams {
  pageNo: number,
  pageSize: number,
  coupleId: number
}
export interface CreateDiaries {
  cover?: null | string;
  title?: null | string;
  [property: string]: any;
}

//小记一下
export const shorthand = async (content: string) => {
  return request(`/v1/loves/diary/quick`, {
    method:'post',
    data: content,
  })
}
// 分页得到日记册信息
export const getDiaries = async (pageNo:number,pageSize:number) => {
  return request(`/v1/loves/diaries/page?pageNo=${pageNo}&pageSize=${pageSize}`,{
    method:'get',
  })
}
// 创建日记册
export const createDiaries = async(data:CreateDiaries) => {
  return request(`/v1/loves/diaries`,{
    method:'post',
    data
  })
}
// 按照日记册ID获得日记标题集合
export const getDiaryDesc = async(id:string|number) => {
  return request(`/v1/loves/diaries/${id}`,{
    method:'get'
  })
}
// 获取情侣共享相册
export const getShareDiary = async() => {
  return request(`/v1/loves/diaries/syn-collection`,{
    method:'get'
  })
}
// 获取情侣共享日记缩略信息
export const getShareDiaryInfo = async() => {
  return request(`/v1/loves/diaries/synchronous`,{
    method:'get'
  })
}
// 根据日记Id获取日记详情
export const getDiaryDetail = async(id:number|string) => {
  return request(`/v1/loves/diary?id=${id}`,{
    method:'get'
  })
} 
// 日记同步开关
export const synchronousDiary = async(id:string|number,synchronous:boolean) => {
  return request(`/v1/loves/diary/sync?id=${id}&synchronous=${synchronous}`,{
    method:'post'
  })
}
// 创建日记
export const createDiary = async(data:CreateDiary) => {
  return request(`/v1/loves/diary`,{
    method:'post',
    data
  })
}
// 修改日记
export const updateDiary = async(data:IDiary) => {
  return request(`/v1/loves/diary/update`,{
    method:'post',
    data
  })
}