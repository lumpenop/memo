export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type RootStackParamList = {
  Root: undefined;
  Detail: undefined;
};

export type MenuDrawParamList = {
  Home: undefined;
  Menu: undefined;
};
