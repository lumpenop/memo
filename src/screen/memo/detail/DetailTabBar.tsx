import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from 'react-native-screens/native-stack';
import { ARROW_BACK, LIST_MENU } from '~/public/svgs';
import { RootStackParamList } from '~/types/navigationTypes.ts';

const DetailTabBar = () => {
  const { pop } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity onPress={() => pop()} activeOpacity={0.8}>
        <ARROW_BACK height={30} width={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pop()} activeOpacity={0.8}>
        <LIST_MENU height={22} width={24} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailTabBar;
