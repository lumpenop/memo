import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '~/types/navigationTypes.ts';

interface Props {
  id: number;
}
const ListCard = ({ id }: Props) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate('Detail', { id })}>
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          paddingTop: 20,
          paddingBottom: 20,
          paddingHorizontal: 4,
        }}>
        <Text style={{ fontWeight: '800' }}>Menu</Text>
        <Text>Menu</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
