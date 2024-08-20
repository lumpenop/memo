import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SEARCH } from '~/public/svgs';

const HeaderRight = () => {
  return (
    <TouchableOpacity
      style={{ right: 8, bottom: 2 }}
      activeOpacity={0.4}
      onPress={() => console.log('hi')}>
      <SEARCH width={24} />
    </TouchableOpacity>
  );
};
export default HeaderRight;
