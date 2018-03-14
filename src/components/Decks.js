import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import { getDecks } from '../storage/index';
import { Deck } from './general';

export default class Decks extends Component {
  state = {
    decks: [],
  };
  componentDidMount = async () => {
    const decks = await getDecks();
    this.setState({ decks });
    alert(JSON.stringify(decks));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* {Object.values(this.state.decks).map(deck => (
          <Deck
            key={deck.title}
            title={deck.title}
            count={deck.questions.length}
          />
        ))} */}
      </View>
    );
  }
}
