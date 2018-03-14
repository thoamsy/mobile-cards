import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator } from 'react-navigation';
import tabOptions from './src/tab-conf';
import { CenterView } from './src/components/general';

const Tab = TabNavigator(tabOptions);
const App = () => (
  <CenterView>
    <StatusBar networkActivityIndicatorVisible translucent />
    <Tab />
  </CenterView>
);

export default App;
