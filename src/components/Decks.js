import React from 'react';
import { FlatList, Text } from 'react-native';
import { Deck } from './general';

const Decks = ({ screenProps }) => {
  const { decks } = screenProps;

  return decks.length ? (
    <FlatList
      data={decks}
      renderItem={({ item }) => (
        <Deck
          title={item.title}
          count={item.questions.length}
          key={item.title}
        />
      )}
    />
  ) : (
    <Text>You have no deck, go to add!</Text>
  );
};
export default Decks;
