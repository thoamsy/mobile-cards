import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Picker,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AddEntry from './components/AddEntry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#e53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  },
});

export default class App extends React.Component {
  state = {
    value: 'let us say something',
    show: false,
  };
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}
