import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { IContent } from '~/screen/home/Home.tsx';

export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type RootStackParamList = {
  Root: undefined;
  Detail: { content: IContent };
};

export type MenuDrawParamList = {
  Home: NativeStackScreenProps<RootStackParamList, 'Detail'>;
  Menu: undefined;
};
