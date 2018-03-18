import React from 'react';
import { View } from 'react-native';
import {
  StartQuizButton,
  StartQuizText,
  AddCardButton,
  AddCardText,
  DeckCountText,
  DeckTitle,
  CenterView,
} from './general';

const DeckDetail = ({ navigation: { state: { params } } }) => (
  <CenterView>
    <DeckTitle>{params.title}</DeckTitle>
    <DeckCountText>{params.deck.questions.length}</DeckCountText>
    <AddCardButton>
      <AddCardText>shit</AddCardText>
    </AddCardButton>
    <StartQuizButton>
      <StartQuizText>fuck</StartQuizText>
    </StartQuizButton>
  </CenterView>
);

export default DeckDetail;
