import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helper';
import Slider from './Slider';
import Stepper from './Stepper';
import DateHaeder from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'red' }}>
    <Text>Submit</Text>
  </TouchableOpacity>
);

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => ({
      [metric]: Math.min(max, state.metric + step),
    }));
  };
  decrement = metric => {
    const { step } = getMetricMetaInfo(metric);
    this.setState(state => ({
      [metric]: Math.max(0, state.metric - step),
    }));
  };
  slide = (metric, value) => {
    this.setState({
      [metric]: value,
    });
  };

  onReset = () => {
    const key = timeToString();
    removeEntry(key);
  };

  onSubmit = () => {
    const key = timeToString();
    const entry = this.state;
    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });
    submitEntry({ key, entry });
  };

  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy-outline" size={100} />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.onReset}> Reset </TextButton>
        </View>
      );
    }
    return (
      <View>
        <DateHaeder date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { icon, type, ...rest } = metaInfo[key];
          const value = this.state[key];
          return (
            <View key={key}>
              {icon}
              {type === 'slider' ? (
                <Slider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Stepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.onSubmit} />
      </View>
    );
  }
}
