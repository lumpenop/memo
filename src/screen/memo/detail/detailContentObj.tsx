import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { DOT, H1, H2, H3, H4 } from '~/public/svgs';

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
  '#### ': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 14,
    optionText: <H4 />,
  },
  '### ': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 16,
    optionText: <H3 />,
  },
  '## ': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 18,
    optionText: <H2 />,
  },
  '# ': {
    fontWeight: fontWeightBold,
    width: '100%',
    fontSize: 20,
    optionText: <H1 />,
  },
  '- ': {
    fontWeight: 'normal',
    width: '100%',
    fontSize: 16,
    optionText: ' ⦁ ',
  },
};
