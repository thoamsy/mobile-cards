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
  text-align: center;
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

export {
  SubmitButton,
  CenterView,
  CenterKeyboardAvoidingView,
  QuestionTitle,
  SubmitText,
  TextInput,
};
