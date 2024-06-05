import { TodoListResponse } from "@/services/todoList";
import { atom } from "jotai";
export const exampleWidgets = {
  id:'virtualId',
  status: 1,
  deadline: '2026-02-02 00:00:00',
  title: '做xx代办',
  local: true
}
export const exampleTodo ={
  completionDate: '',
  title: '你还没有代办哦~快来创建一个',
  deadline: '',
  id: 0,
  status: 1,
  widget:false
}
export const widgetsAtom = atom([exampleWidgets])
export const todoListAtom = atom([exampleTodo as TodoListResponse])

