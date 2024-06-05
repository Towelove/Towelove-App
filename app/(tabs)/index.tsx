import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Text,Platform, ScrollView,View } from 'react-native';
import Logo from '@/assets/svg/logo.svg'
import PhotoBox from '@/components/home/photoBox/PhotoBox';
export default function TabHome() {
  return (
    <ScrollView className='w-full mt-[30px]'>
     <View className='w-screen min-h-screen pt-[0.12rem] px-[0.23rem]'>
      <Logo />
      <View className='w-full h-full flex flex-col items-center'>
        {/* 照片墙 */}
         {/* <PhotoBox /> */}
        {/* <PhoneTicket />
        <CAndT />
        <div className='flex mt-[28px] justify-between '>
          <ClockLayout />
          <WeatherLayout className='ml-[0.22rem]' />
        </div>
       <MsgBoardPhone/> */}
      </View>
    </View>
    </ScrollView>
  );
}
