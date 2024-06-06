import {
  LOVE_COUPLE_ID,
  LOVE_LOGIN_TYPE,
  LOVE_TOKEN_NAME,
} from "@/config/constant";
import { cipherLocal, getLocal, retrievedLocal } from "@/utils/cipher";
import request from "@/utils/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export interface LoginFormData {
  phoneNumber?: string;
  email?: string;
  password?: string;
  verifyCode?: string;
  type?: "email" | "phone";
}
export interface IVerifyCode {
  email?: null | string;
  phone?: null | string;
}
export const userLogIn = async (data: LoginFormData) => {
  const res = await request("/v1/auth/login", {
    method: "post",
    data: data,
  });
  if (res.code === 201 || res.code === 200) {
    // 需要完善信息
    await cipherLocal(LOVE_TOKEN_NAME, res.data);
    await cipherLocal(LOVE_LOGIN_TYPE, data.email ? "email" : "phoneNumber");

    router.navigate({
      pathname: "/account",
    });
    return {
      success: true,
    };
  }
  if (res.code === 500) {
    return {
      success: false,
      error: res.msg,
    };
  }
  return {
    success: false,
    error: res.msg,
  };
};

export const SendVerifyCode = async (param: IVerifyCode) => {
  const res = await request("/v1/auth/send-code", {
    method: "post",
    data: param,
  });
  if (res.code === 200) {
    return {
      sucess: true,
    };
  } else {
    return {
      success: false,
      error: res.msg,
    };
  }
};

// 获取用户信息
export const getUserInfo = async () => {
  const res = await request(`/v1/user/sys`, {
    method: "get",
  });
  console.log(res,'res')
  if (res.code === 200) {
    if (res.data.coupleId) {
      // 有 coupleId， 存到本地，以后request每次请求都会附带在header发送
      const name = LOVE_COUPLE_ID;
      cipherLocal(name, res.data.coupleId);
    }
    return {
      success: true,
      data: res.data,
    };
  }
  if (res.code === 401) {
    // token过期
    const token = await retrievedLocal(LOVE_TOKEN_NAME);
    const cuopleId = await retrievedLocal(LOVE_COUPLE_ID);
    const type = await retrievedLocal(LOVE_LOGIN_TYPE);
    if (token) {
      await AsyncStorage.removeItem(LOVE_TOKEN_NAME);
    }
    if (cuopleId) {
      await AsyncStorage.removeItem(LOVE_COUPLE_ID);
    }
    if (type) {
      await AsyncStorage.removeItem(LOVE_LOGIN_TYPE);
    }
    return {
      // 需要重新登录的情况
      success: false,
      data: res.data,
      error: res.toString()
    };
  }
  if (res.code === 403) {
    // {"code": 403, "data": "Forbidden", "msg": "无权限", "requestId": "request_id"}
    // 没有权限
    return {
      sucess: true,
      data: res.data,
      message:res.msg
    };
  }
};
export const logout = async () => {
  const res = await request('/v1/auth/logout',{
    method:'post'
  })
  if (res.code === 200) {
    await AsyncStorage.removeItem(LOVE_TOKEN_NAME)
    const type = await getLocal(LOVE_LOGIN_TYPE)
    const coupleId = await getLocal(LOVE_COUPLE_ID)
    if (type) {
      await AsyncStorage.removeItem(LOVE_LOGIN_TYPE)
    }
    if (coupleId) {
      await AsyncStorage.removeItem(LOVE_COUPLE_ID)
    }
    return {
      success: true
    }
  } else {
    return {
      success:false,
      error: res.toString()
    }
  }
}