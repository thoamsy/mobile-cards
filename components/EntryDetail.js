import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyRemainderValue } from '../utils/helper';

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 15px;
`;
class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`,
    };
  };

  reset = () => {
    const { remove, goBack, entryId } = this.props;
    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { metrics } = this.props;
    return (
      <Container>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          {/* <Text> Detail - {entryId}</Text> */}
          Reset
        </TextButton>
      </Container>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    metrics: state[entryId],
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params;
  return {
    remove() {
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyRemainderValue() : null,
        })
      );
    },
    goBack() {
      navigation.goBack();
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
