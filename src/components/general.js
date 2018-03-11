import styled from 'styled-components/native';

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const CenterKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const SubmitButton = styled.TouchableOpacity`
  color: white;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.84);
  font-size: 22px;
  text-align: center;
`;
const QuestionTitle = styled.Text`
  color: #333;
  font-size: 50px;
`;

export { SubmitButton, CenterView, CenterKeyboardAvoidingView, QuestionTitle };
