import React from 'react';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <View style={{ flex: 1, padding: 20 }}>{children}</View>;
};

export default Layout;
