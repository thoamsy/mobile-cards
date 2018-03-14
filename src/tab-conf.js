import AddCardDecks from './components/AddCardDecks';
import Decks from './components/Decks';

const routeOptions = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  AddCardDecks: {
    screen: AddCardDecks,
    navigationOptions: {
      tabBarLabel: 'Add',
    },
  },
};
export const navigatorOptions = {
  swipeEnable: true,
  animatedEnable: true,
};

// const Tabs = TabNavigator(
//   {
//     History: {
//       screen: History,
//       navigationOptions: {
//         tabBarLabel: 'History',
//         tabBarIcon: ({ tintColor }) => (
//           <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
//         ),
//       },
//     },
//     AddEntry: {
//       screen: AddEntry,
//       navigationOptions: {
//         tabBarLabel: 'Add Entry',
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="plus-square" size={30} color={tintColor} />
//         ),
//       },
//     },
//     LiveRecord: {
//       screen: LiveRecord,
//       navigationOptions: {
//         tabBarLabel: 'Live',
//         tabBarIcon: ({ tintColor }) => (
//           <Ionicons name="ios-speedometer" size={30} color={tintColor} />
//         ),
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: Platform.OS === 'ios' ? purple : white,
//       style: {
//         height: 56,
//         backgroundColor: Platform.OS === 'ios' ? white : purple,
//         shadowColor: `rgba(0,0,0,.24)`,
//         shadowOffset: {
//           width: 3,
//           height: 0,
//         },
//         shadowRadius: 6,
//         shadowOpacity: 1,
//       },
//     },
//     navigationOptions: {
//       header: null,
//     },
//   }
// );

export default routeOptions;
