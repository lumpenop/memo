import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Toast from 'react-native-toast-message';
import { useRecoilState } from 'recoil';
import { ARROW_BACK, LIST_MENU } from '~/public/svgs';
import {
  dataAtom,
  folderLengthAtom,
  folderPathAtom,
  IFile,
} from '~/types/recoil.ts';
import { RootStackParamList } from '~/types/navigationTypes.ts';
import { CloudStorage } from 'react-native-cloud-storage';
import Config from 'react-native-config';

const DetailTabBar = ({ content, title }: IFile) => {
  const [folderLength, setFolderLength] = useRecoilState(folderLengthAtom);
  const [folderPath, setFolderPath] = useRecoilState(folderPathAtom);
  const [data, setData] = useRecoilState(dataAtom);
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
      pop();
      return;
    }
    CloudStorage.writeFile(
      `/${folderPath}/${folderLength}.txt`,
      JSON.stringify({ content, title }),
    )
      .then(res => {
        CloudStorage.readdir(`/${Config.DEFAULT_FOLDER}`)
          .then(response => {
            console.log(response, 'response');
            setData(response);
            setFolderLength(response.length);
          })
          .catch(e => console.log(e));
        pop();
      })
      .catch(err => {
        console.log(err);
        console.log(JSON.stringify({ content, title }));
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
