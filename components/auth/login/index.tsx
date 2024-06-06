import { Button, Input } from "native-base";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { regexEmail, regexPhone } from "@/utils/regEx";
import FormItem from "@/components/common/formItem";
import { LOGIN_VIEW } from "@/app/(auth)/login";
import { LoginFormData, SendVerifyCode, userLogIn } from "../action";
import useUserInfo from "@/hooks/useUserInfo";
import PasswordInput from "@/components/common/passwordInput";
import Logo from "@/assets/svg/logo.svg";
interface IProps {
  setCurrentView?: any;
}

const Login = (props: IProps) => {
  const { userRefresh } = useUserInfo();
  const { setCurrentView } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      verifyCode: "",
      phoneNumber: "",
    },
  });
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<'email' | 'phone'>("email");
  const [duringSendCode, setDuringSendCode] = useState(false);
  const [during, setDuring] = useState(0);
  const [duringAwaitSendCode, setDuringAwaitSendCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleStartTime = () => {
    setDuringAwaitSendCode(false);
    Toast.show({
      type: "success",
      text1: "发送成功",
    });
    setDuringSendCode(true);
    setDuring(60);
    setTimeout(() => {
      setDuringSendCode(false);
      clearInterval(intervalID);
    }, 60000);
    const startCal = () => {
      setDuring((pre) => pre - 1);
    };
    const intervalID = setInterval(startCal, 1000);
  };
  const checkIsDuring = () => {
    if (duringAwaitSendCode) {
      Toast.show({
        type: "warn",
        text1: "正在发送，请勿重复点击",
      });
      return true;
    }
    return false;
  };
  const handleSendCode = async (data: LoginFormData) => {
    console.log('发送')
    if (checkIsDuring()) {
      return;
    }
    setDuringAwaitSendCode(true);
    let res;
    // 发送验证码
    if (type === "email") {
      res = await SendVerifyCode({
        email: data.email as string,
      });
    } else {
      res = await SendVerifyCode({
        phone: data.phoneNumber as string,
      });
    }
    if (res.sucess) {
      handleStartTime();
    } else {
      Toast.show({
        type: "info",
        text1: res.error as string,
      });
      setDuringAwaitSendCode(false);
    }
  };
  const onSubmit = async (data: LoginFormData) => {
    console.log('登录')
    setLoading(true);
    setMessage("");
    if (data.email && data.verifyCode) {
      const res = await userLogIn({...data,type:type});
      if (!res.success) {
        setMessage(res.error as string);
      } else {
        // 登录成功
        if (res?.success) {
          Toast.show({
            type: "success",
            text1: "登陆成功",
          });
          const res = await userRefresh();
          setLoading(false);
          router.navigate("/account");
        }
      }
    }
    setLoading(false);
  };

  return (
    <View
      className="max-w-sm w-full h-full flex justify-center flex-col items-center"
      data-testid="login-page"
    >
      <Logo />
      <Text className="text-large-semi text-xl font-bold uppercase mb-6">
        登录{" "}
      </Text>
      <View className="flex flex-row w-full justify-center gap-3">
      <Button bg={'transparent'} _text={{color:'blue.400'}} onPress={()=>setType('phone')}>手机登录</Button>
      <Button bg={'transparent'} _text={{color:'blue.400'}} onPress={()=>setType('email')}>邮箱登录</Button>
      </View>
      <View className="flex flex-col w-full ">
        <FormItem
          hiddenRequired
          required
          name={type === 'email'?"email":"phoneNumber"}
          control={control}
          errors={type === 'email'?errors.email:errors.phoneNumber}
          rules={{
            required: type === 'email'? "请输入邮箱" : "请输入手机号",
            pattern: {
              value:  type === 'email'? regexEmail :regexPhone,
              message:  type === 'email'?"请输入一个有效的邮箱" : "请输入一个有效的手机号",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder={ type === 'email'? "请输入邮箱":"请输入手机号"}
            />
          )}
        />
        <FormItem
          hiddenRequired
          className="mt-4"
          control={control}
          name="verifyCode"
          errors={errors.verifyCode}
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="请输入验证码"
              />
              <Button bg={'transparent'} _text={{color:'black'}} 
                onPress={handleSubmit(handleSendCode)}
                disabled={duringSendCode}
                className="absolute h-full bg-none right-3  text-[#4199E1] "
              >
                {duringSendCode ? `${during}s` : "发送验证码"}
              </Button>
            </>
          )}
        />

        <Text className="text-red-500 text-sm mt-1">{message}</Text>
        <Button
          isLoading={loading}
          bg={"black"}
          style={{ backgroundColor: "black" }}
          className="mt-4 bg-[#000] relative h-12 flex justify-center items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white">登录</Text>
        </Button>
      </View>
      <Text className="text-center text-ui-fg-base text-small-regular mt-6">
        没有账号?{" "}
        <Text
          style={{
            color: "gray",
            textDecorationLine: "underline",
          }}
          onPress={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          data-testid="register-button"
        >
          微信登录
        </Text>
        .
      </Text>
    </View>
  );
};
export default Login;
