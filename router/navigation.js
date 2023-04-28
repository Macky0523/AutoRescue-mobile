import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Authentication/Login'
import Profile from '../Views/profile';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
