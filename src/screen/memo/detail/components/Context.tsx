import React, { useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { contentBlockObj } from '~/screen/memo/detail/components/detailContentObj.tsx';

interface Props {
  content: string;
}
const useContent = ({ content }: Props) => {
  const blockObjKeys = Object.keys(contentBlockObj);
  return useMemo(() => {
    const splitContent = content.split('\n');
    return splitContent.map((text, index) => {
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
};

export default useContent;
