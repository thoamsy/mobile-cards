import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { orderBy, update, concat } from 'lodash/fp';
import tabOptions, { navigatorOptions } from './src/navigation-conf';

import { getDecks } from './src/storage/';

const Tabs = TabNavigator(tabOptions, navigatorOptions);

const Main = StackNavigator({
  Home: {
    screen: Tabs,
    path: 'home/',
  },
});
class App extends Component {
  state = {
    decks: [],
  };

  componentDidMount = async () => {
    const decks = orderBy(
      'createdTime',
      ['desc'],
      Object.values(await getDecks())
    );
    if (decks != null) {
      this.setState({ decks });
    }
  };

  addDeck = deck => {
    this.setState(update('decks', concat(deck)));
  };

  render() {
    const { decks } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar networkActivityIndicatorVisible translucent />
        <Main screenProps={{ decks, addDeck: this.addDeck }} />
      </View>
    );
  }
}

export default App;
