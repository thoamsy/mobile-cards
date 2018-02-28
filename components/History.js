import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyRemainderValue } from '../utils/helper';
import { fetchCalendarResults } from '../utils/api';
import Calendar from 'udacifitness-calendar';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo';

class History extends Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        const key = timeToString();
        if (!entries[key]) {
          dispatch(
            addEntry({
              [key]: getDailyRemainderValue(),
            })
          );
        }
      })
      .then(() => {
        this.setState({
          ready: true,
        });
      });
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <View>
          <DateHeader date={formattedDate} />
          <Text style={styles.noDateText}>{today}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => console.log('Yeah!')}>
          <MetricCard metrics={metrics} date={formattedDate} />
        </TouchableOpacity>
      )}
    </View>
  );
  renderEmptyDate = formattedDate => (
    <View>
      <DateHeader date={formattedDate} />
      <Text style={styles.noDateText}>
        You didn't log any data on this day.
      </Text>
    </View>
  );
  render() {
    const { entries } = this.props;
    if (!this.state.ready) {
      return <AppLoading />;
    }
    return (
      <Calendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

function mapStateToProps(state) {
  return { entries: state };
}
export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDateText: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
  },
});
