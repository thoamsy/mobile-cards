import React, { Component } from 'react';
import {
  CenterKeyboardAvoidingView,
  SubmitButton,
  QuestionTitle,
  SubmitText,
  TextInput,
} from './general';

export default class AddCardDeck extends Component {
  state = {
    cardDeckTitle: '',
  };
  onChangeTitle = text => {
    this.setState({ cardDeckTitle: text });
  };
  onInputDone = () => {
    alert(13);
  };
  render() {
    return (
      <CenterKeyboardAvoidingView behavior="padding">
        <QuestionTitle>What is the title of your new deck?</QuestionTitle>
        <TextInput
          value={this.state.cardDeckTitle}
          onChangeText={this.onChangeTitle}
          onEndEditing={this.onInputDone}
          placeholder="Deck Title"
        />
        <SubmitButton>
          <SubmitText>Submit</SubmitText>
        </SubmitButton>
      </CenterKeyboardAvoidingView>
    );
  }
}
