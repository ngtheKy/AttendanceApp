import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { Input } from 'react-native-elements';
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Buffer } from "buffer"


const updateInfoMember = ({route}) => {
    const [text, setText] = useState()
    const [item, setItem] = useState([])
    const [imgData, setImgData] = useState()
    const [input, setInput] = useState([{TenNV: '',Email: '', Password: '', MaNV: '', TenPhongban: '', Ngaysinh: '', Gioitinh: '', CCCD: '', Quequan: '', Sdt: '', idDevice: '', id: '', Diachi: '' }])
    const data  = route.params;
    // console.log(data)

    useEffect(() => {
        axios.get(`http://192.168.1.14:3000/nhanvien/${data.id}`)
        .then(res => {
            const member = res.data.nhanvien;
            setItem( member );
            const b64 = new Buffer(member.Hinhanh.data).toString('base64')
            // console.log(b64)
            setImgData(b64)
        })
        .catch(error => console.log(error));
            }, [])
    
    const update = () =>{
        useEffect(() => {
            axios.put(`http://192.168.1.14:3000/nhanvien/${data.id}`, {input})
            .then(res => {
                
            })
            .catch(error => console.log(error));
                }, [])
    }
    

    return (
        <ScrollView style={styles.container}>
            <View className='form-input' style={styles.input}>

                <Text style={styles.formHeader}>Thông tin tài khoản</Text>
                <View className='Account-login' style={styles.form}>

                    <Input
                        onChangeText={(value) => setInput([...input, {TenNV: value}])}
                        value={input}
                        label={'Họ và tên'}
                        placeholder={item.HoNV,item.TenNV}
                        keyboardType='default'
                        // disabled='true'
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {Email: value}])}
                        value={input}
                        label={'Email'}
                        placeholder={item.Email}
                        keyboardType='email-address'
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {Password: value}])}
                        value={input}
                        label={'Mật khẩu'}
                        placeholder={item.Password}
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View>
                <Text style={styles.formHeader}>Hồ sơ nhân viên</Text>
                <View className='Mem-profile' style={styles.form}>

                    <Input
                        onChangeText={(value) => setInput([...input, {id: value}])}
                        value={input}
                        label={'Mã Nhân viên'}
                        placeholder={item.id}
                        keyboardType='default'
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {TenPhongban: value}])}
                        value={input}
                        label={'Phòng ban, Bộ phận'}
                        placeholder={item.TenPhongban}
                        keyboardType='email-address'
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {Ngaysinh: value}])}
                        value={input}
                        label={'Ngày sinh'}
                        placeholder={item.Ngaysinh}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {Gioitinh: value}])}
                        value={text}
                        label={'Giới tính'}
                        placeholder={`${item.Gioitinh}` == 1 ? 'Nam' : 'Nữ'}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {CCCD: value}])}
                        value={input}
                        label={'Căn cước công dân'}
                        placeholder={item.CCCD}
                        keyboardType='default'
                    // secureTextEntry={true}
                    />
                    
                    <Input
                        onChangeText={(value) => setInput([...input, {Quequan: value}])}
                        value={input}
                        label={'Quê quán'}
                        keyboardType='default'
                        placeholder={item.Quequan}
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {Diachi: value}])}
                        value={input}
                        label={'Địa chỉ hiện tại'}
                        keyboardType='default'
                        placeholder={item.Diachi}
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {Sdt: value}])}
                        value={input}
                        label={'Số điện thoại'}
                        keyboardType='default'
                        placeholder={item.Sdt}
                    // secureTextEntry={true}
                    />
                    <Input
                        onChangeText={(value) => setInput([...input, {idDevice: value}])}
                        
                        value={input}
                        label={'Thiết bị đăng ký chấm công'}
                        placeholder={item.idDevice}
                        keyboardType='default'
                    />
                    
                </View>


            </View>
            <TouchableOpacity
                onPress={() => console.log(input)}
                style={styles.button}
            >
                <MaterialCommunityIcons name='content-save' size={20} color='white' style={styles.buttonTxt}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
                </MaterialCommunityIcons>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default updateInfoMember;

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
    },
    buttonTxt: {
        backgroundColor: '#0796dc',
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    },
});