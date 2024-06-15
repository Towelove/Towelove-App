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
        width: 232,
        height: 80,
        paddingTop: 4,
        paddingLeft: 12,
        paddingRight: 64,
        borderColor: '#ffede6',
        borderRadius: 8,
      }}
      className={`${props.className ? props.className : ''} relative`}
    >
      <BottomRabbit className="absolute bottom-0 left-0 w-full z-10" />
      <MsgGridBg className="absolute w-full h-full top-0 left-0" />
      <Avatar
        style={{
          top: -17.6,
          right: -176,
        }}
        avatar={props.avatar?props.avatar: testAvatar}
      />
      <Text className="w-full  relative">
        <Text style={{ color: '#4D5E75', fontSize: 14 }} className="">
          {props.content}
        </Text>
        <Text
          style={{ color: '#95A4B9', fontSize: 10, bottom: 8 }}
          className="absolute right-0"
        >
          {formatMsgTime(props.createTime)}
        </Text>
      </Text>
    </View>
  );
};
