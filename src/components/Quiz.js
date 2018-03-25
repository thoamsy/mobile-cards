import React, { Component, Fragment } from 'react';
import { Button, View } from 'react-native';
import { update, add, shuffle } from 'lodash/fp';

import { CenterView, SubmitButton, SubmitText } from './general';
import ResultModal from './ResultModal';

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
    modalVisible: false,
  };

  get modalVisible() {
    return this.state.modalVisible;
  }

  set modalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  get deck() {
    return this.props.navigation.state.params.deck;
  }
  questions = shuffle(this.deck.questions).slice(-10);
  get totalQuestion() {
    return Math.min(this.questions.length, 10);
  }

  onHideModal = () => {
    this.modalVisible = false;
    this.props.navigation.goBack();
  };
  finishQuiz = () => {
    this.modalVisible = true;
  };
  onCorrect = () => {
    if (this.state.currentQuestion + 1 === this.totalQuestion) {
      return this.finishQuiz();
    }
    this.setState(update('currentQuestion', addOne));
    this.setState(update('correctCount', addOne));
  };

  onIncorrect = () => {
    if (this.state.currentQuestion + 1 === this.totalQuestion) {
      return this.finishQuiz();
    }
    this.setState(update('currentQuestion', addOne));
  };

  render() {
    const { currentQuestion, correctCount } = this.state;
    const quiz = this.questions[currentQuestion];

    return (
      <Fragment>
        <ProgressText>
          {currentQuestion}/{this.totalQuestion}
        </ProgressText>
        <ResultModal
          modalVisible={this.modalVisible}
          onCloseModal={this.onHideModal}
          correctPercentage={`${correctCount / this.totalQuestion * 100}%`}
          correctCount={correctCount}
        />
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
