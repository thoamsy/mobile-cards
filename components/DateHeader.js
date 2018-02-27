// @flow
import React from 'react';
import { Text } from 'react-native';
import { purple } from '../utils/colors';

export default ({ date }) => (
  <Text style={{ color: purple, fontSize: 25 }}>{date}</Text>
);
