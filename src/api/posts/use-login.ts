import type { AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = Post[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

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
    }).then((response) => response.data),
});
