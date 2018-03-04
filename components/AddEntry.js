import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Slider from './Slider';
import Stepper from './Stepper';
import DateHaeder from './DateHeader';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { getMetricMetaInfo, timeToString } from '../utils/helper';
import { addEntry } from '../actions';
import { getDailyRemainderValue } from '../utils/helper';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;
const SubmitButton = styled.TouchableOpacity`
  background-color: purple;
  border-radius: ${({ ios }) => (ios ? '8px' : '2px')};
  height: 45px;
  padding: 10px;
  margin: ${({ ios }) => (ios ? '0 40px' : '0')};
`;
const SubmitText = styled.Text`
  color: white;
  font-size: 22;
  text-align: center;
`;

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
`;
const EntryView = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const SubmitBtn = ({ onPress }) => (
  <SubmitButton onPress={onPress} ios={Platform.OS === 'ios'}>
    <SubmitText>Submit</SubmitText>
  </SubmitButton>
);

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = metric => () => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => ({
      [metric]: Math.min(max, state[metric] + step),
    }));
  };
  decrement = metric => () => {
    const { step } = getMetricMetaInfo(metric);
    this.setState(state => ({
      [metric]: Math.max(0, state[metric] - step),
    }));
  };
  slide = (metric, value) => {
    this.setState({
      [metric]: value,
    });
  };

  onReset = () => {
    const key = timeToString();
    this.props.dispatch(
      addEntry({
        [key]: getDailyRemainderValue(),
      })
    );
    this.toHome();
    removeEntry(key);
  };

  onSubmit = () => {
    const key = timeToString();
    const entry = this.state;
    this.props.dispatch(
      addEntry({
        [key]: entry,
      })
    );
    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });
    this.toHome();
    submitEntry({ key, entry });
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'AddEntry',
      })
    );
  };

  render() {
    if (this.props.alreadyLogged) {
      return (
        <CenterView>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.onReset}> Reset </TextButton>
        </CenterView>
      );
    }
    const metaInfo = getMetricMetaInfo();

    return (
      <Container>
        <DateHaeder date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { icon: Icon, type, ...rest } = metaInfo[key];
          const value = this.state[key];
          return (
            <EntryView key={key}>
              <Icon />
              {type === 'slider' ? (
                <Slider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Stepper
                  value={value}
                  onIncrement={this.increment(key)}
                  onDecrement={this.decrement(key)}
                  {...rest}
                />
              )}
            </EntryView>
          );
        })}
        <SubmitBtn onPress={this.onSubmit} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && state[key].today === undefined,
  };
};
export default connect(mapStateToProps)(AddEntry);
