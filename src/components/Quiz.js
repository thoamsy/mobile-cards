import React, { Component, Fragment } from 'react';
import { Button, View, Animated, Alert } from 'react-native';
import { update, add, shuffle } from 'lodash/fp';

import ResultModal from './ResultModal';
import { CenterView, SubmitButton, SubmitText } from './general';
import { isNotifictionGranted, setLocalNotification } from '../notification';

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
    flip: new Animated.Value(0),
  };

  frontInterpolate = {
    margin: 10,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    transform: [
      {
        rotateY: this.state.flip.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  backInterpolate = {
    margin: 10,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    transform: [
      {
        rotateY: this.state.flip.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };
  componentDidMount = () => {
    this.animatedValue = 0;
    // 用来跟踪当前动画的 value, 因为 Animated.Value 是对象
    this.state.flip.addListener(({ value }) => (this.animatedValue = value));
  };
  componentWillUnmount() {
    this.state.flip.removeAllListeners();
  }

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

  setNotification = async () => {
    const isGranted = await isNotifictionGranted();
    if (!isGranted) {
      Alert.alert('每日提醒', '是否允许明天 21:00 提醒你记得测试呢🤓?', [
        { text: 'Of Course', onPress: setLocalNotification },
        { text: '不用了, 我很自觉', style: 'cancel' },
      ]);
    } else {
      setLocalNotification();
    }
  };
  onHideModal = () => {
    this.modalVisible = false;
    this.props.navigation.goBack();
    this.setNotification();
  };
  finishQuiz = () => {
    this.modalVisible = true;
  };

  onNextQuestion = isCorrect => () => {
    this.setState(update('currentQuestion', addOne));
    isCorrect && this.setState(update('correctCount', addOne));
    // 重置翻转
    this.state.flip.setValue(0);
    if (this.state.currentQuestion === this.totalQuestion - 1) {
      this.finishQuiz();
    }
  };

  toggleFlip = () => {
    if (this.animatedValue >= 90) {
      Animated.spring(this.state.flip, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.state.flip, {
        toValue: 180,
        friction: 8,
        tension: 8,
      }).start();
    }
  };

  render() {
    const { currentQuestion, correctCount } = this.state;
    const quiz = this.questions[currentQuestion] || {};

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
        <CenterView
          style={{ justifyContent: 'space-around', marginBottom: 100 }}
        >
          <CenterView>
            <Animated.View style={this.backInterpolate}>
              <TitleText>{quiz.answer}</TitleText>
              <Button
                title="Question"
                color="#c4392a"
                onPress={this.toggleFlip}
              />
            </Animated.View>
            <Animated.View style={this.frontInterpolate}>
              <TitleText>{quiz.question}</TitleText>
              <Button
                title="Answer"
                color="#c4392a"
                onPress={this.toggleFlip}
              />
            </Animated.View>
          </CenterView>
          <View style={{ justifyContent: 'center' }}>
            <SubmitButton
              backgroundColor="#377d22"
              onPress={this.onNextQuestion(true)}
            >
              <SubmitText>Correct</SubmitText>
            </SubmitButton>
            <SubmitButton
              backgroundColor="#c4392a"
              onPress={this.onNextQuestion()}
            >
              <SubmitText>Incorrect</SubmitText>
            </SubmitButton>
          </View>
        </CenterView>
      </Fragment>
    );
  }
}

export default Quiz;
