/*
 * Garb
 * ====
 * Garb is an app that takes pictures of reciepts and analyzes them for the user to figure out
 * whether or not they are wasting food every week. Try it out!
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
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