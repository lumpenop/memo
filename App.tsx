/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import './gesture-handler.js';

import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { RecoilRoot } from 'recoil';
import { toastConfig } from '~/components/toast/toastConfig.tsx';
import RootStack from './src/navigation/RootNavigation.tsx';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <RecoilRoot>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
              <RootStack />
            </KeyboardAvoidingView>
          </SafeAreaView>
        </NavigationContainer>
      </RecoilRoot>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
