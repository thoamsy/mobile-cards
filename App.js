// @ts-nocheck
import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import reducer from './reducers';
import { white, purple } from './utils/colors';
import History from './components/History';
import AddEntry from './components/AddEntry';
import EntryDetail from './components/EntryDetail';
import LiveRecord from './components/LiveRecord';
import { setNotification } from './utils/helper';

const Tabs = TabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
      },
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      },
    },
    LiveRecord: {
      screen: LiveRecord,
      navigationOptions: {
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-speedometer" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: `rgba(0,0,0,.24)`,
        shadowOffset: {
          width: 3,
          height: 0,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
    navigationOptions: {
      header: null,
    },
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});
export default class App extends React.Component {
  componentDidMount = () => {
    setNotification();
  };

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
