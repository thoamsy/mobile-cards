import React from 'react';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components';
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { white, red, orange, blue, pink, purple } from './colors';
import { Notifications, Permissions } from 'expo';

const IconView = styled.View`
  padding: 5px;
  border-radius: 8px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true;
  }
  return false;
}

export function calculateDirection(heading) {
  let direction = '';

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North ⬆️';
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East ↗️';
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East ➡️';
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East ↘️';
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South ⬇️';
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West ↙️';
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West ⬅️';
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West ↖️';
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North ⬆️';
  } else {
    direction = 'Calculating';
  }

  return direction;
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

export function getMetricMetaInfo(metric) {
  const info = {
    run: {
      displayName: 'Run',
      max: 50,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      icon() {
        return (
          <IconView backgroundColor={red}>
            <MaterialIcons name="directions-run" color={white} size={35} />
          </IconView>
        );
      },
    },
    bike: {
      displayName: 'Bike',
      max: 100,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      icon() {
        return (
          <IconView backgroundColor={orange}>
            <MaterialCommunityIcons name="bike" color={white} size={35} />
          </IconView>
        );
      },
    },
    swim: {
      displayName: 'Swim',
      max: 9999,
      unit: 'meter',
      step: 10,
      type: 'steppers',
      icon() {
        return (
          <IconView backgroundColor={blue}>
            <MaterialCommunityIcons name="swim" color={white} size={35} />
          </IconView>
        );
      },
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'hour',
      step: 1,
      type: 'slider',
      icon() {
        return (
          <IconView backgroundColor={purple}>
            <FontAwesome name="bed" color={white} size={35} />
          </IconView>
        );
      },
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      step: 1,
      type: 'slider',
      icon() {
        return (
          <IconView backgroundColor={pink}>
            <MaterialCommunityIcons name="food" color={white} size={35} />
          </IconView>
        );
      },
    },
  };
  return typeof metric === 'undefined' ? info : info[metric];
}

export const getDailyRemainderValue = () => ({
  today: `👋🏻 Don't forget to log your data today!`,
});

const NOTIFICATION_KEY = 'NOTIFICATION_KEY';
export const clearNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};
const createNotification = {
  title: 'Log your stats!',
  body: `👋🏻 Don't forget to log your stats for today!`,
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
};
export const setNotification = async () => {
  const item = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY));
  if (item !== null) return;

  const status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status === 'granted') {
    Notifications.cancelAllScheduledNotificationsAsync();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow + 1);
    tomorrow.setHours(13);
    tomorrow.setMinutes(32);

    Notifications.scheduleLocalNotificationAsync(createNotification, {
      time: tomorrow,
      repeat: 'day',
    });
    AsyncStorage.setItem(NOTIFICATION_KEY, 'true');
  }
};
