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
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 44px;
  padding: 8px;
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
  autoCapitalize: 'sentences',
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

const DeckContainer = styled.View`
  border: ${({ borderSize = 0 }) => borderSize + 'px solid black'};
  height: 200px;
  width: 100%;
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

const Deck = ({ title, count, onPress, borderSize }) => (
  <DeckContainer onPress={onPress} borderSize={borderSize}>
    <DeckTitle>{title}</DeckTitle>
    <DeckCountText>{`${count} ${count <= 1 ? 'card' : 'cards'}`}</DeckCountText>
  </DeckContainer>
);

const AddCardButton = SubmitButton.extend`
  background-color: white;
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
  text-align: center;
`;
const AddCardText = StartQuizText.extend`
  color: black;
`;

const Tips = styled.Text`
  font-size: 36px;
  color: rgba(0, 0, 0, 0.84);
  text-align: center;
  padding: 15px;
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
  StartQuizText,
  AddCardText,
  Tips,
};
