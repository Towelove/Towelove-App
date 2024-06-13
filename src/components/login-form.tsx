import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  ControlledInput,
  Pressable,
  Text,
  View,
  showErrorMessage,
} from '@/ui';
import { TouchableHighlight } from 'react-native';
import { useSendCode } from '@/api/posts/use-login';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: '请输入邮箱号码',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: '请输入密码',
    })
    .min(8, 'Password must be at least 8 characters'),
  phoneNumber: z
    .string({
      required_error: '请输入手机号',
    })
    .min(11, 'Invalid phone format')
    .max(11, 'Invalid phone format'),
  verifyCode: z.string({
    required_error: '请输入验证码',
  }),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [during, setDuring] = useState(60);
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: sendCode, isPending, isSuccess, reset } = useSendCode();
  const handleSuccessSendCode = () => {
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
  const handleSendCode = async (data: any) => {
    if (isPending) {
      return;
    }
    // 发送验证码
    sendCode({ email: data[loginType] } as any, {
      onSuccess: handleSuccessSendCode,
      onError: () => {
        showErrorMessage('重复发送，请稍等');
      },
    });
  };
  return (
    <View className="flex-1 justify-center bg-blue-100 p-4">
      <Text testID="form-title" className="pb-6 text-center font-bold text-2xl">
        登录
      </Text>
      <View className="flex flex-row justify-center items-center ">
        <Text
          onPress={() => setLoginType('email')}
          className="text-blue-400 mx-6"
        >
          邮箱
        </Text>
        <Text
          onPress={() => setLoginType('phone')}
          className="text-blue-400 mx-6"
        >
          手机号
        </Text>
      </View>
      {/* <ControlledInput
        testID="name"
        control={control}
        name="name"
        label="Name"
      /> */}
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
        <TouchableHighlight
          onPress={handleSubmit(handleSendCode)}
          className="absolute bottom-5 right-5 "
        >
          {isSuccess ? during : <Text className="text-blue-500">发送</Text>}
        </TouchableHighlight>
      </View>
      <Button
        size="lg"
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
