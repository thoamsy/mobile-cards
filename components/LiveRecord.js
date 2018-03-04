import React, { Component } from 'react';
import { Text, ActivityIndicator, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';
import { Location, Permissions } from 'expo';

import { calculateDirection } from '../utils/helper';
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
const Direction = Animated.createAnimatedComponent(Title.extend`
  font-size: 60px;
  color: purple;
`);

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
    status: null,
    direction: '',
    bounceValue: new Animated.Value(1),
  };

  componentDidMount() {
    this.getPermission();
  }

  permissionWithLocation = way => () => {
    Permissions[way](Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.setLocation();
        }
        this.setState({ status });
      })
      .catch(error => {
        console.warn('Error getting location permission', error);
        this.setState({
          status: 'undetermined',
        });
      });
  };

  askPermission = this.permissionWithLocation('askAsync');
  getPermission = this.permissionWithLocation('getAsync');
  setLocation = () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 2,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const newDirection = calculateDirection(coords.heading);
        this.setState(({ direction, bounceValue }) => {
          if (direction !== newDirection) {
            Animated.sequence([
              Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
              Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
            ]).start();
          }
          return {
            coords,
            direction: newDirection,
            status: 'granted',
          };
        });
      }
    );
  };
  render() {
    const { status, coords, direction, bounceValue } = this.state;
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
            <Button onPress={this.askPermission}>
              <ButtonText>Enable</ButtonText>
            </Button>
          </CenterView>
        );
      default:
        return (
          <Container>
            <DirectionContainer>
              <Title>You're Heading</Title>
              <Direction style={[{ transform: [{ scale: bounceValue }] }]}>
                {direction}
              </Direction>
            </DirectionContainer>
            <MetricContainer>
              <MetricItem>
                <MetricTitle>Altitude</MetricTitle>
                <MetricSubTitle>
                  {Math.round(coords.altitude * 3.2808)} Feet
                </MetricSubTitle>
              </MetricItem>
              <MetricItem>
                <MetricTitle>Speed</MetricTitle>
                <MetricSubTitle>
                  {(coords.speed * 2.2369).toFixed(1)} MPH
                </MetricSubTitle>
              </MetricItem>
            </MetricContainer>
          </Container>
        );
    }
  }
}
