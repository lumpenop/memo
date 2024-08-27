/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App.tsx';

// Note: import explicitly to use the types shipped with jest.

// eslint-disable-next-line import/no-extraneous-dependencies
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
