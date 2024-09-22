import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CloudStorage, useCloudFile } from 'react-native-cloud-storage';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Toast from 'react-native-toast-message';
import Layout from '~/components/layout.tsx';
import List from '~/screen/memo/list/List.tsx';
import { isFirstRender } from '~/screen/menu/MenuFunc.ts';
import { RootStackParamList } from '~/types/navigationTypes.ts';
import { PENCIL } from '~/public/svgs/';

const Home = () => {
  const { content, read, write, remove } = useCloudFile('/test.txt');
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isFirst, setIsFirst] = useState(true);
  const [isAvailable, setIsAvailable] = useState<boolean>();

  const [counter, setCounter] = useState('');

  useEffect(() => {
    console.log(content, 'content');
  }, [content]);

  useEffect(() => {
    if (!isAvailable) return;
    write(String(counter)).catch(e => console.log(e));
    CloudStorage.appendFile('/test.txt', String(content))
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }, [write, counter]);

  const isCloudAvailable = async () => {
    const availableState = await CloudStorage.isCloudAvailable();
    console.log('available', availableState);
    if (!availableState) {
      Toast.show({
        type: 'error',
        text1: 'iCloud 연동 실패',
        text2: 'Apple ID 로그인을 확인해주세요',
        visibilityTime: 200000,
      });
    }
    setIsAvailable(availableState);
  };

  useEffect(() => {
    if (isFirstRender(isFirst, setIsFirst)) {
      isCloudAvailable()
        .then()
        .catch(e => console.log(e));
    }

    CloudStorage.readdir('/Documents')
      .then(data => console.log(data, 'ㅇㅁㅅㅁ'))
      .catch(e => console.log(e, 'ㅇㅁ'));
  }, []);

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {!content ? <Text>글이 없어요</Text> : <List />}
        <TouchableOpacity
          onPress={() => navigate('Detail', { id: 1 })}
          activeOpacity={0.85}
          style={{
            backgroundColor: 'tomato',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}>
          <PENCIL width={40} height={40} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Home;
