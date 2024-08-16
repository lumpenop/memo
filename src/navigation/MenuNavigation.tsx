import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MenuDrawParamList } from '../types/navigationTypes.ts';
import Home from '../screen/home/Home.tsx';
import Menu from '../screen/menu/Menu.tsx';

const MenuNavigation = () => {
  const Drawer = createDrawerNavigator<MenuDrawParamList>();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Menu" component={Menu} />
    </Drawer.Navigator>
  );
};

export default MenuNavigation;
