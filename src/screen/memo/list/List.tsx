import React from 'react';
import { Animated } from 'react-native';
import ListCard from '~/screen/memo/list/ListCard.tsx';

import ScrollView = Animated.ScrollView;

const List = () => {
  return (
    <ScrollView>
      <ListCard id={0} />
      <ListCard id={1} />
    </ScrollView>
  );
};

export default List;
