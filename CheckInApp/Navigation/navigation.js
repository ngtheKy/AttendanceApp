import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Policy from '../screens/Policy/Policy';
import Members from '../screens/Members/Members';
import CheckIn from '../screens/Checkin/CheckIn';
import Request from '../screens/Request/Request';
import Business from '../screens/Business/Business';

import {createStackNavigator} from 'react-navigation-stack';

const Tab = createMaterialBottomTabNavigator();

const Navigation = ({route}) => {
  const data = route.params;
  // console.log(data);
  return (
    <Tab.Navigator
      initialRouteName="Chấm công"
      barStyle={{
        backgroundColor: 'white',
        // display: 'flex', //display,
      }}>
      <Tab.Screen
        name="Chính sách"
        component={Policy}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="file-document-edit"
              color={color}
              size={26}
            />
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Nhân viên"
        component={Members}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chấm công"
        component={CheckIn}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-clock"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Yêu cầu"
        component={Request}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="airplane" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Quản lý"
        component={Business}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="office-building"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>

    // <Login />
  );
};

export default Navigation;
