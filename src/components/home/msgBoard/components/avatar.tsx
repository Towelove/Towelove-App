import * as React from 'react';

import { Text, View } from '@/ui';
import { Image } from 'expo-image';
import {  ViewStyle } from 'react-native';
import { testAvatar } from './getMsgBoard';

type Props = {
  className?: string,
  avatar?: string
  style?: ViewStyle
};
export const Avatar = ({className,avatar,style}: Props) => {
  return (
    <View
    style={{
      width: 35.2,
      height: 35.2,
      backgroundColor: '#98C4E8',
      borderWidth: 1,
      borderColor: '#617084',
      ...style
    }}
    className={`${
      className ? className : ''
    } flex flex-row justify-center items-center rounded-full absolute border-solid `}
  >
    <View
      style={{
        width: 28.8,
        height: 28.8,
        borderColor: '#617084',
        borderWidth: 1,
      }}
      className="rounded-full bg-pink-50  border-solid"
    >
      <Image
        source={avatar ? avatar : testAvatar}
        className="w-full h-full rounded-full"
        alt=""
      />
    </View>
  </View>)
};
