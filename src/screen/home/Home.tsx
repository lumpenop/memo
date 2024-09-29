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
import Config from 'react-native-config';

const Home = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isFirst, setIsFirst] = useState(true);
  const [isAvailable, setIsAvailable] = useState<boolean>();
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    console.log(Config.DEFAULT_FOLDER, 'gg');
    if (isFirstRender(isFirst, setIsFirst)) {
      isCloudAvailable().then();
    }
  }, []);

  const isCloudAvailable = async () => {
    const availableState = await CloudStorage.isCloudAvailable();
    console.log(availableState, 'isAvailable');
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
    CloudStorage.exists(`/${Config.DEFAULT_FOLDER}`)
      .then(data => {
        console.log(data, `${Config.DEFAULT_FOLDER}`);
        if (!data) {
          CloudStorage.mkdir(`/${Config.DEFAULT_FOLDER}`)
            .then(data => console.log(data))
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e, 'dd'));
  }, []);

  useEffect(() => {
    CloudStorage.readdir(`/${Config.DEFAULT_FOLDER}`)
      .then(data => {
        if (data.length > 0) {
          const transformData = data.map(fileName => {
            CloudStorage.stat(`/${Config.DEFAULT_FOLDER}/${fileName}`)
              .then(stat => console.log(stat))
              .catch(e => console.log(e));
            return fileName.split('.')[0];
          });

          console.log(data);
          setList(transformData);
        }
      })
      .catch(e => console.log(e));
  }, []);

  // useEffect(() => {
  //   if (!isAvailable) return;
  //   write(String(counter)).catch(e => console.log(e));
  //   CloudStorage.appendFile('/markdown/test.txt', String(content))
  //     .then(data => console.log(data))
  //     .catch(e => console.log(e));
  // }, [write, counter]);

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {list.length === 0 ? <Text>글이 없어요</Text> : <List list={list} />}
        <TouchableOpacity
          onPress={() => navigate('Detail', { title: '' })}
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
