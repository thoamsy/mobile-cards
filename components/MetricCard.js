// @ts-nocheck
import React from 'react';
import { Text, View } from 'react-native';
import DateHeader from './DateHeader';
import { gray } from '../utils/colors';
import { getMetricMetaInfo } from '../utils/helper';
import styled from 'styled-components/native';

const MetricItem = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

export default function MetricCard({ date, metrics }) {
  return (
    <View>
      {date && <DateHeader date={date} />}
      {Object.entries(metrics).map(([metric, value]) => {
        const { displayName, unit, icon: Icon } = getMetricMetaInfo(metric);
        return (
          <MetricItem key={metric}>
            <Icon />
            <View>
              <Text style={{ fontSize: 20 }}>{displayName}</Text>
              <Text style={{ color: gray, fontSize: 16 }}>
                {value} {unit}
              </Text>
            </View>
          </MetricItem>
        );
      })}
    </View>
  );
}
