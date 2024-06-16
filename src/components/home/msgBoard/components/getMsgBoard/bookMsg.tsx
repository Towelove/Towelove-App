import * as React from 'react';
import { Text, View } from '@/ui';
import { Avatar } from '../avatar';
import { formatMsgTime } from '@/utils/time';
import MsgBookBg from 'assets/svg/msg-book-bg';
import { MsgProps, testAvatar } from './index';

export const BookMsg = (props: MsgProps) => {
  return (
    <View style={{ width: 183,height:185 }} className={`${props.className} relative`}>
      <MsgBookBg />
      <View
        style={{
          paddingLeft: 40,
          paddingRight: 24,
          paddingTop: 64,
        }}
        className=" absolute top-0 left-0  w-full "
      >
        <Text
          style={{
            color: '#4D5E75',
            fontSize: 14,
          }}
        >
          {props.content}
        </Text>
        <Text
          style={{ bottom: -18, right: 30, color: '#95a4b9', fontSize: 10 }}
          className="absolute"
        >
          {formatMsgTime(props.createTime)}
        </Text>
      </View>
      <Avatar
        style={{ top: 16, right: -11.2 }}
        avatar={props.avatar ? props.avatar : testAvatar}
      />
      {/* <CloseIcon onClick={()=>{onDeleteMsg(id)}} className='top-4 right-[-0.7rem] max-md:top-[0.16rem] max-md:right-[-0.112rem] closeIcon'/> */}
    </View>
  );
};
