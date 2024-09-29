import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type RootStackParamList = {
  Root: undefined;
  Detail: { title: string };
};

export type MenuDrawParamList = {
  Home: NativeStackScreenProps<RootStackParamList, 'Detail'>;
  Menu: undefined;
};
