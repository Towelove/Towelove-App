/* eslint-disable react/no-unstable-nested-components */
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import HeaderLogo from 'assets/svg/header';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { useAuth, useIsFirstTime } from '@/core';
import { TouchableOpacity } from '@/ui';
import { Home, Setting as SettingsIcon } from '@/ui/icons';
import { Album } from '@/ui/icons/album';
import { Diary } from '@/ui/icons/diary';
const screenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => BottomTabNavigationOptions)
  | undefined = {
  tabBarStyle: {
    position: 'absolute',
    height: 55,
    paddingTop: 5,
    paddingHorizontal: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    flexShrink: 0,
    shadowColor: 'white',
    borderTopWidth: 0
  },
  tabBarLabelStyle: {
    color: '#4D5E75',
  },
  tabBarItemStyle: {
    marginBottom: 8,
    marginHorizontal: 10,
  },
  tabBarButton: (props) => <TouchableOpacity activeOpacity={0.8} {...props} />,
};
export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          headerTitle: '',
          headerShown:false,
          tabBarIcon: (state) => <Home state={state} />,
          // headerLeft: () => <CreateHeader />,
          headerShadowVisible: false,
          tabBarTestID: 'feed-tab',
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          title: '恋爱相册',
          headerShown: false,
          tabBarIcon: (state) => <Album state={state} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: '恋爱日记',
          headerShown: false,
          tabBarIcon: (state) => <Diary state={state} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '设置',
          headerShown: false,
          tabBarIcon: (state) => <SettingsIcon state={state} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}

const CreateHeader = () => {
  return (
    <View className="pl-4">
      <HeaderLogo />
    </View>
  );
};
