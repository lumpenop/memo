import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';

const fontWeightBold = 700;
interface IContentBlockObj {
  [index: string]: {
    width: string | number;
    fontWeight: string | number;
    fontSize: number;
    optionText: ReactNode;
  };
}
export const contentBlockObj: IContentBlockObj = {
  '####': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 14,
    optionText: '',
  },
  '###': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 16,
    optionText: '',
  },
  '##': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 18,
    optionText: '',
  },
  '#': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 20,
    optionText: '',
  },
  '-': {
    fontWeight: 'normal',
    width: '100%',
    fontSize: 14,
    optionText: (
      <View
        style={{
          height: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 7 }}>{'\u00A0\u00A0\u00A0\u00A0● '}</Text>
      </View>
    ),
  },
};
