import * as React from 'react';

import { Text, View } from '@/ui';
import BottomRabbit from 'assets/svg/bottomRabbit';
import MsgGridBg from 'assets/svg/msg-grid-bg';
import { Avatar } from '../avatar';
import { MsgProps, testAvatar } from './index';
import { formatMsgTime } from '@/utils/time';

export const GridMsg = (props: MsgProps) => {
  return (
    <View
      style={{
        width: 160,
        height: 160,
        // marginTop: 35,
        paddingTop: 14,
        paddingLeft: 12,
        paddingRight: 25,
        borderColor: '#A1B6CC',
        borderWidth:1,
        backgroundColor: '#ffede6',
        borderRadius: 22,
        position:'relative'
      }}
      className={`${props.className ? props.className : ''} relative overflow-visible`}
    >
      <BottomRabbit style={{zIndex:1}} className="absolute bottom-0 left-0 right-0 mx-auto ml-3 mr-auto" />
      <MsgGridBg className="absolute w-full h-full top-0 left-0" />
      <Avatar
        style={{
          top: -17.6,
          right: -17.6,
        }}
        avatar={props.avatar?props.avatar: testAvatar}
      />
      <View className="w-full relative">
        <Text style={{ color: '#4D5E75', fontSize: 14 }} className="">
          {props.content}
        </Text>
        <Text
          style={{ color: '#95A4B9', fontSize: 10, bottom: -16 }}
          className="absolute right-0"
        >
          {formatMsgTime(props.createTime)}
        </Text>
      </View>
    </View>
  );
};
