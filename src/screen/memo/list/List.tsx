import React from 'react';
import { Animated } from 'react-native';
import { IContent } from '~/screen/home/Home.tsx';
import ListCard from '~/screen/memo/list/ListCard.tsx';

import ScrollView = Animated.ScrollView;

interface Props {
  list: IContent[];
}
const List = ({ list }: Props) => {
  return (
    <ScrollView>
      {list.map((content, i) => {
        return <ListCard key={i + content.title} content={content} />;
      })}
    </ScrollView>
  );
};

export default List;
