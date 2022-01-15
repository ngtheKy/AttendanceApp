import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Navigation from './Navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';

import {View} from 'react-native';
import Login from './screens/login/Login';
import SplashScreen from './Assets/splash/SplashScreen';

navigator.geolocation = require('@react-native-community/geolocation');
import store from './redux/store/store';
// import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

// export const Context = React.createContext();

const App = () => {
  return (
    // <Context.Provider value={11001}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Context.Provider>
    // <SplashScreen />
    // <Login />
  );
};

export default App;
