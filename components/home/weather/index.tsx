import  { useEffect, useState } from 'react'
import ClearToCloudy from '@/assets/svg/weather-clear-cloudy.svg'
import axios from 'axios'
import { View,Text } from 'react-native';
interface WeatherData {
  nums: number;
  cityid: string; //城市ID
  city: string;
  date: string;
  week: string;
  update_time: string;
  wea: string; //天气情况
  wea_img: string;
  tem: string; //实况温度
  tem_day: string;  //白天温度(高温) 
  tem_night: string; //夜间温度(低温)
  win: string; //风向
  win_speed: string; //风力
  win_meter: string; //风速
  air: string;  //空气质量
  pressure: string; //气压
  humidity: string; //湿度
}
const Weather = () => {
  const [weather, setWeather] = useState<WeatherData>({
    nums: 0,
    cityid: '',
    city: '',
    date: '',
    week: '',
    update_time: '',
    wea: '',
    wea_img: '',
    tem: '',
    tem_day: '',
    tem_night: '',
    win: '',
    win_speed: '',
    win_meter: '',
    air: '',
    pressure: '',
    humidity: ''
  })
  useEffect(() => {
    const appid = 85324978 // http://tianqiapi.com/index/doc?version=day 在线天气接口账户的id
    const appsecret = 'V66pXRzR'
    axios.get(`https://v1.yiketianqi.com/free/day?appid=${appid}&appsecret=${appsecret}`).then(res => {
      if (res.status === 200) {
        setWeather(res.data)
      }
    })
  }, [])
  return (
    <View className='w-[9.8125rem] max-md:w-[1.57rem] select-none relative flex flex-col aspect-square overflow-hidden bg-[linear-gradient(120deg,#FDD6EA_-19.3%,#FFEFF7_133.38%)] border-[1px] border-solid border-[#A1B6CC] 
    rounded-[1.25rem] max-md:rounded-[0.2rem]'>
      <View className='w-full h-[64.56%] relative bg-[#FFF2F9] '>
        {/* <span className=' absolute top-0 left-0 text-[#4D5E75] text-[0.5rem]'>{weather.week}</span> */}
        <ClearToCloudy className='w-full h-full' />
      </View>
      <View className='w-full h-[35.44%] flex flex-col  border-t-[1px] border-solid border-[#A1B6CC]'>
        <View className='w-full h-[55%] text-[#C973A0] font-loLi flex  justify-between items-end
         px-4  text-[0.875rem] max-md:px-[0.16rem] max-md:text-[0.14rem]'>
          <Text className='font-loLi'>{weather.wea} {weather.tem}­°C</Text>
          <Text className='font-loLi'>{weather.city}</Text>
        </View>
        <View className='w-full font-loLi h-[45%] flex items-center  
        px-4 text-[0.625rem] text-[#CE89AE] max-md:px-[0.16rem] max-md:text-[0.1rem]'>
          {/* 2:00PM 会下雨 要记得带伞哦 */}
          <Text>{weather.win} {weather.win_speed},空气湿度{weather.humidity}</Text>
        </View>
      </View>
      
    </View>
  )
}

export default Weather