import React from 'react';

import AddCardDecks from './components/AddCardDecks';
import Decks from './components/Decks';
import { FontAwesome } from '@expo/vector-icons';

const tabOptions = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: () => <FontAwesome name="question" size={20} />,
    },
  },
  AddCardDecks: {
    screen: AddCardDecks,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: () => <FontAwesome name="edit" size={20} />,
    },
  },
};
export const navigatorOptions = {
  swipeEnable: true,
  animatedEnable: true,
  header: null,
};

const stackOptions = {};

export default tabOptions;
