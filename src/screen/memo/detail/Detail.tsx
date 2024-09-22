import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import Layout from '~/components/layout.tsx';
import { HEADER } from '~/public/svgs';
import DetailTabBar from '~/screen/memo/detail/DetailTabBar.tsx';
import { RootStackParamList } from '~/types/navigationTypes.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;
const Detail = ({ route }: Props) => {
  const refTitle = useRef<TextInput>(null);
  const refContent = useRef<TextInput>(null);
  const { id } = route.params;
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onTitleSubmit = () => {
    refContent.current?.focus();
  };
  const onContentKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const { key } = e.nativeEvent;
    if (key !== 'Backspace') return;
    refTitle.current?.focus();
  };
  return (
    <View style={{ flex: 1 }}>
      <DetailTabBar />
      <Layout>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
          }}>
          {!title && <HEADER width={24} height={24} />}
          <TextInput
            onChangeText={text => setTitle(text)}
            value={title}
            style={{ fontSize: 20, fontWeight: '600', height: 40 }}
            onSubmitEditing={onTitleSubmit}
            hitSlop={20}
            ref={refTitle}
          />
        </View>
        <TextInput
          multiline
          numberOfLines={10}
          onChangeText={text => setContent(text)}
          value={content}
          style={{ fontSize: 16 }}
          hitSlop={4}
          ref={refContent}
          onKeyPress={onContentKeyPress}
        />
        <View />
      </Layout>
    </View>
  );
};

export default Detail;
