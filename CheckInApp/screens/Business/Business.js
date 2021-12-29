import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import BusinessHome from '../../Components/Business/BusinessHome'
import TimeSheet from '../../Components/Business/TimeSheet'
import LeaveManagement from '../../Components/Business/LeaveManagement'
import IrregularCheckin from '../../Components/Business/IrregularCheckIn'
import OTRequest from '../../Components/Business/OTRequest'
import ArriveLate from '../../Components/Business/ArriveLate'
import TimeAttendanceDevice from '../../Components/Business/TimeAttendanceDevice'

const Stack = createStackNavigator()

const Business = () => {
    return (
        <Stack.Navigator
            initialRouteName='Quản lý'
            headerMode="screen"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#0796dc', height: 70 },
            }}
        >
            <Stack.Screen name='Quản lý' component={BusinessHome} />
            <Stack.Screen name='Bảng công' component={TimeSheet} />
            <Stack.Screen name='Quản lý đơn xin nghỉ phép' component={LeaveManagement} />
            <Stack.Screen name='Check-in không hợp lệ' component={IrregularCheckin} />
            <Stack.Screen name='Quản lý đơn xin tăng ca' component={OTRequest} />
            <Stack.Screen name='Đi muộn, về sớm' component={ArriveLate} />
            <Stack.Screen name='Quản lý thiết bị chấm công' component={TimeAttendanceDevice} />
        </Stack.Navigator>
    )
}

export default Business