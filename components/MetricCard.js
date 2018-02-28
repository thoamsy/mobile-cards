// @ts-nocheck
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DateHeader from './DateHeader';
import { gray } from '../utils/colors';
import { getMetricMetaInfo } from '../utils/helper';

export default function MetricCard({ date, metrics }) {
  return (
    <View>
      {date && <DateHeader date={date} />}
      {Object.entries(metrics).map(([metric, value]) => {
        const {
          displayName,
          unit,
          icon: Icon,
          backgroundColor,
        } = getMetricMetaInfo(metric);
        return (
          <View style={styles.metric} key={metric}>
            <Icon />
            <View>
              <Text style={{ fontSize: 20 }}>{displayName}</Text>
              <Text style={{ color: gray, fontSize: 16 }}>
                {value} {unit}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12,
  },
});
