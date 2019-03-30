import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoadingScreen from './includes/loading.js';
import HomeScreen from './includes/home.js';
import SettingsScreen from './includes/settings.js';






const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
});

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'steelblue',
      inactiveTintColor: 'gray',
    },
  }
);