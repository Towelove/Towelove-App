import { useEffect, useState } from 'react'
import bg from '@/assets/bg/ticket.svg'
import code from '@/assets/ticket/code.svg'
import lineBg from '@/assets/ticket/lineBg.png'
import qupid from '@/assets/ticket/qupid.svg'
import blueLove from '@/assets/ticket/blue_love.svg'
import pinkLove from '@/assets/ticket/pink_love.svg'
import { fetchUserInfoAtom } from '@/models/store'
import { useAtom } from 'jotai'
import { getTotalDays } from '@/services/user'
import classNames from 'classnames'
// 移动端ticket
const PhoneTicket = ({className,style}:{className?:string,style?:object}) => {
  const [userInfo,] = useAtom(fetchUserInfoAtom)
  const [togetherDays,setTogetherDays] = useState()
  const getTogetherDays = async() => {
    const res =await getTotalDays()
    if(res.code === 200) {
      setTogetherDays(res.data)
    }
  }
  useEffect(()=>{
    getTogetherDays()
  },[])
  return (
    <div style={style} className={classNames(className?className:'','w-[3.40997rem] h-[1.58rem] relative mt-[0.2rem]',)}>
      <img src={bg} className='absolute top-0 left-0 w-full h-full' alt="" />
      <div className='absolute top-0 left-0 py-[0.05rem] w-full h-full pl-[0.19rem] flex items-center'>
        <img src={code} className='w-[0.29rem] h-full object-fill cursor-pointer' alt="" />
        <div className='flex flex-col relative h-full py-[0.01rem] ml-[0.04rem]'>
          <div className='w-[2.73rem] cursor-pointer z-10 flex justify-center items-center rounded-t-[0.02rem] h-[0.28rem] shrink-0 text-white font-SansitaOne text-[0.18rem] leading-none bg-[linear-gradient(90deg,#82A1F2_0%,#DDC3FE_100%);]'>
            LOVE TICKET
          </div>
          <img src={lineBg} className='absolute top-[0.29rem] left-0 w-[2.73rem] h-[1.27rem] mt-[-0.09rem]' alt="" />
          <div className='w-[2.73rem] h-[0.88rem] flex z-10'>
            <div className='flex-[1.8] h-full  flex justify-center items-center pl-[0.19rem]'>
              <div className='w-[0.58rem] h-[0.58rem] cursor-pointer rounded-full overflow-hidden border-[#A1B6CC] border-[1px] border-solid'>
                <img src={userInfo?.avatar as string} alt="" />
              </div>
              <img src={qupid} className='w-[0.24rem] cursor-pointer mx-[0.045rem]' alt="" />
              <div className='w-[0.58rem] h-[0.58rem] cursor-pointer rounded-full overflow-hidden border-[#A1B6CC] border-[1px] border-solid'>
                <img src={userInfo?.avatar as string} alt="" />
              </div>
            </div>
            <div className='flex-1 h-full cursor-pointer flex flex-col justify-center item-center text-center'>
              <span className='text-[#77B9FF] text-[0.14rem] font-SansitaOne leading-none'>
                Together
              </span>
              <span className='mt-[0.01rem] text-[#FF98B1] text-[0.36rem] font-SansitaOne leading-none'>
                {togetherDays}
              </span>
              <span className='mt-[0.02rem] text-[#FF98B1] text-[0.14rem] font-SansitaOne leading-none'>
                Day
              </span>
            </div>
          </div>
          <div className='w-[2.73rem] cursor-pointer h-[0.3rem] z-10 mt-[-0.01rem] flex justify-center items-center'>
            <img src={blueLove} alt="" />
            <img className='ml-[0.03rem]' src={pinkLove} alt="" />
            <span className='text-[#77B9FF] mx-[0.1rem] font-SansitaOne text-[0.14rem] leading-none'>
            LOVE SONG
            </span>
            <img src={pinkLove} alt="" />
            <img className='ml-[0.03rem]' src={blueLove} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneTicket