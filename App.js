import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import AddCardDecks from './src/components/AddCardDecks';
import { CenterView } from './src/components/general';

const App = () => (
  <CenterView>
    <StatusBar networkActivityIndicatorVisible translucent />
    <AddCardDecks />
  </CenterView>
);

export default App;
