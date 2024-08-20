import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import ListCard from '~/screen/memo/list/ListCard.tsx';
import { RootStackParamList } from '~/types/navigationTypes.ts';
import ScrollView = Animated.ScrollView;

const List = () => {
  return (
    <ScrollView style={{ marginHorizontal: 24 }}>
      <ListCard id={0} />
      <ListCard id={1} />
    </ScrollView>
  );
};

export default List;
