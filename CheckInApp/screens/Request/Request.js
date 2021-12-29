import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import RequestHome from '../../Components/Request/RequestHome'
import RequestLeave from '../../Components/Request/RequestLeave'
import OTRequest from '../../Components/Request/OTRequest'
import ManualCheckin from '../../Components/Request/ManualCheckIn'

const Stack = createStackNavigator()

const Request = () => {
    return (
        <Stack.Navigator
            initialRouteName='Yêu cầu'
            headerMode="screen"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#0796dc', height: 70 },
            }}

        >
            <Stack.Screen name='Yêu cầu' component={RequestHome} />
            <Stack.Screen name='Chấm công bằng tay' component={ManualCheckin} />
            <Stack.Screen name='Đơn xin nghỉ phép' component={RequestLeave} />
            <Stack.Screen name='Đơn xin tăng ca' component={OTRequest} />
        </Stack.Navigator>
    )
}

export default Request