import request, { fileRequestPost } from "@/utils/request"
export interface CommonPageParams {
  pageNo: number,
  pageSize: number,
  coupleId: number | string
}
export interface Album {
  id?: number,
  coupleId?: number,
  title?: string,
  name?: string,
  coverUrl?: string
  photoUrls?: any[] | string,
  createTime?: string
}

//分页获取相册信息
export const GetAlbums = async (params: CommonPageParams) => {
  return request(`/v1/loves/albums/page?pageNo=${params.pageNo}&pageSize=${params.pageSize}&coupleId=${params.coupleId}`, {
    method:'post',
    data: params,
    
  })
}
export const GetAlb = async (params: CommonPageParams) => {
  return request('/v1/loves/diaries/page', {
    method:'get',
    data: params
  })
}
//根据相册id查询相册详情
export const GetAlbumDetailById = async (id: string|number) => {
  return request(`/v1/loves/albums?albumsId=${id}`,{
    method:'get',
  })
}
//基于id修改
export const UpdateAlbumById = async (album: Album) => {
  return request('/v1/loves/albums',{
    method:'put',
    data: album
  })
}
//基于id删除
export const deleteAlbumById = async (id: string|number) => {
  return request(`/v1/loves/albums?albumsId=${id}`,{
    method:'delete',
  })
}
//创建相册
export const CreateAlbum = async (album: Album) => {
  return request('/v1/loves/albums',{
    method:'post',
    data: album
    // data:{
    //   "coupleId": 0,
    //   "createTime": "string",
    //   "title": "string",
    //   "coverUrl": "string",
    //   "photoUrls": "string"
    // }
  })
}
//基于id删除
export const DeleteAlbumById = async (id: number|string) => {
  return request(`/v1/albums?albumsId=${id}`,{
    method:'delete'
  })
}
//根据id批量删除
export const DeleteAlbumsByIds = async (ids: number[]) => {
  return request('/v1/albums/batch',{
    method:'delete',
    data:{
      array: ids
    }
  })
}

// 单文件上传接口
export const UploadSingleFile = async (file: File | FormData)=> {
  return fileRequestPost('/v1/loves/oss/file',
  file, {
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  })
}
// 删除oss文件接口
export const deleteFiles = async (urls:string)=> {
  return request(`/v1/loves/oss/files?urls=${urls}`,{
    method:'delete'
  })
}
// 多文件上传接口
export const uploadFiles = async (file: any) => {
  return request('/v1/loves/oss/files',{
    data: file,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/form-data',
    }
  })
}
// 多文件上传返回URL-Map集合

export const uploadFilesGetMap = async (file: any) => {
  return request('/v1/loves/oss/files/map',{
    data: file,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/form-data',
    }
  })
}