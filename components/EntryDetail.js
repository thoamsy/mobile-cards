import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import MetricCard from './MetricCard';
import { connect } from 'react-redux';

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 15px;
`;
const EntryDetail = ({ entryId, metrics }) => (
  <Container>
    <MetricCard metrics={metrics} />
    <Text> Detail - {entryId}</Text>
  </Container>
);
EntryDetail.navigationOptions = ({ navigation }) => {
  const { entryId } = navigation.state.params;
  const year = entryId.slice(0, 4);
  const month = entryId.slice(5, 7);
  const day = entryId.slice(8);

  return {
    title: `${month}/${day}/${year}`,
  };
};

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    metrics: state[entryId],
  };
};
export default connect(mapStateToProps)(EntryDetail);
