import React from 'react';
import { createStackNavigator} from 'react-navigation';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import LoadingScreen from './includes/loading.js';
import HomeScreen from './includes/home.js';
import SettingsScreen from './includes/settings.js';
import ReaderScreen from './includes/reader.js';





const RootStack = createStackNavigator(
  {
    Loading: LoadingScreen,
    Home: HomeScreen,
    Display: SettingsScreen,
    Reader: ReaderScreen,
  },
  {
    initialRouteName: 'Loading',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        height: 20,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}