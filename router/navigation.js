import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Views/Authentication/Login'
import Profile from '../Views/profile';
import Register from '../Views/Authentication/register';
import Activate from '../Views/Authentication/activate'
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Activate" component={Activate} />
    </Stack.Navigator>
  );
}
