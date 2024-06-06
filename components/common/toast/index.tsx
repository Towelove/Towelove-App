import { Text, View } from 'native-base';
import React from 'react';
import T, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'transparent', backgroundColor: 'black' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: '#cb0036' }}
      text1Style={{
        fontSize: 14,
        color: 'white',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  tomatoToast: ({ text1, props }: any) => (
    <View style={{ height: 50, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
const Toast = () => {
  return <T config={toastConfig} />;
};

export default Toast;
