import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Layout from '~/components/layout.tsx';
import { MenuDrawParamList } from '../types/navigationTypes';
import Home from '../screen/home/Home';
import Menu from '../screen/menu/Menu';
import { colors } from '~/styles/colors';
import HeaderRight from '~/navigation/Header/HeaderRight';

const MenuNavigation = () => {
  const Drawer = createDrawerNavigator<MenuDrawParamList>();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: colors.BLACK,
        drawerActiveBackgroundColor: colors.BLACK,
        drawerActiveTintColor: colors.WHITE,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => <HeaderRight />,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Menu" component={Menu} />
    </Drawer.Navigator>
  );
};

export default MenuNavigation;
