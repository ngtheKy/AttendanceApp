// import React from 'react'
// import { View, Text } from 'react-native'
// import { NetworkInfo } from 'react-native-network-info';
// import NetInfo from "@react-native-community/netinfo";

// export default function MemberDetail() {
//     const onPress = () => {
//         NetInfo.fetch("wifi").then(state => {
//             console.log("Connection type", state.type);
//             console.log("Is connected?", state.isConnected);
//         });
//     }
//     return (
//         <View>
//             <Text
//                 onPress={onPress}
//             >MemberDetail</Text>
//         </View>
//     )
// }

import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Input } from 'react-native-elements';
import axios from "axios";




const MemberDetail = ({ route, navigation }) => {

    const [name, setName] = useState()
    const [item, setItem] = useState([])
    const data  = route.params;

    useEffect(() => {
        axios.get(`http://192.168.1.14:3000/nhanvien/${data.id}`)
        .then(res => {
            const member = res.data.nhanvien;
            setItem( member );
        })
        .catch(error => console.log(error));
            }, [])
    
    console.log(item)

    

    return (
        <ScrollView style={styles.container}>
            <View className='form-input' style={styles.input}>

                <Text style={styles.formHeader}>Thông tin tài khoản</Text>
                <View className='Account-login' style={styles.form}>

                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Họ và tên'}
                        placeholder={item.HoNV, item.TenNV}
                        keyboardType='default'
                        disabled='true'
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Email'}
                        placeholder={item.email}
                        keyboardType='email-address'
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Mật khẩu'}
                        placeholder={'****************'}
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View>
                <Text style={styles.formHeader}>Hồ sơ nhân viên</Text>
                <View className='Mem-profile' style={styles.form}>

                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Mã Nhân viên'}
                        placeholder={'178 131 0042'}
                        keyboardType='default'
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Phòng ban, Bộ phận'}
                        placeholder={'Ban Công nghệ'}
                        keyboardType='email-address'
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Ngày sinh'}
                        placeholder={'23/11/1999'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Giới tính'}
                        placeholder={'Nam'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Căn cước công dân'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Ngày cấp Căn cước công dân'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Nơi cấp'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Quê quán'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Địa chỉ hiện tại'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Số điện thoại'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />

                </View>
                <Text style={styles.formHeader}>Thông tin tài khoản</Text>
                <View className='Contract' style={styles.form}>

                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Họ và tên'}
                        keyboardType='default'
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Email'}
                        keyboardType='email-address'
                    />
                    <Input
                        onChangeText={() => { }}
                        value={name}
                        label={'Mật khẩu'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                </View>


            </View>
            <TouchableOpacity
                onPress={() => {}}
                style={styles.button}
            >
                <Text style={styles.buttonTxt}>
                    Save
                </Text>
            </TouchableOpacity>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Arial'
    },
    image: {
        height: 122,
        width: 122,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40
    },
    input: {
        marginHorizontal: 13,
        backgroundColor: 'white'
    },
    buttonTxt: {
        backgroundColor: '#0796dc',
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    formHeader: {
        fontSize: 20,
        marginTop: 10
    },
    form: {
        marginTop: 10
    }
});

export default MemberDetail;