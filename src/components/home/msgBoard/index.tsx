import * as React from 'react';

import { Text, View } from '@/ui';
import { Image } from 'expo-image';
import Ranbow from 'assets/svg/ranbow';
import CloudAdd from 'assets/svg/cloud-add';
import { MsgCard } from './components/getMsgBoard';
import { ScrollView } from 'react-native-gesture-handler';

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
    content: 'Job Avatar Images',
    createTime: '2024-05-11 20:20',
    id: '1',
    dialogStyle: 1
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Job Avatar Images',
    createTime: '2023-05-11 20:20',
    id: '1',
    dialogStyle: 1
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Designer Avatar Image',
    createTime: '2023-05-11 20:20',
    id: '3',
    dialogStyle:3
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Job Avatar Images',
    createTime: '2023-05-11 20:20',
    id: '1',
    dialogStyle: 1
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Designer Avatar Image',
    createTime: '2023-05-11 20:20',
    id: '3',
    dialogStyle:3
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Designer Avatar Image',
    createTime: '2023-05-11 20:20',
    id: '3',
    dialogStyle:3
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Designer Avatar Image',
    createTime: '2023-05-11 20:20',
    id: '3',
    dialogStyle:3
  },
  {
    avatarUrl: 'https://avatar.iran.liara.run/public/job/doctor/female',
    content: 'Job Avatar Images',
    createTime: '2023-05-11 20:20',
    id: '1',
    dialogStyle: 1
  },
];
export const MsgBoard = ({}: Props) => {
  return (
    <ScrollView
      style={{
        // bg-[linear-gradient(180deg,#FFE5F3_-22.33%,#FFFBFD_51.54%)]
        backgroundColor: '#fff5fa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // marginTop: 90,
        paddingTop:20,
        // paddingHorizontal: 24,
        paddingLeft: 24,
        paddingRight: 12
      }}
      className="w-full h-full relative overflow-visible  min-h-screen"
    >
      <View style={{marginTop:35,paddingBottom:250,gap:40}} className="flex flex-wrap flex-row w-full overflow-visible items-center ">
        {msgList.map((item: any, index) => {
          return (
            <MsgCard
              className={(index + 1) % 2 === 0 ? 'ml-auto mr-5' : ''}
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
    </ScrollView>
  );
};
