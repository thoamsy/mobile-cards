import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  CenterKeyboardAvoidingView,
  SubmitButton,
  QuestionTitle,
} from './general';

export default class AddCardDeck extends Component {
  render() {
    return (
      <CenterKeyboardAvoidingView>
        <QuestionTitle>What is the title of your new deck?</QuestionTitle>
        <SubmitButton>
          <Text>Submit</Text>
        </SubmitButton>
      </CenterKeyboardAvoidingView>
    );
  }
}
