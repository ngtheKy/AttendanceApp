import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
  // {title: 'Thông tin Công ty', id: '01', iconname: 'domain'},
  {title: 'Cấu trúc phòng ban', id: '02', iconname: 'steam'},
  {title: 'Lịch làm việc', id: '03', iconname: 'calendar-clock'},
  // { title: 'Thiết lập Wifi & vị trí chấm công', id: '04', iconname: 'map-marker-radius' },
  {title: 'Cài đặt chấm công', id: '05', iconname: 'calculator-variant'},
  {title: 'Chính sách nghỉ phép', id: '06', iconname: 'car'},
  {title: 'Chính sách nghỉ lễ', id: '07', iconname: 'calendar-check'},
  {title: 'Hỗ trợ', id: '08', iconname: 'face-agent'},
];

const PolicyHome = ({navigation}) => {
  const onpress = item => {
    navigation.navigate(item.title);
  };

  const PolicyMenu = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onpress(item)} style={styles.container}>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.company}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/993/993891.png',
            }}
            style={styles.img}
          />
          <Text>Công ty Cổ phần DEHA Việt Nam</Text>
        </View>
        <TouchableOpacity
          style={{backgroundColor: 'white', marginRight: 15}}
          onPress={() => {
            navigation.navigate('login');
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828427.png',
            }}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({item}) => <PolicyMenu item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

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
    width: '100%',
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

export default PolicyHome;
