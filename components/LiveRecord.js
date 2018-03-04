import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';

import { CenterView, Button, ButtonText } from './Genernal';

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
`;
const DirectionContainer = Container.extend`
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 35px;
  text-align: center;
`;
const SubTitle = Title.extend`
  font-size: 25px;
  margin-top: 5px;
`;
const Direction = Title.extend`
  font-size: 120px;
  color: purple;
`;
const MetricContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: purple;
`;
const MetricItem = styled.View`
  flex: 1;
  padding: 15px 0;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 20px 10px;
`;
const MetricTitle = Title.extend`
  color: white;
`;
const MetricSubTitle = SubTitle.extend`
  color: white;
`;

export default class Live extends Component {
  state = {
    coords: null,
    status: 'wow',
    direction: '',
  };

  render() {
    const { status, coords, direction } = this.state;
    switch (status) {
      case null:
        return <ActivityIndicator />;
      case 'denied':
        return (
          <CenterView>
            <Foundation size={50} name="alert" />
            <Text>
              You denied your location. You can fix this by vising your settings
              and enabling location services for this app.
            </Text>
          </CenterView>
        );
      case 'undetermined':
        return (
          <CenterView>
            <Foundation name="alert" size={50} />
            <Text>You need to enable location services for this app.</Text>
            <Button onPress={() => {}}>
              <ButtonText>Enable</ButtonText>
            </Button>
          </CenterView>
        );
      default:
        return (
          <Container>
            <DirectionContainer>
              <Title>You're Heading</Title>
              <Direction>West</Direction>
            </DirectionContainer>
            <MetricContainer>
              <MetricItem>
                <MetricTitle>Altitude</MetricTitle>
                <MetricSubTitle>200 feets</MetricSubTitle>
              </MetricItem>
              <MetricItem>
                <MetricTitle>Speed</MetricTitle>
                <MetricSubTitle>100M/s</MetricSubTitle>
              </MetricItem>
            </MetricContainer>
          </Container>
        );
    }
  }
}
