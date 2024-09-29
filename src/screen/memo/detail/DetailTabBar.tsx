import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Toast from 'react-native-toast-message';
import { ARROW_BACK, LIST_MENU } from '~/public/svgs';
import { RootStackParamList } from '~/types/navigationTypes.ts';
import { CloudStorage } from 'react-native-cloud-storage';
import Config from 'react-native-config';

interface Props {
  content: string;
  title: string;
}

const DetailTabBar = ({ content, title }: Props) => {
  const { pop } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressBackButton = () => {
    if (!title) {
      Toast.show({
        type: 'error',
        text1: '',
        text2: '제목을 작성해주세요',
        visibilityTime: 2000,
      });
    }
    CloudStorage.writeFile(`/${Config.DEFAULT_FOLDER}/${title}.txt`, content)
      .then(data => {
        console.log(data);
        pop();
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: '',
          text2: '글 작성 실패',
          visibilityTime: 2000,
        });
      });
  };

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
      <TouchableOpacity onPress={onPressBackButton} activeOpacity={0.8}>
        <ARROW_BACK height={30} width={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pop()} activeOpacity={0.8}>
        <LIST_MENU height={22} width={24} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailTabBar;
