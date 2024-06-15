import * as React from 'react';

import { Text, View } from '@/ui';
import { Image } from 'expo-image';
import Ranbow from 'assets/svg/ranbow';
import CloudAdd from 'assets/svg/cloud-add';
import { MsgCard } from './components/getMsgBoard';

type Props = {};
const msgList = [
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Job Avatar Images',
    createTime: '2024-05-11 20:20',
    id: '1',
    dialogStyle: 1
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/male',
    content: 'Police Avatar Image',
    createTime: '2024-05-11 20:20',
    id: '2',
    dialogStyle: 2
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Designer Avatar Image',
    createTime: '2024-05-11 20:20',
    id: '3',
    dialogStyle:3
  },
];
export const MsgBoard = ({}: Props) => {
  return (
    <View
      style={{
        // bg-[linear-gradient(180deg,#FFE5F3_-22.33%,#FFFBFD_51.54%)]
        backgroundColor: '#FFE5F322',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 90,
        paddingHorizontal: 24,
      }}
      className="w-full relative  min-h-screen"
    >
      <View
        style={{ width: 139, height: 149, top: -63, right: 25, zIndex: 10 }}
        className="absolute"
      >
        {/* <Image className='w-full h-full' src={ranbow} alt="" /> */}
        <Ranbow className="w-full h-full" />
        {/* <Image src={add} className='absolute w-[0.53rem] h-[0.36rem] bottom-[-0rem] left-[0.582rem] cursor-pointer' alt="" /> */}
        <CloudAdd
          style={{
            width: 53,
            height: 36,
            bottom: 0,
            left: 58.2,
          }}
          className="absolute"
        />
      </View>
      {/* <Image
        className="absolute top-0 left-0 ring-0 bottom-0 w-[50%] ml-[20%] mr-[25%] mt-[10%]"
        src={bg}
        alt=""
      /> */}
      <View className="flex flex-wrap flex-row w-full pb-[0.6rem] gap-[0.4rem] items-center ">
        {msgList.map((item: any, index) => {
          return (
            <MsgCard
              className={(index + 1) % 2 === 0 ? 'ml-auto' : ''}
              key={`msgBoard-${index}`}
              avatar={item.avatarUrl}
              style={item.dialogStyle}
              content={item.content}
              id={item.id}
              createTime={item.createTime}
              onDeleteMsg={() => {}}
            />
          );
        })}
      </View>
      {/* <Dialog open={open} setOpen={setOpen} onFinish={handleFinish} /> */}
    </View>
  );
};
