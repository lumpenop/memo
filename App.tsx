/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { RecoilRoot } from 'recoil';
import Home from './src/screen/home/Home.tsx';
import RootStack from './src/navigation/RootNavigation.tsx';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RecoilRoot>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStack />
        </SafeAreaView>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
