// @ts-nocheck
import React, { Component } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyRemainderValue } from '../utils/helper';
import { fetchCalendarResults } from '../utils/api';
import Calendar from 'udacifitness-calendar';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo';
import styled from 'styled-components/native';

const MetricCardView = styled.View`
  background-color: white;
  border-radius: ${Platform.OS === 'ios' ? 16 : 2};
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 17px;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
`;
const NoDateText = styled.Text`
  font-size: 20;
  padding-top: 20px;
  padding-left: 20px;
`;

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
    <MetricCardView>
      {today ? (
        <View>
          <DateHeader date={formattedDate} />
          <NoDateText>{today}</NoDateText>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('EntryDetail', {
              entryId: key,
            })
          }
        >
          <MetricCard metrics={metrics} date={formattedDate} />
        </TouchableOpacity>
      )}
    </MetricCardView>
  );
  renderEmptyDate = formattedDate => (
    <View>
      <DateHeader date={formattedDate} />
      <NoDateText>You didn't log any data on this day.</NoDateText>
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
