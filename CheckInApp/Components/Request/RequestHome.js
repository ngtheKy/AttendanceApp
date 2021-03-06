import React, {useEffect, createContext, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  View,
  Image,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
  // { title: 'Chấm công bằng tay', id: '01', iconname: 'clipboard-list' },
  {title: 'Đơn xin nghỉ phép', id: '02', iconname: 'email-newsletter'},
  {title: 'Đơn xin tăng ca', id: '03', iconname: 'calendar-clock'},
];
export const Context = createContext();
export default function RequestHome({navigation}) {
  const [data, setData] = useState();

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

  const RequestMenu = ({item, onPress}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.title)}
        style={styles.container}>
        <MaterialCommunityIcons
          style={styles.item}
          name={item.iconname}
          color={item.color}
          size={26}>
          <View style={{textAlignVertical: 'center'}}>
            <Text style={{fontSize: 17, marginLeft: 12}}>{item.title}</Text>
          </View>
        </MaterialCommunityIcons>
      </TouchableOpacity>
    );
  };
  return (
    <Context.Provider value={data}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={({item}) => <RequestMenu item={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
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
    borderRadius: 5,
  },
  icon: {
    paddingRight: 10,
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
    justifyContent: 'space-between',
  },
  img: {
    width: 35,
    height: 35,
    margin: 9,
  },
});
