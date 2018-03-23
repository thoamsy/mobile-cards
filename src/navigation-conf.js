import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import AddCardDecks from './components/AddCardDecks';
import Decks from './components/Decks';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';

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
  AddCard: {
    screen: AddCard,
    path: 'decks/:title/add',
    navigationOptions: ({ navigation }) => ({
      title: 'Add Card',
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
