import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import StartQuest from '../screens/startQuest';
import NewQuest from '../screens/newQuest';
import Quest from '../screens/quest';

const screens = {
  // Home: {
  //   screen: Home
  // },
  StartQuest: {
    screen: StartQuest,
    // navigationOptions: {
    //   title: 'TasQuest',
    //   headerStyle: {
    //     backgroundColor: '#eee'
    //   }
    // }
  },
  NewQuest: {
    screen: NewQuest,
  },
  Quest: {
    screen: Quest
  }
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    title: 'TasQuest',
      headerStyle: {
        backgroundColor: '#eee',
      }
  }
});

export default createAppContainer(HomeStack);