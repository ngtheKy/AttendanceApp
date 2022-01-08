import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import MemberDetail from '../../Components/Member/MemberDetail';
import MembersHome from '../../Components/Member/MembersHome';
import AddMember from '../../Components/Member/AddMember';
import updateInfoMember from '../../Components/Member/updateInfoMember';

const Stack = createStackNavigator();

export default function Members() {
  return (
    <Stack.Navigator
      initialRouteName="Nhân viên"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#0796dc', height: 70},
      }}>
      <Stack.Screen name="Nhân viên" component={MembersHome} />
      <Stack.Screen name="Thông tin nhân viên" component={MemberDetail} />
      <Stack.Screen name="Hồ sơ nhân viên" component={AddMember} />
      <Stack.Screen
        name="Thay đổi thông tin nhân viên"
        component={updateInfoMember}
      />
    </Stack.Navigator>
  );
}
