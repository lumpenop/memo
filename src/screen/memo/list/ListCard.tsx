import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { IContent } from '~/screen/home/Home.tsx';
import { RootStackParamList } from '~/types/navigationTypes.ts';
import dayjs from 'dayjs';

type Props = IContent;
const ListCard = ({ fileName, title, content, mtimeMs }: Props) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigate('Detail', {
          item: { fileName, title, content, mtimeMs },
        })
      }>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          flexDirection: 'row',
          borderBottomWidth: 1,
          width: '100%',
        }}>
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            gap: 6,
          }}>
          <Text style={{ fontWeight: '800', fontSize: 18 }}>{title}</Text>
          <Text>Menu</Text>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>
            {dayjs(Number(fileName.split('.')[0])).format(
              'YYYY.MM.DD HH:mm:ss',
            )}
          </Text>
          <Text>{dayjs(mtimeMs).format('YYYY.MM.DD HH:mm:ss')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
