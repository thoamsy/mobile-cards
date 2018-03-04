import styled from 'styled-components/native';
export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;
export const SubmitButton = styled.TouchableOpacity`
  background-color: purple;
  border-radius: ${({ ios }) => (ios ? '8px' : '2px')};
  height: 45px;
  padding: 10px;
  margin: ${({ ios }) => (ios ? '0 40px' : '0')};
`;
export const SubmitText = styled.Text`
  color: white;
  font-size: 22;
  text-align: center;
`;

export const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
`;
export const EntryView = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: purple;
  align-self: center;
  border-radius: 5px;
  margin: 20px;
`;
export const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;
