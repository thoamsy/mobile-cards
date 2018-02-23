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
      <KeyboardAvoidingView style={styles.container} behavior="position">
        {/* <AddEntry /> */}
        <Switch
          value={this.state.show}
          onChange={() => this.setState(state => ({ show: !state.show }))}
        />

        <TextInput
          value={this.state.value}
          onChangeText={value => this.setState({ value })}
          style={styles.input}
          placeholder="sorry"
        />

        <ScrollView
          maximumZoomScale={2}
          style={{ backgroundColor: '#24a48e' }}
          pagingEnabled
        >
          <Text style={{ fontSize: 50 }}>hello</Text>
        </ScrollView>
        <Picker>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>

        <TouchableHighlight onPress={() => {}}>
          <View style={{ backgroundColor: '#2196f3' }}>
            <Text>nihao</Text>
          </View>
        </TouchableHighlight>

        <TouchableOpacity onPress={() => {}}>
          <View style={{ backgroundColor: '#2196f3' }}>
            <Text>Shit</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
