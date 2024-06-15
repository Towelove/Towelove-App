import * as React from 'react';
import { Text, View } from '@/ui';
import { Avatar } from '../avatar';
import { formatMsgTime } from '@/utils/time';
import MsgBookBg from 'assets/svg/msg-book-bg';
import { MsgProps, testAvatar } from './index';

export const BookMsg = (props: MsgProps) => {
  return (
    <View style={{ width: 183 }} className={`relative`}>
      <MsgBookBg />
      <Text
        style={{
          color: '#4D5E75',
          fontSize: 14,
          paddingLeft: 40,
          paddingRight: 24,
          paddingTop: 64,
        }}
        className=" absolute top-0 left-0  w-full h-full "
      >
        {props.content}
        <Text
          style={{ bottom: 32, right: 24, color: '#95a4b9', fontSize: 10 }}
          className="absolute"
        >
          {formatMsgTime(props.createTime)}
        </Text>
      </Text>
      <Avatar
        style={{ top: 16, right: -11.2 }}
        avatar={props.avatar ? props.avatar : testAvatar}
      />
      {/* <CloseIcon onClick={()=>{onDeleteMsg(id)}} className='top-4 right-[-0.7rem] max-md:top-[0.16rem] max-md:right-[-0.112rem] closeIcon'/> */}
    </View>
  );
};
