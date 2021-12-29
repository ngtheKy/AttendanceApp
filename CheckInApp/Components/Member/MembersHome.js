import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Alert, TextInput,
    Modal, Pressable, Image,
} from 'react-native'
import MemberDetail from './MemberDetail'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'react-native-elements'
import AddMember from './AddMember'
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';


const MembersHome = ({ navigation }) => {

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const [memberData, setMemberData] = useState([])
    const [delId, setDelId] = useState()
    const [count, setCount] = useState(0)

    const [value, setValue] = useState()

    const [modalVisible, setModalVisible] = useState(false);
    const [BgColor, setBgColor] = useState('white')

    useEffect(() => {
        axios.get(`http://192.168.1.14:3000/nhanvien`)
        .then(res => {
            const member = res.data.nhanvien;
            setMemberData( member );
            // console.log(member)
        })
        .catch(error => console.log(error));
            }, [count])

    const MemberList = ({ item, onPress }) => {

        function onLongpress() {
            setModalVisible(true)
            // console.log(`${item.id}`)
            setBgColor('gray')
            setDelId(item.id)
        }
        function onpress(){
            navigation.navigate(`Thông tin nhân viên`, {id: item.id})
            // console.log(item.id)
        }

        return (
            // ho ten, ma nv, chuc vu, phong ban, sdt, img,

            <TouchableOpacity
                onPress={() => onpress()}
                onLongPress={() => onLongpress()}
                style={styles.item}

            >
                <View style={{
                    // backgroundColor: 'gray',
                    width: '60%'
                }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.HoNV}{item.TenNV} {`${item.role}` == 1 ? <Text style={styles.role}>Admin</Text> : null}</Text>
                    <Text style={{ marginTop: 10 }}>Mã nhân viên: {item.id}</Text>
                    <Text>Chức vụ: {item.TenChucvu}</Text>
                    <Text>Phòng ban: {item.TenPhongban}</Text>
                    <Text>SĐT: {item.Sdt}</Text>
                </View>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png' }}
                    style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        // borderColor: 'gray',
                        marginHorizontal: 20,
                        marginTop: 20,
                        borderRadius: 50
                    }}
                />
            </TouchableOpacity>



        )
    }

    function Delete(){
        axios.delete(`http://192.168.1.14:3000/nhanvien/${delId}`)
        .then(res => {
            // console.log(res);
            console.log(res.data)
            Alert.alert('Xóa thành công!')
        })
        .catch(error => console.log(error));
        setModalVisible(!modalVisible)
        setBgColor('white')
        setCount(count + 1)
    }


    return (
        <SafeAreaView style={styles.container, { backgroundColor: BgColor, flex: 1 }}>
            {/* <View className='header' style={styles.header}>
                <Text style={styles.title}>MEMBER

                </Text>

            </View> */}

            <View className='search-bar' style={styles.searchbar}>
                <TextInput

                    style={styles.input}
                    // onChangeText={console.log(value)}
                    value={value}
                    placeholder="Tìm kiếm nhân viên"
                />
                {/* <TouchableOpacity
                    style={{
                        backgroundColor: '#0796dc',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        height: 40,
                        width: '10%',
                        borderRadius: 0
                    }}
                >
                    <MaterialCommunityIcons name='card-search-outline' size={43} color='white' />
                </TouchableOpacity> */}
                <DropDownPicker
                    style={styles.filter}
                    open={open}
                    items={items}
                    setOpen={setOpen}
                    setItems={setItems}
                    containerStyle={{ width: '45%', alignSelf: 'center', backgroundColor: 'white', borderRadius: 5 }}
                />

            </View>
            <View className='member' style={styles.list}>
                <FlatList
                    style={styles.list}
                    data={memberData}
                    renderItem={({ item }) => (
                        <MemberList item={item} />
                    )}
                    keyExtractor={(item) => item.id}
                />
                
            </View>
            <View style={styles.centeredView} className='member-modal'>
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
                            <TouchableOpacity
                                style={styles.modalItem}
                            >
                                <Text style={styles.modalText}>Phân quyền truy cập</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => Delete()}
                            >
                                <Text style={styles.modalText}>Xóa hồ sơ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalItem}
                            >
                                <Text style={styles.modalText}>Sa thải</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    marginTop: 15,
                                    width: 70,
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    alignSelf: 'flex-end',
                                }}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setBgColor('white')
                                }}
                            >
                                <Text style={{ fontSize: 18, color: '#03b6fc' }}>Thoát</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
            <TouchableOpacity
                    style={styles.addbtn}
                    onPress={() => navigation.navigate('Hồ sơ nhân viên')}
                >
                    <MaterialCommunityIcons name='account-multiple-plus-outline' size={26} color='white' />
                </TouchableOpacity>
        </SafeAreaView>
    )
}


export default MembersHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 70,
        backgroundColor: '#0796dc',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    item: {
        height: 150,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#c2c2c2',
        paddingHorizontal: 12,
        flexDirection: 'row'
    },
    list: {
        marginBottom: 20,
        // backgroundColor: 'gray'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        // backgroundColor: 'gray',

    },
    role: {
        backgroundColor: '#c6c9cf',
        width: 0,
        height: 20,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 15,
        color: '#0796dc'
    },
    addbtn: {
        width: 50,
        height: 50,
        backgroundColor: '#0796dc',
        borderRadius: 30,
        position: 'absolute',
        right: 20,
        bottom:45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        width: '50%',
        alignSelf: 'center',
        borderRadius: 5,
        marginRight: 5
    },
    searchbar: {
        backgroundColor: '#0796dc',
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    filter: {
        backgroundColor: '#0573a9',
        width: '100%',
        height: 40,
        alignSelf: 'center',
        borderRadius: 5,


    }, /////////////
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

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
        height: 210,
    },
    modalItem: {
        paddingLeft: 10,
        marginTop: 3,
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 17
    }
})

