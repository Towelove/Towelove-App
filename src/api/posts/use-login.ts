import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post[];
type Variables = void | any; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useSendCode = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: '/v1/auth/send-code',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
export const useLogout = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: '/v1/auth/logout',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: '/v1/auth/login',
      method: 'POST',
      data: variables,
    }).then((response) => {
      if (response.data.code === 200) {
        // 登录成功
        return response.data.data;
      } else {
        throw new Error(response.data.msg);
      }
    }),
});
