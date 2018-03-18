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
    const { screenProps, navigation } = this.props;
    const { addDeck } = screenProps;
    saveDeckTitle(this.state.cardDeckTitle.trim())
      .then(addDeck)
      .then(() => this.setState(set('cardDeckTitle', '')))
      .then(() => navigation.navigate('Decks'));
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
        <SubmitButton onPress={this.onInputDone}>
          <SubmitText>Submit</SubmitText>
        </SubmitButton>
      </CenterKeyboardAvoidingView>
    );
  }
}
