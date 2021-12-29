import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, FlatList, Alert } from 'react-native'
import { Header, Input, Switch, Button } from 'react-native-elements';


const Departments=[
    {tenpb: 'Phòng Công nghệ', mapb:'CN', pbcon: ''}
]

const DepartmentStructure = () => {

    const [data, setData] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [bgColor, setBgColor] = useState('white')
    const [name, setName] = useState()
    const [value, setValue] = useState(true)


    function onPressModal() {
        setModalVisible(true)
        setBgColor('gray')
    }

    function onPressCancel() {
        setModalVisible(!modalVisible)
        setBgColor('white')
    }

    const NoDepartment = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://image.flaticon.com/icons/png/128/162/162705.png' }}
                    style={styles.img}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                    Hiện tại chưa có phòng ban nào
                </Text>
                <Text style={styles.text}>
                    Phân chia và quản lý nhân viên theo phòng ban. Có thể tạo ca làm và lịch làm việc riêng cho từng phòng ban.
                </Text>
                <TouchableOpacity style={styles.button}
                    onPress={() => onPressModal()}
                >
                    <Text style={{ fontSize: 17, fontWeight: '700', color: 'white' }}>
                        Tạo phòng ban
                    </Text>
                </TouchableOpacity>
                <View>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{ color: '#4d91ff', fontSize: 18, fontWeight: 'bold' }}>Thêm phòng ban</Text>
                                <Input
                                    onChangeText={() => { }}
                                    value={name}
                                    label={'Tên phòng ban'}
                                    keyboardType='default'
                                    inputContainerStyle={{ marginHorizontal: 10, height: 30, }}
                                    containerStyle={{ marginTop: 20 }}
                                // placeholder={'Tên phòng ban'}
                                />
                                <Input
                                    onChangeText={() => { }}
                                    value={name}
                                    label={'Mã phòng ban'}
                                    // placeholder={'Mã phòng ban'}
                                    keyboardType='default'
                                    inputContainerStyle={{ marginHorizontal: 10, height: 30, }}

                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Áp dụng chính sách riêng cho phòng ban</Text>
                                    <Switch
                                        color="#2089dc"
                                        value={value}
                                        onValueChange={() => setValue(!value)}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Button
                                        buttonStyle={{ width: 100 }}
                                        containerStyle={{ margin: 5 }}
                                        iconContainerStyle={{ background: "#000" }}
                                        loadingProps={{ animating: true }}
                                        loadingStyle={{}}
                                        title="Thêm"
                                        titleProps={{}}
                                        titleStyle={{ marginHorizontal: 5 }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center',
                                            // marginTop: 15,
                                            // width: 70,
                                            // height: 30,
                                            // alignItems: 'center',
                                            // borderRadius: 5,
                                            // alignSelf: 'flex-end',
                                            // borderColor: 'black',
                                            marginLeft: 130
                                        }}
                                        onPress={() => onPressCancel()}
                                    >

                                        <Text style={{ fontSize: 18, color: '#03b6fc' }}>Thoát</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }

    const DepartmentsList = () => {
        return (
            <View>
                <Text>List</Text>
            </View>
        )
    }





    return (
        <ScrollView style={styles.container, { backgroundColor: `${bgColor}` }}>
            {data == null ? <NoDepartment /> : <DepartmentsList />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        marginTop: 20
    },
    img: {
        width: 150,
        height: 150,
        marginTop: 60,
        alignSelf: 'center'
    },
    button: {
        width: 190,
        height: 48,
        backgroundColor: '#4d91ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    modalView: {
        margin: 10,
        backgroundColor: "#f5f9ff",
        borderRadius: 3,
        padding: 15,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 350,

    },
    modalItem: {
        paddingLeft: 10,
        marginTop: 3,
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },
    modalText: {
        fontSize: 17
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
})

export default DepartmentStructure