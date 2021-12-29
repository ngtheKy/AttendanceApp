import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Navigation from './Navigation/navigation';
import { NavigationContainer } from '@react-navigation/native'

import { View } from 'react-native';


navigator.geolocation = require('@react-native-community/geolocation');

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}

export default App;