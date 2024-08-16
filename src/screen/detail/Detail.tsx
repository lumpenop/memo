import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '~/types/navigationTypes.ts';

const Detail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
