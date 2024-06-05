// 移动端，日历+todolist组件
import  { useEffect, useState } from 'react'
import needle from '@/assets/todoCard/needle-pink-phone.svg'
import love from '@/assets/icon/sign_in.svg'
import styled from '@emotion/styled'
import { TodoListResponse,  updateTodoList, createTodoList, getTodoListByCoupleId } from '@/services/todoList'
import { useAtom } from 'jotai'
import { fetchUserInfoAtom } from '@/models/store'
import type { SysUserVo } from '@/hooks/useUser';
import { formatterTimeToSeconds, getCurrentDateTime, isDateInCurrentMonth, timeUntil } from '@/utils/time';
import classNames from 'classnames'
import dayjs from 'dayjs';
import Dialog from '@/components/todoList/components/dialog'
import { exampleWidgets, widgetsAtom, todoListAtom, exampleTodo } from '@/models/widgets'
import { message } from 'antd'
import Checkbox from '../checkbox/checkbox'
import { ScrollBox } from '../photoBox/PhotoBox'
import { getSignInTotalMonth, SignInToday } from '@/services/user'
import add from '@/assets/toDoList/add-phone.svg'
import moment from 'moment'
const TodoBox = styled.div`
  & {
    .todoClose {
      opacity: 0;
      transition: all 0.5s ease;
    }
    
      &:hover {
        .todoClose {
          opacity: 1;
        }
        .todoTime {
          display: none;
        }
      }

  }
`
const date = new Date();
const today = date.getDate()
const CAndT = () => {
  const [open, setOpen] = useState(false)
  const [userInfo] = useAtom(fetchUserInfoAtom)
  const [todoList, setTodoList] = useAtom(todoListAtom)
  const [realTodoList, setRealTodoList] = useState<TodoListResponse[]>([])
  const [widgets, setWidgets] = useAtom(widgetsAtom)
  const [signInTotalMonth, setSignInTotalMonth] = useState<any>({})
  const getSortTodoList = (todoList: TodoListResponse[]) => {
    // 已完成的代办
    const hasCompleteTodoList = todoList.filter(item => {
      return item.status
    })
    // 未完成的代办
    const notCompleteTodoList = todoList.filter(item => {
      return !item.status
    })
    // 未完成且未过期的代办
    const notCompleteAndNotDeadTodoList = notCompleteTodoList.filter(item => {
      if (timeUntil(item.deadline)) {
        return true
      }
      return false
    })
    // 未完成且已经过期了的代办
    const notCompleteAndDeadTodoList = notCompleteTodoList.filter(item => {
      if (timeUntil(item.deadline)) {
        return false
      }
      return true
    })
    const sortTodoList = [
      ...notCompleteAndNotDeadTodoList,
      ...notCompleteAndDeadTodoList,
      ...hasCompleteTodoList
    ]
    return sortTodoList
  }
  useEffect(() => {
    setRealTodoList(() => getSortTodoList(todoList))
  }, [todoList])
  const getSignInMonth = async (monthDate: any) => {
    const res = await getSignInTotalMonth(monthDate)
    if (res.code === 200) {
      console.log(signInTotalMonth)
      setSignInTotalMonth(res.data) // 当月签到数据
      const isNeedSignInToday = res.data.signInData && res.data.signInData[today - 1] === '0' && isDateInCurrentMonth(new Date(monthDate))
      if (isNeedSignInToday) {
        const res = await SignInToday()
        // if (res.code === 500) {
        //   message.warning(res.msg)
        // }
        if (res.code === 200) {
          message.success('首次登陆签到成功')
          getSignInTotalMonth(formatterTimeToSeconds(new Date())).then((res: any) => {
            if (res.code === 200) {
              setSignInTotalMonth(res.data)
            }
          })
        }
      }
    }
  }
  const handleFinish = async (value: {
    msg: string,
    date: string,
    checked: boolean
  }) => {
    const data = {
      title: value.msg,
      description: value.date,
      deadline: value.date,
      widget: value.checked,
      status: 0,
      reminder: false
    }
    if (Object.keys(userInfo as SysUserVo).length) {
      const realWidGetIds = widgets.filter(item => !item.local).map(item => item.id)
      // 已经有两个的情况 提醒
      if (value.checked) {
        if (realWidGetIds.length > 1) {
          message.warning('最多只能创建两个代办小组件~')
          return
        }
      }
      const res = await createTodoList(data)
      if (res.code === 200) {
        // 创建代办成功
        message.success('创建代办成功')
        await getTodoList()
        setOpen(false)
      } else {
        message.error(res.msg)
      }
    } else {
      message.warning('没有权限创建，请先补充信息')
    }

  }

  const getTodoList = async () => {
    if (!userInfo?.coupleId) {
      return
    }
    const res = await getTodoListByCoupleId()
    if (res.code === 200) {
      if (res.data?.length) {
        setTodoList(res.data as TodoListResponse[])
        setWidgets(res.data.filter(item => item.widget).length ? res.data.filter(item => item.widget) : [exampleWidgets])
      } else {
        const data = exampleTodo
        setTodoList([data])
        setWidgets([exampleWidgets])
      }
    } else {
      message.error(res.msg)
    }
  }
  useEffect(() => {
    if (Object.keys(userInfo as SysUserVo).length) {
      getTodoList()
      getSignInMonth(formatterTimeToSeconds(new Date()))
    }
  }, [])
  const handleClickAdd = () => {
    if (!userInfo?.coupleId) {
      message.warning('你没有对象，邀请对象去吧')
      return
    }
    setOpen(true)
  }
  const onTodoCheckedChange = async (checked: boolean, item: TodoListResponse) => {
    // 是否勾选
    //@ts-ignore
    const date = formatterTimeToSeconds(dayjs(item.deadline).$d)
    const nowDate = getCurrentDateTime()
    const todo = {
      ...item,
      status: checked ? 1 : 0,
      deadline: date,
    }
    if (checked) {
      // 更新为完成状态
      todo.completionDate = nowDate
    }
    if (!item.id) {
      return
    }
    const res = await updateTodoList(todo)
    if (res.code === 200) {
      message.success(`${checked ? '代办完成' : '代办取消完成'}`)
      // await getTodoList()
    } else {
      message.warning(res.msg)
    }
  }
  return (
    <div className='w-full h-[1.4rem] rounded-br-[0.22rem] relative border-[1px] border-[#A1B6CC] border-solid bg-white rounded-[0.2rem] flex mt-[0.22rem] p-[0.16rem]'>
      <img src={needle} className='absolute top-[-0.224rem] right-[-0.192rem] w-[0.52rem]' alt="" />
      <div className='h-full flex flex-col'>
        <span className='font-loLi text-[#414B59] flex items-center text-[0.12rem]'>
          {
            moment(date).format('dddd')
          }
          <img src={love} className='ml-[0.04rem]' alt="" />
        </span>
      
        <span style={{
          fontFeatureSettings:"'clig' off, 'liga' off"
        }} className='text-[#FF98B1] text-[0.5rem] font-PoetsenOne_Regular '>
          {date.getDate()}号
        </span>
      </div>
      
      <ScrollBox className='ml-[0.45rem] h-[105%] flex flex-col overflow-y-auto'>
        <span className='text-[#898989]  font-loLi text-[0.12rem]'>今日代办</span>
        <div className='flex flex-col mt-[-0.02rem]'>
        {
            realTodoList.map((item: TodoListResponse, index) => {
              //@ts-ignore
              // const date = formatterTimeToSeconds(dayjs(item.deadline).$d)
              // const date = new Date(item.deadline).getTime();
              return <TodoBox key={`todoList-${index}`}
                className='flex justify-between w-full relative mt-[0.07rem]'>
                <div className='flex items-center '>
                  <Checkbox checked={item.status ? true : false} onChange={async (checked: boolean) => {
                    onTodoCheckedChange(checked, item)
                  }} />
                  <span className={classNames('text-[#4D5E75] ml-[0.08rem] text-[0.14rem] ',
                    item.status ? 'line-through decoration-[#4D5E7588]' : '')}>
                    {item.title}
                  </span>
                  {/* <img onClick={async () => {
                    if (item.id) {
                      const res = await deleteTodoList(item.id as string)
                      if (res.code === 200) {
                        message.success('删除成功')
                        getTodoList()
                        // getTodoList()
                      } else {
                        message.error(res.msg)
                      }
                    } else {
                      return
                    }
                  }}
                    className='todoClose absolute right-0 top-[50%] translate-x-[-50%]  
                  hover:bg-[#4D5E7550] rounded-full w-[16px] p-[2px] cursor-pointer
                  translate-y-[-50%]' title='点击删除代办' src={close} alt="" /> */}
                </div>
                {/* <span className='todoTime text-[#617084] text-[12px]  font-sans'>
                  {timeUntil(date) ? timeUntil(date) : '已过期'}
                </span> */}
              </TodoBox>
            })
          }

        </div>
      </ScrollBox>
      <img  src={add} onClick={handleClickAdd} className='absolute w-[0.38rem] bottom-[-0.011rem] right-[-0.0155rem]' alt="" />
      {
        open ?
          <Dialog open={open} setOpen={setOpen} onFinish={handleFinish} />
          : null
      }
    </div>
  )
}

export default CAndT