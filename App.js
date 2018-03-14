import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import routeOptions, { navigatorOptions } from './src/tab-conf';

const Tabs = TabNavigator(routeOptions, navigatorOptions);

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
