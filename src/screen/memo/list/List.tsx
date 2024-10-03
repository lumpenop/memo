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
      {list.map((item, i) => {
        return (
          <ListCard
            key={i + item.title}
            fileName={item.fileName}
            title={item.title}
            content={item.content}
            birthtimeMs={item.birthtimeMs}
            mtimeMs={item.mtimeMs}
          />
        );
      })}
    </ScrollView>
  );
};

export default List;
