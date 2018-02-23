import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY } from './_calendar';

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, {
    [key]: JSON.stringify(entry),
  });
}

export function removeEntry(key) {
  AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      return Object.keys(data).reduce(
        (res, ownKey) => (ownKey !== key ? { ...res, [key]: data[key] } : res),
        {}
      );
    })
    .then(data => {
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, data);
    });
}
