import { atom } from 'jotai'
import { getUserInfo } from '@/services/user';
import { cipherLocal } from '@/utils/cipher';
import { LOVE_COUPLE_ID, LOVE_LOGIN_TYPE, LOVE_TOKEN_NAME } from '@/config/constant';
import { Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
export interface SysUserVo {
  boyId?: null | number;
  girlId?: null | number;
  coupleId?: null | number | string;
  avatar?: null | string;
  email?: null | string;
  nickName?: null | string;
  sex?: null | string;
  smtpCode?: null | string;
  userName?: null | string;
  [property: string]: any;
}
/**
 * { 20240227 : 1,
 *  20240228: 0}
 */

export const loginInfoAtom = atom<SysUserVo>({

});
export const limit = Symbol('limit')
export const fetchUserInfoAtom = atom(
  async (get:any): Promise<SysUserVo | null> => {
    const data: SysUserVo = get(loginInfoAtom);
    const token = await AsyncStorage.getItem(LOVE_TOKEN_NAME);
    const coupleId = await AsyncStorage.getItem(LOVE_COUPLE_ID);
    const loginType = await AsyncStorage.getItem(LOVE_LOGIN_TYPE);
    if (!Object.keys(data).length) {
      const res = await getUserInfo();
      if (res.code === 200) {
        if (res.data.coupleId) {
          const name = LOVE_COUPLE_ID
          cipherLocal(name, res.data.coupleId)
        }
        return res.data;
      }
      if (res.code === 401) {
        // token过期
        if (token) {
          await AsyncStorage.removeItem(LOVE_TOKEN_NAME)
        }
        if (coupleId) {
          await AsyncStorage.removeItem(LOVE_COUPLE_ID)
        }
        if (loginType) {
          await AsyncStorage.removeItem(LOVE_LOGIN_TYPE)
        }
        router.push('/login')
        return res.data
      }
      if (res.code === 403) {
        // 没有权限
        const obj = {
          [limit]: 1
        }
        return obj
      }
      
      if (token) {
        await AsyncStorage.removeItem(LOVE_TOKEN_NAME)
      }
      if (coupleId) {
        await AsyncStorage.removeItem(LOVE_COUPLE_ID)
      }
      if (loginType) {
        await AsyncStorage.removeItem(LOVE_LOGIN_TYPE)
      }
      router.push('/login')
      return {}
    }

    // const res = await getUserInfo();
    // if (res.code === 200) {
    //   return res.data;
    // } else if (res.code === 401) {
    //   // window.location.replace('/login');
    //   return {};
    // }

    // // message.error(res.msg);
    return data;
  },
  async (_get:any, set:any) => {
    try {
      const res = await getUserInfo();
      if (res.code === 200) {
        set(loginInfoAtom, res.data);
      }
    } catch (error: any) {
      // history.push(loginPath);
      Alert.alert(error.message)
      // message.error(error.message);
    }
  },

);
