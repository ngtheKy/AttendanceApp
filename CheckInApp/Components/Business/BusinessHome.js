import React from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, StatusBar, View, Image, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
    { title: 'Bảng công', id: '01', iconname: 'clipboard-list' },
    { title: 'Quản lý đơn xin nghỉ phép', id: '02', iconname: 'email-newsletter' },
    { title: 'Check-in không hợp lệ', id: '03', iconname: 'calendar-clock' },
    { title: 'Quản lý đơn xin tăng ca', id: '04', iconname: 'briefcase-clock' },
    { title: 'Đi muộn, về sớm', id: '05', iconname: 'briefcase-account' },
    { title: 'Quản lý thiết bị chấm công', id: '06', iconname: 'devices' },
]


export default function BusinessHome({ navigation }) {
    const BusinessMenu = ({ item, onPress }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(item.title)}
                style={styles.container}
            >
                <MaterialCommunityIcons style={styles.item} name={item.iconname} color={item.color} size={26}>
                    <View style={{textAlignVertical: 'center'}}>
                        <Text style={{ fontSize: 17, marginLeft: 12}}>{item.title}</Text>
                    </View>
                </MaterialCommunityIcons>

            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>


            <FlatList
                style={styles.list}
                data={DATA}
                renderItem={({ item }) => (
                    <BusinessMenu item={item} />
                )}
                keyExtractor={(item) => item.id}

            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    list: {
        marginTop: 5,
        marginHorizontal: 10,
        // backgroundColor: 'white'
    },
    item: {
        backgroundColor: 'white',
        paddingLeft: 30,
        // borderBottomWidth: 1,
        // borderBottomColor: '#c2c2c2',
        height: 65,
        textAlignVertical: 'center',
        marginTop: 2,
        borderRadius: 5


    },
    icon: {
        paddingRight: 10
    },
    company: {
        height: 65,
        width: windowWidth,
        backgroundColor: 'white',
        marginTop: 10,
        // marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'space-between'

    },
    img: {
        width: 35,
        height: 35,
        margin: 9
    }
})