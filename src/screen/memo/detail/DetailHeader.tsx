import React, { ForwardedRef, forwardRef } from 'react';
import { TextInput, View } from 'react-native';
import { H1 } from '~/public/svgs';

interface forwardRefProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onTitleSubmit: () => void;
}

const DetailHeader = forwardRef<TextInput, forwardRefProps>(
  ({ title, setTitle, onTitleSubmit }: forwardRefProps, ref) => {
    return (
      <Header
        title={title}
        setTitle={setTitle}
        refTitle={ref}
        onTitleSubmit={onTitleSubmit}
      />
    );
  },
);
DetailHeader.displayName = 'Header';

type HeaderProps = forwardRefProps & {
  refTitle: React.ForwardedRef<TextInput>;
};
const Header = ({ title, setTitle, refTitle, onTitleSubmit }: HeaderProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
      }}>
      {!title && <H1 width={24} height={24} />}
      <TextInput
        onChangeText={text => setTitle(text)}
        value={title}
        style={{
          fontSize: 22,
          fontWeight: '600',
          height: 40,
          width: '100%',
        }}
        onSubmitEditing={onTitleSubmit}
        hitSlop={20}
        ref={refTitle}
      />
    </View>
  );
};

export default DetailHeader;
