import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import BusinessInfo from '../../Components/Policy/BusinessInfo';
import CalculateAttendanceResults from '../../Components/Policy/CalculateAttendanceResult';
import DepartmentStructure from '../../Components/Policy/DepartmentStructure';
import Holidays from '../../Components/Policy/Holidays';
import LeavePolicy from '../../Components/Policy/LeavePolicy';
import LocationWifi from '../../Components/Policy/Location&Wifi'
import Support from '../../Components/Policy/Support'
import WorkingTime from '../../Components/Policy/WorkingTime'
import PolicyHome from '../../Components/Policy/PolicyHome';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const Stack = createStackNavigator();



const Policy = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const tabHiddenRoutes = ["Thông tin Công ty", "Cấu trúc phòng ban", 'Lịch làm việc', 'Thiết lập Wifi & vị trí chấm công',
            'Cài đặt chấm công', 'Chính sách nghỉ phép', 'Chính sách nghỉ lễ', 'Hỗ trợ'
        ];
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRouteName="Chính sách"
            headerMode="screen"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#0796dc', height: 70 },
            }}
        >
            <Stack.Screen name='Chính sách' component={PolicyHome} />
            <Stack.Screen name='Thông tin Công ty' component={BusinessInfo} />
            <Stack.Screen name='Cấu trúc phòng ban' component={DepartmentStructure} />
            <Stack.Screen name='Lịch làm việc' component={WorkingTime} />
            {/* <Stack.Screen name='Thiết lập Wifi & vị trí chấm công' component={LocationWifi} /> */}
            <Stack.Screen name='Cài đặt chấm công' component={LocationWifi} />
            <Stack.Screen name='Chính sách nghỉ phép' component={LeavePolicy} />
            <Stack.Screen name='Chính sách nghỉ lễ' component={Holidays} />
            <Stack.Screen name='Hỗ trợ' component={Support} />

        </Stack.Navigator>
    )
}

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const styles = StyleSheet.create({
    container: {

    }
})

export default Policy