import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { useCloudFile } from 'react-native-cloud-storage';

const Menu: React.FC = () => {
  const { content, read, write, remove } = useCloudFile('/test.txt');

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    write(String(counter)).catch(e => console.log(e));
  }, [write, counter]);

  const increase = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const readread = () => {
    read()
      .then(() => console.log(content))
      .catch(e => console.log(e));
  };

  return (
    <View>
      <Text>{content ?? 'File not found'}</Text>
      <Button title="Increase" onPress={increase} />
      <Button title="Delete" onPress={remove} />
      <Button title="Re-read" onPress={readread} />
    </View>
  );
};

export default Menu;
