import { useState } from 'react';
import { View } from 'react-native';

import { Stack } from 'expo-router';
import Login from '@/components/auth/login';


export enum LOGIN_VIEW {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
}

export default function LoginScreen() {
  const [currentView, setCurrentView] = useState('sign-in');
  return (
    <>
      <Stack.Screen
        options={{
          title: currentView === 'sign-in' ? '登录' : '注册',
          headerBackTitleVisible: false,
        }}
      />
      <View className="w-full h-[80vh] justify-center items-center">
        <Login setCurrentView={setCurrentView} />
      </View>
    </>
  );
}
