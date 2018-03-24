import React, { Component, Fragment } from 'react';
import { Button, View } from 'react-native';
import { update, add } from 'lodash/fp';

import { CenterView, SubmitButton, SubmitText } from './general';

const addOne = add(1);
const TitleText = SubmitText.extend`
  color: black;
  text-align: center;
  font-size: 32px;
`;
const ProgressText = TitleText.extend`
  font-size: 22px;
  text-align: left;
  margin-left: 8px;
  margin-top: 15px;
`;

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  state = {
    currentQuestion: 0,
    correctCount: 0,
  };

  get totalQuestion() {
    // 真他妈的长
    return this.props.navigation.state.params.deck.questions.length;
  }

  onCorrect = () => {
    this.setState(update('currentQuestion', addOne));
    this.setState(update('correctCount', addOne));
  };

  onIncorrect = () => {
    this.setState(update('currentQuestion', addOne));
  };

  render() {
    const { navigation } = this.props;
    const { currentQuestion } = this.state;
    const { deck } = navigation.state.params;
    const quiz = deck.questions[currentQuestion];

    return (
      <Fragment>
        <ProgressText>
          {currentQuestion}/{this.totalQuestion}
        </ProgressText>
        <CenterView style={{ justifyContent: 'space-around' }}>
          <View style={{ padding: 10 }}>
            <TitleText>{quiz.question}</TitleText>
            <Button title="Answer" color="#c4392a" />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <SubmitButton backgroundColor="#377d22" onPress={this.onCorrect}>
              <SubmitText>Correct</SubmitText>
            </SubmitButton>
            <SubmitButton backgroundColor="#c4392a" onPress={this.onIncorrect}>
              <SubmitText>Incorrect</SubmitText>
            </SubmitButton>
          </View>
        </CenterView>
      </Fragment>
    );
  }
}

export default Quiz;
