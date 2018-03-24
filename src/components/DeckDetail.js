import React from 'react';
import { View } from 'react-native';
import {
  StartQuizButton,
  StartQuizText,
  AddCardButton,
  AddCardText,
  CenterView,
  Deck,
} from './general';

const DeckDetail = ({ navigation: { navigate, state: { params } } }) => (
  <CenterView style={{ justifyContent: 'space-around' }}>
    <Deck title={params.title} count={params.deck.questions.length} />
    <View>
      <AddCardButton
        onPress={() => {
          navigate('AddCard', { ...params });
        }}
      >
        <AddCardText>Add Card</AddCardText>
      </AddCardButton>
      <StartQuizButton>
        <StartQuizText>Start Quiz</StartQuizText>
      </StartQuizButton>
    </View>
  </CenterView>
);

export default DeckDetail;
