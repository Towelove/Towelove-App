import * as React from 'react';

import {  Text } from '@/ui';
import { Image, ImageBackground } from 'expo-image';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {};

export interface AlbumsPageRespDTO {
  coupleId?: number | null;
  coverUrl?: null | string;
  createTime?: null | string;
  id?: number | null;
  title?: null | string;
  [property: string]: any;
}
const mockData = [
  {
    coverUrl: 'https://avatar.iran.liara.run/public/job/designer/female',
    title: 'my love',
  },
  { coverUrl: 'https://avatar.iran.liara.run/public/boy', title: '爱' },
  {
    coverUrl: 'https://avatar.iran.liara.run/username?username=Scott+Wilson',
    title: '游乐园',
  },
  {
    coverUrl: 'https://avatar.iran.liara.run/public/job/police/female',
    title: '泳池派对',
  },
  {
    coverUrl: 'https://avatar.iran.liara.run/public/job/police/male',
    title: '学习记录',
  },
  {
    coverUrl: 'https://avatar.iran.liara.run/public/job/doctor/male',
    title: '美',
  },
];
export const PhotoBox = ({}: Props) => {
  const [current, setCurrent] = React.useState<AlbumsPageRespDTO>({});
  const [photoUrls, setPhotoUrls] = React.useState<AlbumsPageRespDTO[]>([]);
  React.useEffect(() => {
    setPhotoUrls(mockData);
    setCurrent({
      coverUrl: 'https://avatar.iran.liara.run/public/job/designer/female',
      title: 'my love',
    });
  }, []);
  return (
    <ImageBackground
      style={{
        height: 240,
        marginTop:18,
        borderColor:'#A1B6CC',
        borderWidth:1,
        borderRadius:20
      }}
      source={{
        uri: current.coverUrl as string,
      }}
      className="w-full border-solid bg-cover relative overflow-hidden rounded-[20px]"
    >
      <ScrollView
        style={{ top: 0, height: 238,right:0 ,width:60,paddingVertical:5,paddingHorizontal:10}}
        className="absolute backdrop-blur-[10px] rounded-r-[20px] overflow-y-auto top-0 flex flex-col h-full right-0 "
      >
        {mockData.map((item: AlbumsPageRespDTO, index: number) => {
          return (
            <Pressable
              style={{
                height: 47,
                width: 40,
                borderWidth: item.coverUrl === current.coverUrl ? 1.5 : 0,
                borderColor:
                  item.coverUrl === current.coverUrl ? 'white' : 'transparent',
                borderStyle: 'solid',
                marginTop:8
              }}
              onPress={() => {
                setCurrent(item);
              }}
              key={index}
              className="transition-all duration-75 ease-in-out  shrink-0 overflow-hidden rounded-[5px]"
            >
              <Image
                source={item.coverUrl as string}
                className="w-full object-cover h-full rounded-[5px]"
                alt=""
              />
            </Pressable>
          );
        })}
      </ScrollView>
      <Text
        style={{
          bottom: 20,
          fontSize: 20,
          left: 20
        }}
        className="absolute capitalize left-[20px] text-[20px] font-SansitaOne text-white leading-none"
      >
        {current.title}
      </Text>
    </ImageBackground>
  );
};
