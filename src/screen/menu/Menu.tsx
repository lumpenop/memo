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
  const [counter, setCounter] = useState('');

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
