import React from 'react';
import { View, Text } from 'react-native';
import {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from 'react-native-toast-message';

type ToastConfig = {
  [key: string]: (params: ToastConfigParams<any>) => React.ReactNode;
};

export const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: 'black',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#E97341', borderLeftWidth: 10, width: '100%' }}
      onPress={() => console.log('hi')}
      hide={() => console.log('bye')}
      text1Style={{
        fontSize: 16,
        color: 'black',
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
