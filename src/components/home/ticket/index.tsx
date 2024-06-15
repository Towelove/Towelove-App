import * as React from 'react';

import { Text, View } from '@/ui';
import { StyleProp, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Images } from 'assets/images';
import Cupid from 'assets/svg/cupid';
import BlueLove from 'assets/svg/blue-love';
import PinkLove from 'assets/svg/pink-love';
type Props = {
  style?: StyleProp<ViewStyle> | any
  className?: string
  [property: string]: any
};
export const Ticket = ({style,className}: Props) => {
  const [togetherDays,setTogetherDays] = React.useState(1)
  return (
    <View style={{
      height: 155,
      marginTop: 20,
      ...style
    }} className={'relative w-full'}>
      <Image source={Images.ticketBg} className='absolute top-0 left-0 w-full h-full' alt="" />
      {/* <TicketBg className='w-full h-full'/> */}
      <View style={{paddingLeft:19,paddingVertical: 5}} className='absolute top-0 left-0 w-full h-full flex flex-row items-center'>
        <Image style={{
          width: 29
        }} source={Images.code} className=' h-full object-fill cursor-pointer' alt="" />
        <View style={{paddingVertical:1,marginLeft:4}} className='flex flex-col relative h-full'>
          <Image style={{
            height:145,
            width: 268,
          }} source={Images.lineBg} contentFit='contain' className='absolute left-0' alt="" />
          <View style={{width:270,height:88}} className='flex z-10 flex-row'>
            <View style={{
              flex: 1.95,
              marginTop:26.5
            }} className=' h-full  flex flex-row justify-center items-center'>
              <View style={{width:58,height:58}} className='cursor-pointer rounded-full overflow-hidden border-[#A1B6CC] border-[1px] border-solid'>
                <Image className='w-full h-full' source={'https://avatar.iran.liara.run/public/job/doctor/male'} alt="" />
              </View>
              {/* <Image source={{uri:cupid}} className='w-[0.24rem] cursor-pointer mx-[0.045rem]' alt="" /> */}
              <Cupid style={{marginHorizontal:4}}/>
              <View style={{width:58,height:58}} className='cursor-pointer rounded-full overflow-hidden border-[#A1B6CC] border-[1px] border-solid'>
                <Image className='w-full h-full' source={'https://avatar.iran.liara.run/public/job/designer/female'} alt="" />
              </View>
            </View>
            <View style={{
              marginTop:26.5,
            }} className='flex-1 h-full cursor-pointer flex flex-col justify-center item-center text-center'>
              <Text style={{color:"#77B9FF",fontSize:14}} className='font-SansitaOne font-bold leading-none text-center'>
                Together
              </Text>
              <Text style={{color:"#FF98B1",fontSize:36,marginTop:1}} className='font-SansitaOne leading-none  text-center'>
                {togetherDays}
              </Text>
              <Text style={{marginTop:2,color:"#FF98B1",fontSize:14}} className=' font-SansitaOne leading-none text-center'>
                Day
              </Text>
            </View>
          </View>
          <View style={{width:273,height:30,marginTop:24.5}} className='z-10 flex flex-row justify-center items-center'>
            <BlueLove/>
            <PinkLove style={{marginLeft:3}}/>
            <Text style={{fontSize:14,marginHorizontal:10}} className='text-[#77B9FF] font-SansitaOne leading-none'>
            LOVE SONG
            </Text>
            <PinkLove style={{marginRight:3}}/>
            <BlueLove/>
          </View>
        </View>
      </View>
    </View>
  );
};
