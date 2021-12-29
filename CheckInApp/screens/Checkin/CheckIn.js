import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import CheckinHome from '../../Components/Checkin/CheckinHome'




const Stack = createStackNavigator()


const CheckIn = () => {

    return (
        <Stack.Navigator
            initialRouteName='Chấm công'
            headerMode="screen"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#0796dc', height: 70 },

            }}
        >
            <Stack.Screen name='Chấm công' component={CheckinHome} />

        </Stack.Navigator>
    )
}

export default CheckIn

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#0796dc',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        // backgroundColor: 'gray',

    },
})