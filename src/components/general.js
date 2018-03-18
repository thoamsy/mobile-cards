import React from 'react';
import styled from 'styled-components/native';

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CenterKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const SubmitButton = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.84);
  padding: 10px;
`;

const SubmitText = styled.Text`
  color: white;
  font-size: 22px;
`;
const QuestionTitle = styled.Text`
  color: #333;
  margin: 20px 0;
  font-size: 40px;
  text-align: center;
`;

const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  autoCorrect: true,
  autoCapitalize: 'words',
  returnKeyType: 'done',
  clearButtonMode: 'while-editing',
})`
  margin: 20px 0;
  padding: 8px;
  width: 300px;
  height: 44px;
  border: 2px solid black;
  border-radius: 8px;
`;

const DeckContainer = styled.TouchableOpacity`
  border: 1px solid black;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DeckTitle = SubmitText.extend`
  color: black;
  font-size: 22px;
  margin: 8px 0;
`;
const DeckCountText = SubmitText.extend`
  color: #333;
  font-size: 16px;
`;

const Deck = ({ title, count, onPress }) => (
  <DeckContainer onPress={onPress}>
    <DeckTitle>{title}</DeckTitle>
    <DeckCountText>{`${count} ${count <= 1 ? 'card' : 'cards'}`}</DeckCountText>
  </DeckContainer>
);

const AddCardButton = SubmitButton.extend`
  background-color: white;
  width: 60%;
  border: 1px solid black;
  height: 66px;
  margin: 8px 0;
`;
const StartQuizButton = AddCardButton.extend`
  background-color: black;
`;
const StartQuizText = SubmitText.extend`
  color: white;
  font-size: 22px;
  height: 44px;
  text-align: center;
  padding: 8px 0;
`;
const AddCardText = StartQuizText.extend`
  color: black;
`;
export {
  SubmitButton,
  CenterView,
  CenterKeyboardAvoidingView,
  QuestionTitle,
  SubmitText,
  TextInput,
  Deck,
  StartQuizButton,
  AddCardButton,
  DeckTitle,
  DeckCountText,
  StartQuizText,
  AddCardText,
};
