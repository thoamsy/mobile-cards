import { AsyncStorage } from 'react-native';
const KEY = '@CARD_DECK_TITLE:key';

export async function saveDeckTitle(title) {
  const origin = JSON.parse(await AsyncStorage.getItem(KEY)) || {};
  origin[title] = {
    title,
    questions: [],
  };
  return AsyncStorage.setItem(KEY, JSON.stringify(origin));
}

export async function getDeck(id) {
  const origin = JSON.parse(await AsyncStorage.getItem(KEY));
  return origin[id];
}

export async function getDecks() {
  return JSON.parse(await AsyncStorage.getItem(KEY));
}
