import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { getDecks } from '../storage/index';
import { Deck } from './general';

export default class Decks extends Component {
  state = {
    decks: [],
  };
  componentDidMount = async () => {
    const decks = await getDecks();
    if (decks != null) {
      this.setState({ decks });
    }
  };

  render() {
    const decks = Object.values(this.state.decks);
    return (
      <View>
        {decks.length ? (
          decks.map(deck => (
            <Deck
              key={deck.title}
              title={deck.title}
              count={deck.questions.length}
            />
          ))
        ) : (
          <Text>You have no deck, go to add!</Text>
        )}
      </View>
    );
  }
}
