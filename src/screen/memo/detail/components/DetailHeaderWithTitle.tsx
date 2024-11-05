import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';
import { H1 } from '~/public/svgs';

interface forwardRefProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onTitleSubmit: () => void;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailHeaderWithTitle = forwardRef<TextInput, forwardRefProps>(
  ({ title, setTitle, onTitleSubmit, setIsMenuOpen }: forwardRefProps, ref) => {
    return (
      <Header
        title={title}
        setTitle={setTitle}
        refTitle={ref}
        onTitleSubmit={onTitleSubmit}
        setIsMenuOpen={setIsMenuOpen}
      />
    );
  },
);
DetailHeaderWithTitle.displayName = 'Header';

type HeaderProps = forwardRefProps & {
  refTitle: React.ForwardedRef<TextInput>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({
  title,
  setTitle,
  refTitle,
  onTitleSubmit,
  setIsMenuOpen,
}: HeaderProps) => {
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
        onFocus={() => setIsMenuOpen(false)}
        onSubmitEditing={onTitleSubmit}
        hitSlop={20}
        ref={refTitle}
      />
    </View>
  );
};

export default DetailHeaderWithTitle;
