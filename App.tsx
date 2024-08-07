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

import { RecoilRoot } from 'recoil';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RecoilRoot>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View>
          <Text>hi</Text>
        </View>
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;
