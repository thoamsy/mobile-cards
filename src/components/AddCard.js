import React, { Component } from 'react';
import { Button } from 'react-native';
import {
  TextInput,
  SubmitButton,
  SubmitText,
  CenterKeyboardAvoidingView,
} from './general';
import { addQuestions } from '../storage';
import { pick } from 'lodash/fp';

const initialState = {
  question: '',
  answer: '',
};
class AddCard extends Component {
  static navigationOptions = {
    headerRight: <Button title="info" color="#abc" />,
  };
  state = initialState;

  onChangeQuestion = question => this.setState({ question });
  onChangeAnswer = answer => this.setState({ answer });

  turnNextInput = () => {
    this.answerInput.focus();
  };
  onSubmit = () => {
    if (!(this.state.question && this.state.answer)) return;
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { title, addCard } = params;

    const card = pick(['question', 'answer'], this.state);
    addQuestions(title, card)
      .then(() => addCard(card))
      .then(() => {
        navigation.goBack();
      });
  };
  render() {
    return (
      <CenterKeyboardAvoidingView behavior="padding">
        <TextInput
          placeholder="The question"
          returnKeyType="next"
          autoFocus
          value={this.state.question}
          onChangeText={this.onChangeQuestion}
          onSubmitEditing={this.turnNextInput}
          blurOnSubmit={false}
        />
        <TextInput
          placeholder="The answer"
          returnKeyType="done"
          value={this.state.answer}
          onChangeText={this.onChangeAnswer}
          innerRef={node => (this.answerInput = node)}
          onSubmitEditing={this.onSubmit}
        />
        <SubmitButton onPress={this.onSubmit}>
          <SubmitText>Submit</SubmitText>
        </SubmitButton>
      </CenterKeyboardAvoidingView>
    );
  }
}

export default AddCard;
