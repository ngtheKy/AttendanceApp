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

import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Input} from 'react-native-elements';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Buffer} from 'buffer';

const MemberDetail = ({route, navigation}) => {
  const [name, setName] = useState();
  const [item, setItem] = useState([]);
  const [imgData, setImgData] = useState();
  const data = route.params;

  useEffect(() => {
    axios
      .get(`http://192.168.43.101:3000/nhanvien/${data.id}`)
      .then(res => {
        const member = res.data.nhanvien;
        setItem(member);
        const b64 = new Buffer(member.Hinhanh.data).toString('base64');
        // console.log(b64)
        setImgData(b64);
      })
      .catch(error => console.log(error));
  }, []);

  // console.log(item.Gioitinh)
  // console.log(item.Hinhanh)
  // console.log(item.MaNV)
  // console.log(item.id)

  return (
    <ScrollView style={styles.container}>
      <View className="form-input" style={styles.input}>
        <Text style={styles.formHeader}>Thông tin tài khoản</Text>
        <View className="Account-login" style={styles.form}>
          <Image
            source={{uri: `data:image/jpeg;base64,${imgData}`}}
            style={styles.img}
          />
          <Text style={styles.label}>Họ và tên</Text>
          <Text style={styles.info}>
            {item.HoNV}
            {item.TenNV}
          </Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{item.Email}</Text>
          <Text style={styles.label}>Mật khẩu</Text>
          <Text style={styles.info}>{item.Password}</Text>
        </View>
        <Text style={styles.formHeader}>Hồ sơ nhân viên</Text>
        <View className="Mem-profile" style={styles.form}>
          <Text style={styles.label}>Mã nhân viên</Text>
          <Text style={styles.info}>{item.id}</Text>
          <Text style={styles.label}>Phòng ban, bộ phận</Text>
          <Text style={styles.info}>{item.TenPhongban}</Text>
          <Text style={styles.label}>Ngày sinh</Text>
          <Text style={styles.info}>{item.Ngaysinh}</Text>
          <Text style={styles.label}>Giới tính</Text>
          {`${item.Gioitinh}` == 1 ? (
            <Text style={styles.info}>Nam</Text>
          ) : (
            <Text style={styles.info}>Nữ</Text>
          )}
          <Text style={styles.label}>Căn cước công dân</Text>
          <Text style={styles.info}>{item.CCCD}</Text>
          <Text style={styles.label}>Quê quán</Text>
          <Text style={styles.info}>{item.Quequan}</Text>
          <Text style={styles.label}>Địa chỉ</Text>
          <Text style={styles.info}>{item.Diachi}</Text>
          <Text style={styles.label}>Số điện thoại</Text>
          <Text style={styles.info}>{item.Sdt}</Text>
          <Text style={styles.label}>Thiết bị đăng ký chấm công</Text>
          <Text style={styles.info}>{item.IdDevice}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Thay đổi thông tin nhân viên', {id: item.id})
        }
        style={styles.button}>
        <MaterialCommunityIcons
          name="update"
          size={20}
          color="white"
          style={styles.buttonTxt}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Thay đổi</Text>
        </MaterialCommunityIcons>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Arial',
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
    marginTop: 40,
  },
  input: {
    marginHorizontal: 13,
    backgroundColor: 'white',
  },
  buttonTxt: {
    backgroundColor: '#0796dc',
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  formHeader: {
    fontSize: 21,
    marginTop: 10,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  form: {
    marginTop: 5,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginHorizontal: 15,
  },
  info: {
    fontSize: 16,
    color: '#5c5c5c',
    marginTop: 5,
    marginHorizontal: 20,
  },
});

export default MemberDetail;
