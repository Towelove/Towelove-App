import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerLogin, customerLogout } from "../store";
import { getUserInfo } from "@/components/auth/action";
import Toast from "react-native-toast-message";

export default function useUserInfo() {
  const user = useSelector((state: any) => state.user.user);
  const [userRefreshing, setUserRefreshing] = useState(false);
  const dispatch = useDispatch();

  const userLogOut = () => {
    dispatch(customerLogout());
    Toast.show({
      type: "success",
      text1: '退出登录成功',
    });
  }
  const userRefresh = async () => {
    setUserRefreshing(true);
    const res:any = await getUserInfo();
    console.log(res,'res.data')
    if (res?.success && res.message) {
      // 登录成功，未补充信息,无权限
      dispatch(customerLogin({}));
      Toast.show({
        type: "info",
        text1: res?.message,
      });
     
    }else if(res?.success && !res.msg) {
       // 登录成功且有用户信息
       dispatch(customerLogin(res.data));
       setUserRefreshing(false);
       return {
         success: true,
       };
    }
    
  };
  return {
    user: user, // customer信息
    userRefreshing, // customer是否正在刷新
    userRefresh, // 刷新customer信息
    userLogOut, // 退登
    error: null,
    isError: null,
  };
}
