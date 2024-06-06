import AccountLayout from "@/components/account/template/account-layout";
import AuthWrapper from "@/components/wraper/AuthWrapper";
import useUserInfo from "@/hooks/useUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { StyleSheet, Image, Platform, ScrollView, View } from "react-native";

export default function TabSetting() {
  const {user} = useUserInfo();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <AuthWrapper user={user}>
        <AccountLayout user={user} />
      </AuthWrapper>
    </>
  );
}
