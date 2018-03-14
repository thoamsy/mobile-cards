import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import routeOptions from './src/tab-conf';
import { CenterView } from './src/components/general';

const Tabs = TabNavigator(routeOptions);

const Main = StackNavigator({
  Home: {
    screen: Tabs,
    path: 'home/',
  },
});
const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar networkActivityIndicatorVisible translucent />
    <Main />
  </View>
);

export default App;
