import  { useEffect, useState } from 'react'
import Rabbit from '@/assets/svg/clock/rabbit.svg'
import Ranbow from '@/assets/svg/clock/ranbow.svg'
import Moon from '@/assets/svg/clock/moon.svg'
import {  View,Text } from 'react-native'

// const Clip = styled.div`
//   & {
//     -webkit-clip-path: polygon(20% 0, 0 0, 0 100%);
//     clip-path: polygon(20% 0, 0 0, 0 100%);
//   }
// `
// const Clip1 = styled.div`
//   & {
//     -webkit-clip-path: polygon(100% 0, 80% 0, 100% 100%);
// clip-path: polygon(100% 0, 80% 0, 100% 100%);
//   }
// `
const date = new Date();
const Clock = () => {
  const [mRotate, setMRotate] = useState(0)
  const [hRotate, setHRotate] = useState(0)
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date()) // default value can be anything you want
  useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 60000)
  }, [fakeCurrentDate])
  useEffect(() => {
    const hour = date.getHours()
    const min = date.getMinutes()
    setMRotate(min * 360 / 60)
    setHRotate(hour * 360 / 12 + min * 30 / 60)
  }, [fakeCurrentDate])

  return (
    <View className='w-[9.8125rem] max-md:w-[1.57rem] select-none relative flex justify-center items-center aspect-square bg-[#C4E0FF] border-[1px] border-solid border-[#A1B6CC] 
    rounded-[1.25rem] max-md:rounded-[0.2rem]'>
      <View className='w-[79.6%] z-10 relative h-[79.6%] flex justify-center items-center bg-white border-[1px] border-solid border-[#617084] rounded-full'>
        <View className='w-[95%] z-10 h-[95%] relative rounded-full  cursor-pointer bg-white'>
          {/* <img src={clock} alt="" /> */}
          <Text className='absolute font-PoetsenOne_Regular right-[23.2%] top-[9.3%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>1</Text>
          <Text className='absolute font-PoetsenOne_Regular right-[7.3%] top-[25.5%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>2</Text>
          <Text className='absolute font-PoetsenOne_Regular top-[50%] right-0 translate-y-[-50%]  text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>3</Text>
          <Text className='absolute font-PoetsenOne_Regular right-[7.3%] bottom-[25.5%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>4</Text>
          <Text className='absolute font-PoetsenOne_Regular right-[23.2%] bottom-[9.3%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>5</Text>
          <Text className='absolute font-PoetsenOne_Regular bottom-0 left-[50%] translate-x-[-50%] leading-[10px]  text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>6</Text>
          <Text className='absolute font-PoetsenOne_Regular left-[26.5%] bottom-[9.3%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>7</Text>
          <Text className='absolute font-PoetsenOne_Regular left-[12.5%] bottom-[25.5%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>8</Text>
          <Text className='absolute font-PoetsenOne_Regular top-[50%] left-0 translate-y-[-50%]  text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>9</Text>
          <Text className='absolute font-PoetsenOne_Regular left-[12.5%] top-[25.5%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>10</Text>
          <Text className='absolute font-PoetsenOne_Regular left-[26.5%] top-[9.3%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>11</Text>
          <Text className='absolute font-PoetsenOne_Regular top-0 left-[50%] translate-x-[-50%] leading-[10px] text-[#617084] text-[10px] max-md:text-[0.1rem] font-bold'>12</Text>


          <Text className='z-[1000] absolute top-[50%] left-[50%] w-[2px] h-[2px] rounded-full bg-white translate-x-[-50%] translate-y-[-50%]'></Text>

          {/* 分针 */}
          <View style={{ transform: `translateY(-95%) rotate(${mRotate}deg)` }} className={' transition-all z-[999] ease-linear absolute  origin-zhen rounded-l-full rounded-r-full  w-[4px] h-[40%] bg-[#B3CCEA] top-[50%] left-[48%]  translate-x-[5%]'}>
            <View className='w-full h-full absolute left-[-0.32px] top-0 bg-white'></View>
            <View className='w-full h-full absolute right-[-0.32px] top-0 bg-white'></View>
          </View>

          {/* 时针 */}
          <View style={{ transform: `translateY(-95%) rotate(${hRotate}deg)` }} className={'transition-all z-[998] ease-linear absolute  origin-zhen rounded-l-full rounded-r-full  w-[4px] h-[25.15%] bg-[#F2C1BB] top-[50%] left-[48%]  translate-x-[5%]'}>
            <View className='w-full h-full absolute left-[-0.32px] top-0 bg-white'></View>
            <View className='w-full h-full absolute right-[-0.32px] top-0 bg-white'></View>
          </View>

        </View>



        {/* 背景 */}
      </View>
      <View className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[79.6%] h-[79.6%] flex justify-center items-center  rounded-full'>
        <Rabbit className=' absolute top-[-28%] right-[-13%] z-[1] max-md:w-[0.775rem]' />
      </View>
      <View className='z-[10] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[79.6%] h-[79.6%] flex justify-center items-center  rounded-full'>
        <Ranbow className=' absolute top-[22.5%] right-[-11%] z-[1] max-md:w-[0.27rem]'/>
      </View>
      <View className='z-[10] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[79.6%] h-[79.6%] flex justify-center items-center  rounded-full'>
        <Moon className=' absolute bottom-[-9.9%] left-[-5%] z-[1] max-md:w-[0.64rem]' />
      </View>
    </View>
  )
}

export default Clock