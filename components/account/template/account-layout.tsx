import { logout } from "@/components/auth/action";
import useUserInfo from "@/hooks/useUserInfo";
import { Button } from "native-base";
import React from "react";
import { Text, View } from "react-native";

interface AccountLayoutProps {
  user: any | null;
  children?: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  user,
  children,
}) => {
  const {userLogOut} = useUserInfo()
  const handleLogOut = async() => {
      const res = await logout()
      if(res.success) {
        userLogOut()
      }
  }
  return (
    <View
      className="flex-1 py-12 h-screen items-center  w-screen"
      data-testid="account-page"
    >
      <View className="w-full h-full">
        {user && (
          <View>
            <Text>account-layout</Text>
            <Text>account-layout</Text>
            <Button onPress={handleLogOut}>退出登录</Button>
          </View>
        )}
      </View>
      <View>{children}</View>
    </View>
  );
};

export default AccountLayout;
