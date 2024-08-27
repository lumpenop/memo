import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import {
  useCloudFile,
  CloudStorage,
  useIsCloudAvailable,
} from 'react-native-cloud-storage';
import Toast from 'react-native-toast-message';
import { increase, isFirstRender } from '~/screen/menu/MenuFunc.ts';

const Menu: React.FC = () => {
  const { content, read, write, remove } = useCloudFile('/test.txt');
  const [isFirst, setIsFirst] = useState(true);
  const [isAvailable, setIsAvailable] = useState<boolean>();
  const [counter, setCounter] = useState('');

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
    Toast.show({
      type: 'error',
      text1: 'iCloud 연동 실패',
      text2: 'Apple ID 로그인을 확인해주세요',
      visibilityTime: 20000000000,
    });

    setIsAvailable(availableState);
  };

  useEffect(() => {
    if (isFirstRender(isFirst, setIsFirst)) {
      isCloudAvailable()
        .then()
        .catch(e => console.log(e));
    }

    CloudStorage.readdir('/Documents')
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    if (!isAvailable) return;

    write(String(counter)).catch(e => console.log(e));
    CloudStorage.appendFile('/test.txt', String(content));
  }, [write, counter]);

  const readread = () => {
    read()
      .then(() => console.log(content))
      .catch(e => console.log(e));
  };

  const removeremove = () => {
    remove();
    setCounter('');
  };

  return (
    <View>
      <Text>{content ?? 'File not found'}</Text>
      <Button
        title="Increase"
        onPress={() => setCounter(increase(content ?? counter))}
      />
      <Button title="Delete" onPress={removeremove} />
      <Button title="Re-read" onPress={readread} />
    </View>
  );
};

export default Menu;
