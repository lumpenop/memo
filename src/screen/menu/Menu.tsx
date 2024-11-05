import { MarkdownTextInput } from '@expensify/react-native-live-markdown';
import React from 'react';

export default function App() {
  const [text, setText] = React.useState('Hello, *world*!');

  return <MarkdownTextInput multiline value={text} onChangeText={setText} />;
}
