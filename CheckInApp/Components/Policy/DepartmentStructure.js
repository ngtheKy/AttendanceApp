import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Header, Input, Switch, Button} from 'react-native-elements';
import axios from 'axios';

const Departments = [{tenpb: 'Phòng Công nghệ', mapb: 'CN', pbcon: ''}];

const DepartmentStructure = () => {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bgColor, setBgColor] = useState('white');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [value, setValue] = useState(true);
  const [input, setInput] = useState({TenPhongban: '', idPhongban: ''});

  function onPressModal() {
    setModalVisible(true);
    setBgColor('gray');
  }

  function onPressCancel() {
    setModalVisible(!modalVisible);
    setBgColor('white');
  }

  useEffect(() => {
    axios
      .get(`http://192.168.43.101:3000/phongban`)
      .then(res => {
        const phongban = res.data.phongban;
        setData(phongban);
        // const b64 = new Buffer(member.Hinhanh.data).toString('base64');
        // console.log(b64)
        // setImgData(b64);
      })
      .catch(error => console.log(error));
  }, []);
  console.log(data);

  const update = () => {
    axios
      .post(`http://192.168.43.101:3000/phongban`, input)
      .then(res => {
        console.log(res.status);
        Alert.alert('Thông báo', 'Cập nhật thông tin thành công', [
          {
            text: 'Ok',
          },
        ]);
      })
      .catch(error => console.log(error));
  };

  const Phongban = ({item}) => {
    return (
      <View>
        <TouchableOpacity style={{height: 120}}>
          <Text style={styles.label}>{item.idPhongban}</Text>
          <Text style={styles.label}>{item.TenPhongban}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: {bgColor}}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color: '#4d91ff', fontSize: 18, fontWeight: 'bold'}}>
              Thêm phòng ban
            </Text>
            <Input
              onChangeText={value => {
                setInput({...input, TenPhongban: value});
              }}
              value={input}
              //   label={'Tên phòng ban'}
              keyboardType="default"
              inputContainerStyle={{marginHorizontal: 10, height: 30}}
              containerStyle={{marginTop: 20}}
              placeholder={'Tên phòng ban'}
            />
            <Input
              onChangeText={value => {
                setInput({...input, idPhongban: value});
              }}
              value={input}
              //   label={'Mã phòng ban'}
              placeholder={'Mã phòng ban'}
              keyboardType="default"
              inputContainerStyle={{marginHorizontal: 10, height: 30}}
            />
            <View style={{flexDirection: 'row'}}></View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Button
                buttonStyle={{width: 100}}
                containerStyle={{margin: 5}}
                iconContainerStyle={{background: '#000'}}
                loadingProps={{animating: true}}
                loadingStyle={{}}
                title="Thêm"
                titleProps={{}}
                titleStyle={{marginHorizontal: 5}}
                onPress={() => update()}
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
                  marginLeft: 130,
                }}
                onPress={() => onPressCancel()}>
                <Text style={{fontSize: 18, color: '#03b6fc'}}>Thoát</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({item}) => <Phongban item={item} />}
          keyExtractor={item => item.idPhongban}
        />
      </View>
      <TouchableOpacity style={styles.addbtn} onPress={() => onPressModal()}>
        <MaterialCommunityIcons name="plus-outline" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center'
  },
  label: {
    fontSize: 17,
    marginLeft: 15,
  },
  text: {
    textAlign: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    marginTop: 20,
  },
  img: {
    width: 150,
    height: 150,
    marginTop: 60,
    alignSelf: 'center',
  },
  button: {
    width: 190,
    height: 48,
    backgroundColor: '#4d91ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  list: {
    height: '100%',
    // backgroundColor: 'gray',
  },
  modalView: {
    margin: 10,
    backgroundColor: '#f5f9ff',
    borderRadius: 3,
    padding: 15,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
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
    borderRadius: 5,
  },
  modalText: {
    fontSize: 17,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  addbtn: {
    width: 50,
    height: 50,
    backgroundColor: '#0796dc',
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DepartmentStructure;
