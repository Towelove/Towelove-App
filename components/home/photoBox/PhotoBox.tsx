import  { useEffect, useState } from 'react'
import { GetAlbums } from '@/services/album'
import { useAtom } from 'jotai'
import { fetchUserInfoAtom } from '@/models/store'
import { Image, ImageBackground, ImageSourcePropType, Pressable, ScrollView, Text, View } from 'react-native';
export interface AlbumsPageRespDTO {
  coupleId?: number | null;
  coverUrl?: null | string;
  createTime?: null | string;
  id?: number | null;
  title?: null | string;
  [property: string]: any;
}
// export const ScrollBox = styled.div`
//   & {
//     scrollbar-width: none;
    
//   }
//   &::-webkit-scrollbar {
//     width: 0px;
//     background-color: none;
//     scroll-behavior:smooth
//     }
// `
const PhotoBox = () => {
  const [photoUrls, setPhotoUrls] = useState<AlbumsPageRespDTO[]>([])
  const [current, setCurrent] = useState<AlbumsPageRespDTO>({})
  const [userInfo] = useAtom(fetchUserInfoAtom)
  const getAlbums = async () => {
    const params = {
      pageNo: 1,
      pageSize: 9999,
      coupleId: userInfo?.coupleId as number | string
    }
    const res = await GetAlbums(params)
    if(res.code === 200) {
      setPhotoUrls(res.data.records)
      if(res.data.records[1].coverUrl) {
        console.log('有')
        setCurrent(res.data.records[0].coverUrl)
      }else {
        const staticPhotoUrls = ['image/photoWall/1.png','image/photoWall/2.png','image/photoWall/3.png','image/photoWall/4.png','image/photoWall/5.png']
        .map(item=>({coverUrl:item,title:'My Lover'}))
        setPhotoUrls(staticPhotoUrls)
        setCurrent(staticPhotoUrls[0])
      }

    }
  }
  useEffect(() => {
    if (userInfo?.coupleId && userInfo.coupleId !== null) {
      getAlbums()
    }
  }, [])
  return (
    <ImageBackground style={{
      borderColor:'#a1b6cc',
      borderStyle:'solid'
    }} source={current.coverUrl as ImageSourcePropType}   resizeMode="cover" 
    className='w-full bg-cover bg-black min-h-[2.4rem] relative overflow-hidden mt-[0.27rem] '>
      <ScrollView className='absolute backdrop-blur-[10px] overflow-y-auto top-0 flex flex-col right-0 h-full w-[0.6rem]  px-[0.1rem] pt-[0.06rem] pb-[0.14rem]'>
        {/* {
          photoUrls.map((item: AlbumsPageRespDTO, index: number) => {
            return <Pressable style={{
              borderStyle: 'solid',
              borderColor:'#fff',
              borderWidth: item.coverUrl === current.coverUrl ? 1.5 : 0
            }} onPress={() => {
              setCurrent(item)
            }} key={index} className='transition-all duration-200 ease-in-out w-[0.4rem] h-[0.47rem] mt-[0.08rem] shrink-0 overflow-hidden rounded-[0.05rem]'>
              <Image source={item.coverUrl as string as ImageSourcePropType } className='w-full object-cover h-full rounded-[0.05rem]' alt="" />
            </Pressable>
          })
        } */}
      </ScrollView>
      {/* <Text className='absolute bottom-[0.1274rem] left-[0.2rem]  text-white leading-none'>
        {current.title}
      </Text> */}
    </ImageBackground>
  )
}

export default PhotoBox