import React, { Component } from 'react';
import {
  TextInput,
  SubmitButton,
  SubmitText,
  CenterKeyboardAvoidingView,
} from './general';

class AddCard extends Component {
  render() {
    return (
      <CenterKeyboardAvoidingView>
        <TextInput placeholder="The question" />
        <TextInput placeholder="The answer" />
        <SubmitButton>
          <SubmitText>Submit</SubmitText>
        </SubmitButton>
      </CenterKeyboardAvoidingView>
    );
  }
}

export default AddCard;
