import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types/navigationTypes.ts';

const Home = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigate('Detail')}>
          <Text>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Detail')}>
          <Text>Go Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
