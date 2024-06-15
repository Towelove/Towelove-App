import * as React from 'react';

import { Text, View } from '@/ui';
import { Avatar } from '../avatar';
import { MsgProps, testAvatar } from './index';
import { formatMsgTime } from '@/utils/time';
import { Image } from 'expo-image';
import { Images } from 'assets/images';
import MsgRabbitBg from 'assets/svg/msg-rabbit-bg';

export const RabbitMsg = (props: MsgProps) => {
  return (
    <View
      style={{ width: 161.8 }}
      className={`${props.className ? props.className : ''} relative`}
    >
      <MsgRabbitBg className='w-full'/>
      <View className="absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center">
        <Text
          style={{ paddingHorizontal: 16, marginTop: 64, height: 80 }}
          className=" w-full"
        >
          <Text
            style={{ color: '#4D5E75', fontSize: 14 }}
            className="flex flex-col"
          >
            {props.content}
            <Text
              style={{ color: '#95A4B9', fontSize: 10, bottom: 16, right: 24 }}
              className="w-full absolute text-end"
            >
              {formatMsgTime(props.createTime)}
            </Text>
          </Text>
        </Text>
      </View>
      <Avatar
        style={{ top: -8, right: -3.2 }}
        avatar={props.avatar ? props.avatar : testAvatar}
      />
      {/* <CloseIcon onClick={()=>{onDeleteMsg(id)}} className='top-[-0.5rem] right-[-0.2rem] closeIcon max-md:top-[-0.08rem] max-md:right-[-0.032rem]'/> */}
    </View>
  );
};
