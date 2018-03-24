import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { get } from 'lodash/fp';
import { Deck, Tips, CenterView } from './general';

const DeckContainer = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Deck title={item.title} count={item.questions.length} borderSize={1} />
  </TouchableOpacity>
);
const Decks = ({ screenProps, navigation }) => {
  const { decks, addCard } = screenProps;

  return decks.length ? (
    <FlatList
      data={decks}
      keyExtractor={get('title')}
      renderItem={({ item, index }) => (
        <DeckContainer
          item={item}
          onPress={() =>
            navigation.navigate({
              routeName: 'DeckDetail',
              params: {
                title: item.title,
                deck: item,
                addCard: addCard(index),
              },
            })
          }
        />
      )}
    />
  ) : (
    <CenterView>
      <Tips>You have no deck, go to add!</Tips>
    </CenterView>
  );
};
export default Decks;
