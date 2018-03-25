import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { orderBy, update, concat } from 'lodash/fp';

import Main from './src/navigation-conf';
import { getDecks } from './src/storage/';

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
        <View>
          <StatusBar
            networkActivityIndicatorVisible
            translucent
            barStyle="dark-content"
          />
        </View>
        <Main
          screenProps={{ decks, addDeck: this.addDeck, addCard: this.addCard }}
        />
      </View>
    );
  }
}

export default App;
