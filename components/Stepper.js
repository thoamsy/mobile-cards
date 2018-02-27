import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { white, purple, gray } from '../utils/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iosButton: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
export default function Stepper({ unit, value, onIncrement, onDecrement }) {
  return (
    <View style={styles.row}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={onDecrement}
          style={[
            styles.iosButton,
            {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
        >
          <FontAwesome name="minus" size={30} color={purple} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onIncrement}
          style={[
            styles.iosButton,
            {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          ]}
        >
          <FontAwesome name="plus" size={30} color={purple} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  );
}
