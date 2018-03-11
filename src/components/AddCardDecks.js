import React, { Component } from 'react';
import { set } from 'lodash/fp';
import {
  CenterKeyboardAvoidingView,
  SubmitButton,
  QuestionTitle,
  SubmitText,
  TextInput,
} from './general';
import { saveDeckTitle, getDecks } from '../storage';

export default class AddCardDeck extends Component {
  state = {
    cardDeckTitle: '',
  };

  onChangeTitle = text => {
    this.setState({ cardDeckTitle: text });
  };
  onInputDone = () => {
    saveDeckTitle(this.state.cardDeckTitle)
      .then(this.setState(set('cardDeckTitle', '')))
      .then(() => alert('添加成功'));
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
