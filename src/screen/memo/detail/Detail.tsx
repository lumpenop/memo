import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { RootStackParamList } from '~/types/navigationTypes.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;
const Detail = ({ navigation, route }: Props) => {
  const { id } = route.params;
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>{id}11</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
