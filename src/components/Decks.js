import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Deck, Tips, CenterView } from './general';

const Decks = ({ screenProps, navigation }) => {
  const { decks } = screenProps;

  return decks.length ? (
    <FlatList
      data={decks}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              routeName: 'DeckDetail',
              params: { title: item.title, deck: item },
            })
          }
          key={item.title}
        >
          <Deck
            title={item.title}
            count={item.questions.length}
            borderSize={1}
          />
        </TouchableOpacity>
      )}
    />
  ) : (
    <CenterView>
      <Tips>You have no deck, go to add!</Tips>
    </CenterView>
  );
};
export default Decks;
