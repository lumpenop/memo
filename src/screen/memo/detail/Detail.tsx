import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  ScrollView,
  NativeScrollEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import Layout from '~/components/layout.tsx';
import useContent from '~/screen/memo/detail/components/Context.tsx';
import DetailHeaderWithTitle from '~/screen/memo/detail/components/DetailHeaderWithTitle.tsx';
import DetailTabBar from '~/screen/memo/detail/components/DetailTabBar.tsx';
import { RootStackParamList } from '~/types/navigationTypes.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;
const Detail = ({ route }: Props) => {
  const refTitleInput = useRef<TextInput>(null);
  const refContentInput = useRef<TextInput>(null);
  const refContentHeight = useRef<number>(1);
  const refInputHeight = useRef<number>(1);
  const refScrollContentView = useRef<ScrollView>(null);
  const refScrollInputView = useRef<ScrollView>(null);
  const refTitle = useRef<string>('');
  const refContent = useRef<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [inputY, setInputY] = useState<number>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { mtimeMs, fileName } = route.params.item;

  useEffect(() => {
    setTitle(route.params.item.title);
    setContent(route.params.item.content);
    refTitle.current = route.params.item.title;
    refContent.current = route.params.item.content;
  }, [route]);

  useEffect(() => {
    console.log(isEdit);
  }, [isEdit]);

  useEffect(() => {
    if (!title) return;
    if (refTitle.current === title && refContent.current === content) return;
    setIsEdit(true);
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
    refContentInput.current?.focus();
  };
  const onContentKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const { key } = e.nativeEvent;
    if (key !== 'Backspace' || content) return;
    refTitleInput.current?.focus();
  };
  const onChangeContent = (text: string) => {
    setContent(text);
  };

  const onInputScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const ratio = refContentHeight.current / refInputHeight.current;
    setInputY(e.nativeEvent.contentOffset.y * Math.round(ratio));
  };

  const checkDot = (text: string) => {
    const splitContent = content.split('\n');
    if (splitContent.length === 1) return text;
    const prevContent = splitContent[splitContent.length - 2];
    const prevDetail = prevContent.split('- ')[1];
    const isDot = prevContent.startsWith('- ') && prevDetail.length !== 0;
    if (isDot && splitContent[splitContent.length - 1].length === 0) {
      setContent(`${content}- `);
      return `${content}- `;
    }
    const isEmptyDot = prevContent.startsWith('- ') && prevDetail.length === 0;
    if (isEmptyDot) {
      splitContent[splitContent.length - 2] = '';
      const newContent = splitContent.join('\n');
      setContent(newContent);
      return newContent;
    }
    return text;
  };
  const context = useContent({ content: checkDot(content) });

  return (
    <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
      <View style={{ flex: 1 }}>
        <DetailTabBar
          fileName={fileName}
          content={content}
          title={title}
          isEdit={isEdit}
          mtimeMs={mtimeMs}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
        <Layout>
          <DetailHeaderWithTitle
            title={title}
            setTitle={setTitle}
            onTitleSubmit={onTitleSubmit}
            ref={refTitleInput}
            setIsMenuOpen={setIsMenuOpen}
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
                  ref={refContentInput}
                  scrollEnabled={false}
                  onKeyPress={onContentKeyPress}
                  onFocus={() => setIsMenuOpen(false)}>
                  {content}
                </TextInput>
              </ScrollView>
            </View>
          </View>
          <View />
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Detail;
