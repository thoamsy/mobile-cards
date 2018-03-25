import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { orderBy, update, concat } from 'lodash/fp';

import routeOptions, { navigatorOptions } from './src/navigation-conf';
import { getDecks } from './src/storage/';

const Tabs = TabNavigator(routeOptions, navigatorOptions);

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
    const decks = await getDecks();
    if (decks != null) {
      this.setState({
        decks: orderBy('createdTime', 'desc', Object.values(decks)),
      });
    }
  };
  addDeck = deck => {
    this.setState(update('decks', concat(deck)));
  };

  addCard = index => card => {
    this.setState(update(`decks[${index}].questions`, concat(card)));
  };

  render() {
    const { decks } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          networkActivityIndicatorVisible
          translucent
          barStyle="dark-content"
        />
        <Main
          screenProps={{ decks, addDeck: this.addDeck, addCard: this.addCard }}
        />
      </View>
    );
  }
}

export default App;
