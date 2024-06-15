import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { TouchableHighlight } from 'react-native';
import * as z from 'zod';

import { useLogin, useSendCode } from '@/api/posts/use-login';
import { useAuth } from '@/core';
import {
  Button,
  ControlledInput,
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
  Text,
  View,
} from '@/ui';

export interface SendCodeData {
  email?: string;
  phone?: string;
}

// export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<any>;
};

export const LoginForm = () => {
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [during, setDuring] = useState(60);
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const schema = z.object({
    email:
      loginType === 'email'
        ? z
            .string({
              required_error: '请输入邮箱号码',
            })
            .email('请输入正确的邮箱号码')
        : z.string().optional(),
    phoneNumber:
      loginType === 'phone'
        ? z
            .string({
              required_error: '请输入手机号',
            })
            .min(11, '请输入正确的手机号码')
            .max(11, '请输入正确的手机号码')
        : z.string().optional(),
    verifyCode: z.string({
      required_error: '请输入验证码',
    }),
  });
  type FormType = z.infer<typeof schema>;
  const { handleSubmit, control, getValues } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const {
    mutate: login,
    // isPending: loginPending,
    // isSuccess: loginSuccess,
  } = useLogin();
  const {
    mutate: sendCode,
    isPending: sendCodePending,
    isSuccess: sendCodeSuccess,
    reset,
  } = useSendCode();
  const handleSuccessSendCode = () => {
    showSuccessMessage('发送成功');
    setDuring(60);
    setTimeout(() => {
      clearInterval(intervalID);
      reset();
    }, 60000);
    const startCal = () => {
      setDuring((pre) => pre - 1);
    };
    const intervalID = setInterval(startCal, 1000);
  };
  const handleSendCode = async () => {
    const data: SendCodeData = getValues();
    console.log(data, 'data');
    if (sendCodePending) {
      showInfoMessage('重复发送，请稍等');
      return;
    }
    let param: SendCodeData = {};
    const codeType = loginType === 'phone' ? 'phoneNumber' : 'email';
    param[loginType] = data[codeType as keyof SendCodeData];
    // 发送验证码
    console.log(param, 'param');
    sendCode(param, {
      onSuccess: handleSuccessSendCode,
      onError: () => {
        showErrorMessage('重复发送，请稍等');
      },
    });
  };

  const handleSuccessLogin = (data: any) => {
    showSuccessMessage(`登录成功,token:${data}`);
    // 跳转,存储状态 data即为token
    signIn(data);
    router.push('/');
  };
  const handleErrorLogin = (error: any) => {
    showErrorMessage(error.toString());
  };
  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    const param = {
      ...data,
      type: loginType,
    };
    login(param, {
      onSuccess: handleSuccessLogin,
      onError: handleErrorLogin,
    });
  };
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" className="pb-6 text-center text-2xl font-bold">
        登录
      </Text>
      <View className="flex flex-row items-center justify-center ">
        <Text
          onPress={() => setLoginType('email')}
          className="mx-6 text-blue-400"
        >
          邮箱
        </Text>
        <Text
          onPress={() => setLoginType('phone')}
          className="mx-6 text-blue-400"
        >
          手机号
        </Text>
      </View>
      {loginType === 'email' ? (
        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="邮箱"
        />
      ) : (
        <ControlledInput
          testID="phone-input"
          control={control}
          name="phoneNumber"
          label="手机号"
        />
      )}
      <View className="relative">
        <ControlledInput
          testID="verify-code-input"
          control={control}
          name="verifyCode"
          label="验证码"
          secureTextEntry={true}
        />
        <TouchableHighlight className="absolute bottom-5 right-3">
          {sendCodeSuccess ? (
            <Text>{during}</Text>
          ) : (
            <Text
              onPress={() => {
                handleSendCode();
              }}
              className="text-blue-500"
            >
              发送
            </Text>
          )}
        </TouchableHighlight>
      </View>
      <Button
        size="lg"
        testID="login-button"
        label="登录"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
