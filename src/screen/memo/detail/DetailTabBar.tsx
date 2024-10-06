import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Toast from 'react-native-toast-message';
import { useRecoilState } from 'recoil';
import { ARROW_BACK, LIST_MENU, TRASH_BIN } from '~/public/svgs';
import { IContent } from '~/screen/home/Home.tsx';
import { dataAtom, folderPathAtom, listAtom } from '~/types/recoil.ts';
import { RootStackParamList } from '~/types/navigationTypes.ts';
import { CloudStorage } from 'react-native-cloud-storage';
import Config from 'react-native-config';

type Props = IContent & {
  isEdit: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
};
const DetailTabBar = ({
  content,
  title,
  isEdit,
  fileName,
  mtimeMs,
  setIsMenuOpen,
  isMenuOpen,
}: Props) => {
  const [folderPath] = useRecoilState(folderPathAtom);
  const [, setData] = useRecoilState(dataAtom);
  const [, setList] = useRecoilState(listAtom);
  const { pop } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const menuList = [
    {
      title: '휴지통으로 이동',
      onPress: () => console.log('hi'),
      icon: <TRASH_BIN width={18} height={18} />,
    },
  ];

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
    if (!isEdit) {
      pop();
      return;
    }
    setList([]);
    CloudStorage.writeFile(
      `/${folderPath}/${fileName || `${Date.now()}.txt`}`,
      JSON.stringify({ content, title }),
    )
      .then(res => {
        console.log(fileName, 'fileName');
        CloudStorage.readdir(`/${Config.DEFAULT_FOLDER}`)
          .then(response => {
            setData(response);
          })
          .catch(e => console.log(e));
        pop();
      })
      .catch(err => {
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
        paddingHorizontal: 8,
        position: 'relative',
      }}>
      <TouchableOpacity onPress={onPressBackButton} activeOpacity={0.8}>
        <ARROW_BACK height={30} width={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsMenuOpen(prev => !prev)}
        activeOpacity={0.8}>
        <LIST_MENU height={22} width={24} />
      </TouchableOpacity>
      {isMenuOpen && (
        <View
          style={{
            position: 'absolute',
            bottom: -30,
            right: 0,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 6,
          }}>
          {menuList.map((item, i) => {
            return (
              <TouchableOpacity key={i + item.title} onPress={item.onPress}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                  }}>
                  {item.icon}
                  <Text style={{ color: 'red', fontSize: 16 }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DetailTabBar;
