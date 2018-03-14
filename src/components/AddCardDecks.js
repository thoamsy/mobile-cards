import React, { Component } from 'react';
import { set } from 'lodash/fp';
import {
  CenterKeyboardAvoidingView,
  SubmitButton,
  QuestionTitle,
  SubmitText,
  TextInput,
} from './general';
import { saveDeckTitle } from '../storage';

export default class AddCardDeck extends Component {
  state = {
    cardDeckTitle: '',
  };

  onChangeTitle = text => {
    this.setState({ cardDeckTitle: text });
  };
  onInputDone = () => {
    if (!this.state.cardDeckTitle) return;
    saveDeckTitle(this.state.cardDeckTitle)
      .then(this.setState(set('cardDeckTitle', '')))
      .then(() => alert('添加成功'));
  };
  render() {
    const { cardDeckTitle } = this.state;
    return (
      <CenterKeyboardAvoidingView behavior="padding">
        <QuestionTitle>What is the title of your new deck?</QuestionTitle>
        <TextInput
          value={cardDeckTitle}
          onChangeText={this.onChangeTitle}
          onEndEditing={this.onInputDone}
          placeholder="Deck Title"
        />
        <SubmitButton
          onPress={this.onInputDone}
          opacity={!!cardDeckTitle ? 1 : 0.2}
        >
          <SubmitText>Submit</SubmitText>
        </SubmitButton>
      </CenterKeyboardAvoidingView>
    );
  }
}