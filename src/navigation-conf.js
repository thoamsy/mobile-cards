import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AddCardDecks from './components/AddCardDecks';
import Decks from './components/Decks';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

const stackOptions = {
  Decks: {
    screen: Decks,
    path: 'decks/',
    navigationOptions: () => ({
      title: 'Decks',
    }),
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
    navigationOptions: () => ({
      title: 'Add Card',
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: () => ({
      title: 'Quiz',
    }),
  },
  initialRouteName: 'Decks',
};

const Home = StackNavigator(stackOptions);

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
const routeOptions = { navigationOptions: { header: null } };

const Main = TabNavigator(tabOptions, routeOptions);

export default Main;
