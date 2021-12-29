import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, StyleSheet, TextInput, 
    Alert, Modal, Pressable, Image, ScrollView, FlatList, Platform, TouchableOpacity
} from 'react-native'
import { Header, Input, Switch, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


const DATA = [
    {id: 1, name: 'Sáng', time: '08:00 - 12:00', day: [2,3,4,5,6]},
    {id: 2, name: 'Chiều', time: '13:00 - 17:00', day: [2,3,4,5,6]}
]



const WorkingTime = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState()
    const [date, setDate] = useState(new Date(1640970000000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [BgColor, setBgColor] = useState('white');
    const [modalBtnColor1, setModalBtnColor1] = useState(true);
    const [modalBtnColor2, setModalBtnColor2] = useState(true);
    const [modalBtnColor3, setModalBtnColor3] = useState(true);
    const [modalBtnColor4, setModalBtnColor4] = useState(true);
    const [modalBtnColor5, setModalBtnColor5] = useState(true);
    const [modalBtnColor6, setModalBtnColor6] = useState(true);
    const [modalBtnColor7, setModalBtnColor7] = useState(true);
    const [modalBtnColor8, setModalBtnColor8] = useState(true);
    const [modalBtnColor9, setModalBtnColor9] = useState(true);
    const [modalBtnColor10, setModalBtnColor10] = useState(true);
    const [modalBtnColor11, setModalBtnColor11] = useState(true);
    const [modalTxt, setModalTxt] = useState('black');

    function onPressCancel() {
        setModalVisible(!modalVisible)
        // setBgColor('white')
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };
    
    const showDatepicker = () => {
    showMode('date');
    };
    
    const showTimepicker = () => {
    showMode('time');
    };
    const dayBox1 = {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:`${modalBtnColor1 == true ? '#0796dc' : 'white'}`,
        color: 'white',
        justifyContent: 'center'
    }
    const dayBox2 = {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:`${modalBtnColor2 == true ? '#0796dc' : 'white'}`,
        color: 'white',
        justifyContent: 'center'
    }
    const dayBox3 = {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:`${modalBtnColor3 == true ? '#0796dc' : 'white'}`,
        color: 'white',
        justifyContent: 'center'
    }
    const dayBox4 = {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:`${modalBtnColor4 == true ? '#0796dc' : 'white'}`,
        color: 'white',
        justifyContent: 'center'
    }
    const dayBox5 = {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:`${modalBtnColor5 == true ? '#0796dc' : 'white'}`,
        color: 'white',
        justifyContent: 'center'
    }
    const dayBox6 = {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:`${modalBtnColor6 == true ? '#0796dc' : 'white'}`,
        color: 'white',
        justifyContent: 'center'
    }
    const dayBox7 = {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:`${modalBtnColor7 == true ? '#0796dc' : 'white'}`,
        color: 'white',
        justifyContent: 'center'
    }
    const monthBox1 = {
        width: `${100/4}%`,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#b3b3b3',
        backgroundColor:`${modalBtnColor8 == true ? '#0796dc' : 'white'}`,
    }
    const monthBox2 = {
        width: `${100/4}%`,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#b3b3b3',
        backgroundColor:`${modalBtnColor9 == true ? '#0796dc' : 'white'}`,
    }
    const monthBox3 = {
        width: `${100/4}%`,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#b3b3b3',
        backgroundColor:`${modalBtnColor10 == true ? '#0796dc' : 'white'}`,
    }
    const monthBox4 = {
        width: `${100/4}%`,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#b3b3b3',
        backgroundColor:`${modalBtnColor11 == true ? '#0796dc' : 'white'}`,
    }

    


    const RenderItem = ({item}) => {
        return(
        <View style={{}}>
                    <TouchableOpacity 
                        style={styles.workingShift}
                        onPress={() => setModalVisible(true)}
                    >
                        <View style={styles.shiftName}>
                            <Text style={{fontSize: 16}}>{item.name}</Text>
                            <Text style={{fontSize: 16}}>{item.time}</Text>
                        </View>
                        <View style={styles.weekBox}>
                            <Text style={styles.dayBox}>2</Text>
                            <Text style={styles.dayBox}>3</Text>
                            <Text style={styles.dayBox}>4</Text>
                            <Text style={styles.dayBox}>5</Text>
                            <Text style={styles.dayBox}>6</Text>
                            <Text style={styles.dayOff}>7</Text>
                            <Text style={styles.dayOff}>CN</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        )
    }

    
    return (
        <View style={styles.container}>
            <View className='dateTimePicker'>
            {/* <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View>
              <Button onPress={showTimepicker} title="Show time picker!" />
            </View> */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
            
            <View style={styles.info}>
            <Image source={{ uri: 'https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png' }}
                style={styles.img} />
                <Text style={{marginHorizontal: 30}}>Tên Cty</Text>
            </View>
            <View style={styles.adds}>
                <Text style={{

                        width: '50%',
                        height: 40,
                        textAlignVertical: 'center',
                        fontWeight: 'bold',
                        fontSize: 16
                        }}>LỊCH LÀM VIỆC</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        backgroundColor: '#0796dc',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        
                }}>THÊM CA </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.shift}>
                <Text style={styles.txtBox}>Ca làm</Text>
                <Text style={styles.txtBox2}>Ngày làm việc</Text>
                
            </View>
            <FlatList
                data={DATA}
                renderItem={({item}) => {
                    return(
                    <RenderItem item={item}/>
                    )
                }}
                keyExtractor={item => item.id}
            />
    
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
                        <Text style={{ color: '#4d91ff', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}
                                >Tạo ca làm việc</Text>
                        <View style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // backgroundColor: 'gray',
                            marginTop: 10
                            }}>
                                <View style={{marginTop: 20, width: '45%', }}>
                                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>Tên ca</Text>
                                <TextInput
                                onChangeText={() => { }}
                                value={name}
                                
                                keyboardType='default'
                                style={{ fontSize: 16,
                                borderBottomWidth: 1, 
                                borderBottomColor: '#b3b3b3',
                                height: 33,
                            }}
                            />
                            </View>
                            <View style={{marginTop: 20, width: '45%', }}>
                            
                                <Text style={{fontSize: 17, fontWeight: 'bold'}}>Ngày bắt đầu</Text>
                                <TouchableOpacity
                                    style={{borderBottomWidth: 1, borderBottomColor: '#b3b3b3'}}
                                    onPress={()=>showDatepicker()}
                                >
                                    <Text style={{fontSize: 16, marginTop: 10}}>01/01/2022</Text>
                                </TouchableOpacity>
                            </View>
                            
                            
                                            
                        </View>
                        <View style={styles.shift}>
                            <Text style={styles.txtBox}>Ca làm</Text>
                            <Text style={styles.txtBox2}>Lịch tuần</Text>
                            
                        </View>
                        <View className='AddShiftModal' style={styles.addShiftModal}>
                            <View className='Daily' style={styles.daily}>
                                <TouchableOpacity
                                    onPress={showTimepicker}
                                >
                                    <Text>00:00</Text>
                                </TouchableOpacity>
                                <Text> - </Text>
                                <TouchableOpacity
                                    onPress={showTimepicker}
                                >
                                    <Text>00:00</Text>
                                </TouchableOpacity>
                            </View>
                            <View className='Weekly' style={styles.weekly} >
                                <TouchableOpacity style={dayBox1}
                                    onPress={() => setModalBtnColor1(!modalBtnColor1)}
                                >
                                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={dayBox2}
                                    onPress={() => setModalBtnColor2(!modalBtnColor2)}
                                >
                                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>3</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={dayBox3}
                                    onPress={() => setModalBtnColor3(!modalBtnColor3)}
                                >
                                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={dayBox4}
                                    onPress={() => setModalBtnColor4(!modalBtnColor4)}
                                >
                                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={dayBox5}
                                    onPress={() => setModalBtnColor5(!modalBtnColor5)}
                                >
                                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>6</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={dayBox6}
                                    onPress={() => setModalBtnColor6(!modalBtnColor6)}
                                >
                                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={dayBox7}
                                    onPress={() => setModalBtnColor7(!modalBtnColor7)}
                                >
                                    <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>CN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.monthlyTxt}>Lịch tháng</Text>

                        <View className='Monthly' style={styles.monthly}>
                            <TouchableOpacity
                                style={monthBox1}
                                onPress={() => setModalBtnColor8(!modalBtnColor8)}
                            >
                                <Text>Tuần 1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={monthBox2}
                                onPress={() => setModalBtnColor9(!modalBtnColor9)}
                            >
                                <Text>Tuần 2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={monthBox3}
                                onPress={() => setModalBtnColor10(!modalBtnColor10)}
                            >
                                <Text>Tuần 3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={monthBox4}
                                onPress={() => setModalBtnColor11(!modalBtnColor11)}
                            >
                                <Text>Tuần 4</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
                            <Button
                                buttonStyle={{ width: 100 }}
                                containerStyle={{ margin: 5 }}
                                iconContainerStyle={{ background: "#000" }}
                                loadingProps={{ animating: true }}
                                loadingStyle={{}}
                                title="Lưu"
                                titleProps={{}}
                                titleStyle={{ marginHorizontal: 5 }}
                            />
                            <Button
                                buttonStyle={{ width: 100, backgroundColor: 'white', borderColor: 'red', borderWidth: 1 }}
                                containerStyle={{ margin: 5 }}
                                iconContainerStyle={{ background: "#000" }}
                                loadingProps={{ animating: true }}
                                loadingStyle={{}}
                                title="Xóa"
                                titleProps={{}}
                                titleStyle={{ marginHorizontal: 5, color: 'red' }}
                            />
                            
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    marginTop: 5,
                                    width: 70,
                                    height: 40,
                                    // backgroundColor: 'gray',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    marginLeft: 0
                                }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >

                                <Text style={{ fontSize: 18, color: '#03b6fc' }}>Thoát</Text>
                            </TouchableOpacity>

                    </View>
                            
                    </View>
                    
                </View>
            </Modal>
         
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        // backgroundColor: 'gray'
    },
    img: {
        width: 80,
        height: 80,
        alignSelf: 'flex-start'
    },
    info:{
        // backgroundColor: 'gray',
        marginHorizontal: 0,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    adds:{
        flexDirection: 'row',
        fontSize: 17,
        // backgroundColor: 'gray',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%'
    },
    shift:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 30
    },
    txtBox:{
        width: '29%',
        height: 30,
        borderBottomColor: '#b3b3b3',
        borderBottomWidth: 2,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    txtBox2:{
        width: '67%',
        height: 30,
        borderBottomColor: '#b3b3b3',
        borderBottomWidth: 2,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    workingShift:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50
    },
    weekBox:{
        width: '67%',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        flexDirection: 'row',
        height: '100%'
    },
    dayBox: {
        width: `${100/7}%`,
        borderBottomWidth: 0,
        borderColor: '#0796dc',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:'#0796dc',
        color: 'white',
        justifyContent: 'center'
    },
    dayOff: {
        width: `${100/7}%`,
        borderBottomWidth: 1,
        borderColor: '#b3b3b3',
        borderRightWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor:'white',
        
    },
    shiftName: {
        height: '100%',
        // backgroundColor: 'gray',
        justifyContent: 'center',
        borderBottomColor: '#b3b3b3',
        borderBottomWidth: 2,
        width: '29%'
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
        width: 370,
        // backgroundColor: 'gray'
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
        marginTop: 0,
        
        
    },
    addShiftModal:{
       flexDirection: 'row',
       justifyContent: 'space-between',
        // backgroundColor: 'gray',
        marginTop: 10,
        height: 50,
    },
    daily:{
        width: '29%',
        // backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
        alignItems: 'center'
    },
    weekly:{
        // backgroundColor: 'gray',
        height: '100%',
        width: '67%',
        flexDirection: 'row',
        borderColor: '#b3b3b3',
        borderWidth: 1
    },
    monthlyTxt:{
        width: '100%',
        height: 30,
        borderBottomColor: '#b3b3b3',
        borderBottomWidth: 2,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    },
    monthly:{
        // backgroundColor: 'gray',
        flexDirection: 'row',
        height: 55,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#b3b3b3'
    },
    monthBox: {
        width: `${100/4}%`,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#b3b3b3'
    }
})
export default WorkingTime