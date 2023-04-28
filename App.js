import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './router/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}