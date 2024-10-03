import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CloudStorage } from 'react-native-cloud-storage';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from 'react-native-screens/native-stack';
import Toast from 'react-native-toast-message';
import { useRecoilState } from 'recoil';
import Layout from '~/components/layout.tsx';
import List from '~/screen/memo/list/List.tsx';
import { isFirstRender } from '~/screen/menu/MenuFunc.ts';
import { RootStackParamList } from '~/types/navigationTypes.ts';
import { PENCIL } from '~/public/svgs/';
import Config from 'react-native-config';
import {
  dataAtom,
  folderLengthAtom,
  folderPathAtom,
  listAtom,
} from '~/types/recoil.ts';

export interface IContent {
  fileName: string;
  title: string;
  content: string;
  birthtimeMs: number;
  mtimeMs: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Root'>;
const Home = ({ navigation }: Props) => {
  const { navigate } = navigation;
  const [isFirst, setIsFirst] = useState(true);
  const [isAvailable, setIsAvailable] = useState<boolean>();
  const [list, setList] = useRecoilState(listAtom);
  const [data, setData] = useRecoilState(dataAtom);
  const [, setFolderPath] = useRecoilState(folderPathAtom);
  const [, setFolderLength] = useRecoilState(folderLengthAtom);

  useEffect(() => {
    setFolderPath(`${Config.DEFAULT_FOLDER}`);
  }, []);

  useEffect(() => {
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
      .then(response => {
        console.log(response, `${Config.DEFAULT_FOLDER}`);
        if (!response) {
          CloudStorage.mkdir(`/${Config.DEFAULT_FOLDER}`)
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e, 'dd'));
  }, []);

  const getDatas = () => {
    CloudStorage.readdir(`/${Config.DEFAULT_FOLDER}`)
      .then(response => {
        console.log(response, 'response');
        setData(response);
        setFolderLength(response.length);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getDatas();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setList([]);
      data.forEach(fileName => {
        CloudStorage.readFile(`/${Config.DEFAULT_FOLDER}/${fileName}`)
          .then(item => {
            const transformData = JSON.parse(item);
            const { title, content } = transformData;
            const fileObj: IContent = {
              fileName,
              title,
              content,
              birthtimeMs: 0,
              mtimeMs: 0,
            };
            CloudStorage.stat(`/${Config.DEFAULT_FOLDER}/${fileName}`).then(
              stat => {
                const { birthtimeMs, mtimeMs } = stat;
                fileObj.birthtimeMs = birthtimeMs;
                fileObj.mtimeMs = mtimeMs;
                setList(prev =>
                  [...prev, fileObj].sort((a, b) => b.mtimeMs - a.mtimeMs),
                );
              },
            );
          })
          .catch(e => console.log(e));
      });
    }
  }, [data]);

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
