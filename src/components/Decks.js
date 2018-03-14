import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
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
    return decks.length ? (
      <FlatList
        data={decks}
        renderItem={({ item, index }) => (
          <Deck title={item.title} count={item.questions.length} key={index} />
        )}
      />
    ) : (
      <Text>You have no deck, go to add!</Text>
    );
  }
}
