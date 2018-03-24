import { AsyncStorage } from 'react-native';
const KEY = '@CARD_DECK_TITLE:key';

export async function saveDeckTitle(title) {
  const origin = JSON.parse(await AsyncStorage.getItem(KEY)) || {};
  origin[title] = {
    title,
    questions: [],
    createdTime: Date.now(),
  };
  return AsyncStorage.setItem(KEY, JSON.stringify(origin)).then(() => ({
    ...origin[title],
  }));
}

export async function getDecks() {
  return JSON.parse(await AsyncStorage.getItem(KEY));
}

export function removeDecks() {
  AsyncStorage.removeItem(KEY);
}

export async function addQuestions(deckTitle, card) {
  const decks = await getDecks();
  decks[deckTitle].questions.push(card);
  return AsyncStorage.setItem(KEY, JSON.stringify(decks));
}
