import React from 'react';
import { Animated } from 'react-native';
import ListCard from '~/screen/memo/list/ListCard.tsx';

import ScrollView = Animated.ScrollView;

interface Props {
  list: string[];
}
const List = ({ list }: Props) => {
  return (
    <ScrollView>
      {list.map((title, i) => {
        return <ListCard key={i + title} title={title} />;
      })}
    </ScrollView>
  );
};

export default List;
