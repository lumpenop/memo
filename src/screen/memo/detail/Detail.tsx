import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  ScrollView,
  NativeScrollEvent,
  StyleProp,
  TextStyle,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import Layout from '~/components/layout.tsx';
import { contentBlockObj } from '~/screen/memo/detail/detailContentObj.tsx';
import DetailHeader from '~/screen/memo/detail/DetailHeader.tsx';
import DetailTabBar from '~/screen/memo/detail/DetailTabBar.tsx';
import { IFile } from '~/types/recoil.ts';
import { RootStackParamList } from '~/types/navigationTypes.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;
const Detail = ({ route }: Props) => {
  const refTitle = useRef<TextInput>(null);
  const refContent = useRef<TextInput>(null);
  const refContentHeight = useRef<number>(1);
  const refInputHeight = useRef<number>(1);
  const refScrollContentView = useRef<ScrollView>(null);
  const refScrollInputView = useRef<ScrollView>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [inputY, setInputY] = useState<number>();
  const [file, setFile] = useState<IFile>();

  useEffect(() => {
    setTitle(route.params.title);
  }, [route]);

  useEffect(() => {
    if (!file) return;
    setFile({ title, content });
  }, [content, title]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      refScrollContentView.current?.scrollTo({
        y: inputY,
      });
    }, 40);
    return () => clearTimeout(debounce);
  }, [inputY]);

  const onTitleSubmit = () => {
    refContent.current?.focus();
  };
  const onContentKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const { key } = e.nativeEvent;
    if (key !== 'Backspace' || content) return;
    refTitle.current?.focus();
  };
  const onChangeContent = (text: string) => {
    setContent(text);
  };

  const onInputScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const ratio = refContentHeight.current / refInputHeight.current;
    setInputY(e.nativeEvent.contentOffset.y * Math.round(ratio));
  };

  const blockObjKeys = Object.keys(contentBlockObj);

  const context = useMemo(() => {
    return content.split('\n').map((text, index) => {
      const startsWith = blockObjKeys.filter(item => text.startsWith(item))[0];
      if (startsWith) {
        const resultText = text.split(startsWith)[1];
        const isOptionText = startsWith === '- ' || !resultText;
        const { fontSize, fontWeight, width, optionText } =
          contentBlockObj[startsWith as string];
        return (
          <Text key={`key=${index}`}>
            {isOptionText && (
              <Text
                style={{
                  fontSize: 18,
                  paddingVertical: 1,
                }}>
                {optionText}
              </Text>
            )}
            <Text
              style={
                {
                  width,
                  fontSize,
                  fontWeight,
                } as StyleProp<TextStyle>
              }>{`${text.split(startsWith)[1]}`}</Text>
          </Text>
        );
      }

      return (
        <Text
          key={`key=${index}`}
          style={{ width: '100%', paddingVertical: 2.5 }}>{`${text}`}</Text>
      );
    });
  }, [content]);

  return (
    <View style={{ flex: 1 }}>
      <DetailTabBar content={content} title={title} />
      <Layout>
        <DetailHeader
          title={title}
          setTitle={setTitle}
          onTitleSubmit={onTitleSubmit}
          ref={refTitle}
        />
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
          }}>
          <View style={{ flex: 2 }}>
            <ScrollView
              ref={refScrollContentView}
              onContentSizeChange={contentHeight => {
                refContentHeight.current = contentHeight;
              }}
              scrollEventThrottle={1000}>
              {context}
            </ScrollView>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={refScrollInputView}
              onScroll={onInputScroll}
              onContentSizeChange={contentHeight => {
                refScrollInputView.current?.scrollToEnd({ animated: true });
                refInputHeight.current = contentHeight;
              }}>
              <TextInput
                multiline
                onChangeText={onChangeContent}
                value=""
                style={{ fontSize: 16 }}
                hitSlop={4}
                ref={refContent}
                scrollEnabled={false}
                onKeyPress={onContentKeyPress}>
                {content}
              </TextInput>
            </ScrollView>
          </View>
        </View>
        <View />
      </Layout>
    </View>
  );
};

export default Detail;
