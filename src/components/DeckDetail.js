import React from 'react';
import { View } from 'react-native';
import { update, concat } from 'lodash/fp';
import {
  StartQuizButton,
  StartQuizText,
  AddCardButton,
  AddCardText,
  CenterView,
  Deck,
} from './general';

const DeckDetail = ({ navigation }) => {
  const { state: { params }, navigate } = navigation;
  const { title, deck } = params;

  const addCard = card => {
    params.addCard(card);
    navigation.setParams({
      deck: update('questions', concat(card), deck),
    });
  };
  return (
    <CenterView style={{ justifyContent: 'space-around' }}>
      <Deck title={title} count={deck.questions.length} />
      <View>
        <AddCardButton
          onPress={() => {
            navigate('AddCard', {
              title: params.title,
              addCard,
            });
          }}
        >
          <AddCardText>Add Card</AddCardText>
        </AddCardButton>
        <StartQuizButton
          onPress={() => {
            navigate('Quiz', {
              deck,
            });
          }}
        >
          <StartQuizText>Start Quiz</StartQuizText>
        </StartQuizButton>
      </View>
    </CenterView>
  );
};

export default DeckDetail;
