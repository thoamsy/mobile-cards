import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helper';
import Slider from './Slider';
import Stepper from './Stepper';
import DateHaeder from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { getDailyRemainderValue } from '../utils/helper';
import { white, purple } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  iosSubmitButton: {
    backgroundColor: purple,
    borderRadius: 8,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    padding: 8,
  },
  androidSubmitButton: {
    backgroundColor: purple,
    borderRadius: 2,
    height: 45,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});
const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={
      Platform.OS === 'ios'
        ? styles.iosSubmitButton
        : styles.androidSubmitButton
    }
  >
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
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
    submitEntry({ key, entry });
  };

  render() {
    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.onReset}> Reset </TextButton>
        </View>
      );
    }
    const metaInfo = getMetricMetaInfo();

    return (
      <View style={styles.container}>
        <DateHaeder date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { icon: Icon, type, ...rest } = metaInfo[key];
          const value = this.state[key];
          return (
            <View key={key} style={styles.row}>
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
            </View>
          );
        })}
        <SubmitBtn onPress={this.onSubmit} />
      </View>
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
