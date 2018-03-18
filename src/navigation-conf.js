import React from 'react';

import AddCardDecks from './components/AddCardDecks';
import Decks from './components/Decks';
import DeckDetail from './components/DeckDetail';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

const stackOptions = {
  Decks: {
    screen: Decks,
    path: 'decks/',
  },
  DeckDetail: {
    screen: DeckDetail,
    path: 'decks/:title',
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
};

const Home = StackNavigator(stackOptions, { headerMode: 'none' });

const tabOptions = {
  Main: {
    screen: Home,
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
export const navigatorOptions = {};

export default tabOptions;
