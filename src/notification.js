import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
const NOTIFICATION_KEY = '__mobile-cards__';

export const clearNotification = () => {
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

export const isNotifictionGranted = () =>
  Permissions.getAsync(Permissions.NOTIFICATIONS).then(
    ({ status }) => status === 'granted'
  );

const localNotification = {
  title: 'Hey, I am here.',
  body: 'You forgot to open me today',
  ios: {
    sound: true,
  },
};

let notificationId;
export const setLocalNotification = async () => {
  const data = await AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse);
  if (data === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();

      notificationId &&
        Notifications.cancelScheduledNotificationAsync(notificationId);
      const reminder = new Date();
      reminder.setDate(reminder.getDate() + 1);
      reminder.setHours(21);
      reminder.setMinutes(0);
      reminder.setSeconds(0);

      notificationId = Notifications.scheduleLocalNotificationAsync(
        localNotification,
        {
          time: reminder,
          repeat: 'day',
        }
      );
      AsyncStorage.setItem(NOTIFICATION_KEY, 'true');
    } else {
      alert('Oh no, You would not remember me anymore!');
    }
  }
};
