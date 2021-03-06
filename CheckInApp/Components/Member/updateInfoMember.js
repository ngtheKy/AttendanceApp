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
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Input, Icon, CheckBox} from 'react-native-elements';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Buffer} from 'buffer';
// import nextId, {useId} from 'react-id-generator';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const updateInfoMember = ({route, navigation}) => {
  const [TenNV, setTenNV] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [TenPhongban, setTenPhongban] = useState('');
  const [Ngaysinh, setNgaysinh] = useState(new Date(1640995200000));
  const [Gioitinh, setGioitinh] = useState(true);
  const [CCCD, setCCCD] = useState('');
  const [Quequan, setQuequan] = useState('');
  const [Sdt, setSdt] = useState('');
  const [idDevice, setidDevice] = useState('');
  const [Diachi, setDiachi] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [item, setItem] = useState([]);

  const [imgData, setImgData] = useState();
  const [name, setName] = useState();

  const [On, setOn] = useState(true);
  const [On1, setOn1] = useState(true);
  const ref_input2 = useRef();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(1640995200000));
  const [birthDay, setBirthDay] = useState('1-1-2022');

  // const id = nextId('178131000');

  const data = route.params;
  // console.log(data)

  const input = {
    TenNV: `${TenNV}`,
    Email: `${Email}`,
    Password: `${Password}`,
    TenPhongban: `${TenPhongban}`,
    Ngaysinh: `${Ngaysinh}`,
    Gioitinh: `${Gioitinh == true ? 1 : 0}`,
    CCCD: `${CCCD}`,
    Quequan: `${Quequan}`,
    Sdt: `${Sdt}`,
    idDevice: `${idDevice}`,
    // id: `${id}`,
    Diachi: `${Diachi}`,
  };

  // let dummy = JSON.stringify(input)           //.replace( /[{}]/g,'')

  // let dummy = {"TenNV":"Ky", "Email":"ky.ky.ky.ngtk@gmail.com"}
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
  //

  const update = () => {
    axios
      .patch(`http://192.168.43.101:3000/nhanvien/${data.id}`, input)
      .then(res => {
        console.log(res.status);
        Alert.alert('Th??ng b??o', 'C???p nh???t th??ng tin th??nh c??ng', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack('Th??ng tin nh??n vi??n'),
          },
        ]);
      })
      .catch(error => console.log(error));
  };

  function valTenNV() {
    // setTenNV(value)
    if (TenNV.length < 4) {
      Alert.alert('L???i', 'T??n kh??ng h???p l???, nh???p t??n d??i h??n 4 k?? t???!');
    }
    convertDate();
  }
  function valEmail() {
    // don't remember from where i copied this code, but this works.
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(Email)) {
    } else {
      Alert.alert('L???i', 'Email kh??ng h???p l???!');
    }
  }
  function togglePassword() {
    setOn(!On);
    // setPassVisible(!passVisible)
  }
  function togglePassword1() {
    setOn1(!On1);
  }
  function confirmPassword() {
    if (Password !== confirmPass) {
      Alert.alert('M???t kh???u kh??ng h???p l???', 'X??c nh???n l???i m???t kh???u!');
    }
  }
  const validatePass = () => {
    var strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    if (strongRegex.test(Password)) {
    } else {
      Alert.alert(
        'M???t kh???u kh??ng h???p l???',
        'M???t kh???u c?? ??t nh???t 8 k?? t??? v?? ch???a c??c k?? t??? ch??? th?????ng, ch??? in, s???, k?? t??? ?????c bi???t!',
      );
    }
  };

  const onChange = date => {
    setOpen(false);
    setDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString1 = `${year}-${month}-${day}`;
    const dateString = `${day}-${month}-${year}`;

    setBirthDay(dateString);
    setNgaysinh(dateString1);
    console.log(dateString1);
    console.log(date);
  };

  const gender = () => {
    setGioitinh(!Gioitinh);
    console.log(Gioitinh);
  };

  const valCCCD = () => {
    if (CCCD.length < 9) {
      Alert.alert(
        'Th??ng tin kh??ng h???p l???',
        'Nh???p s??? CCCD ho???c Ch???ng minh th?? c?? ????? d??i 9 - 12 s???',
      );
    }
  };

  const valQuequan = () => {
    if (Quequan.length < 4) {
      Alert.alert(
        'Th??ng tin kh??ng h???p l???',
        'Nh???p th??ng tin qu?? qu??n c?? ????? d??i > 4 k?? t???',
      );
    }
  };

  const valDiachi = () => {
    if (Diachi.length < 4) {
      Alert.alert(
        'Th??ng tin kh??ng h???p l???',
        'Nh???p th??ng tin ?????a ch??? c?? ????? d??i > 4 k?? t???',
      );
    }
  };
  const valSdt = () => {
    if (Sdt.length < 10) {
      Alert.alert(
        'Th??ng tin kh??ng h???p l???',
        'Nh???p s??? ??i???n tho???i c?? ????? d??i > 10 k?? t???',
      );
    }
  };

  const convertDate = () => {
    const date = new Date(item.Ngaysinh);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString = `${day}-${month}-${year}`;
    setBirthDay(dateString);
    console.log(dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        format="DD-MM-YYYY"
        maximumDate={new Date()}
        onConfirm={date => onChange(date)}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View className="form-input" style={styles.input}>
        <Text style={styles.formHeader}>Th??ng tin t??i kho???n</Text>
        <View className="Account-login" style={styles.form}>
          <Input
            onChangeText={value => setTenNV(value)}
            onEndEditing={() => valTenNV()}
            value={TenNV}
            label={'H??? v?? t??n'}
            placeholder={`${item.TenNV}`}
            defaultValue={item.TenNV}
            keyboardType="default"
            // disabled='true'
            maxLength={255}
            // autoFocus={true}
            autoCapitalize={'words'}
          />
          <Input
            onChangeText={value => setEmail(value)}
            onEndEditing={() => valEmail()}
            value={Email}
            label={'Email'}
            placeholder={`${item.Email}`}
            keyboardType="email-address"
            defaultValue={item.Email}
          />
          <Input
            onChangeText={value => setPassword(value)}
            onEndEditing={() => validatePass()}
            value={Password}
            label={'M???t kh???u'}
            placeholder={`${item.Password}`}
            keyboardType="default"
            secureTextEntry={On}
            rightIcon={
              <Icon
                name={On == true ? 'eye' : 'eye-off'}
                type="material-community"
                size={20}
                onPress={() => togglePassword()}
              />
            }
          />
          <Input
            onChangeText={value => setConfirmPass(value)}
            onEndEditing={() => confirmPassword()}
            value={confirmPass}
            label={'X??c nh???n m???t kh???u'}
            //placeholder={item.Password}
            keyboardType="default"
            secureTextEntry={On1}
            rightIcon={
              <Icon
                name={On1 == true ? 'eye' : 'eye-off'}
                type="material-community"
                size={20}
                onPress={() => togglePassword1()}
              />
            }
            // ref={ref_input2}
          />
        </View>
        <Text style={styles.formHeader}>H??? s?? nh??n vi??n</Text>
        <View className="Mem-profile" style={styles.form}>
          <Input
            // onChangeText={(value) => setid(value)}
            // value={id}
            label={'M?? Nh??n vi??n'}
            placeholder={`${item.id}`}
            defaultValue={item.id}
            keyboardType="default"
            editable={false}
          />
          <Text style={styles.label}>Ph??ng ban, B??? ph???n</Text>
          <Picker
            selectedValue={TenPhongban}
            onValueChange={(itemValue, itemIndex) => setTenPhongban(itemValue)}
            mode="dropdown"
            style={{}}>
            <Picker.Item label="Ph??ng K??? thu???t" value="Ph??ng K??? thu???t" />
            <Picker.Item label="Ph??ng H??nh ch??nh" value="Ph??ng H??nh ch??nh" />
            <Picker.Item label="Ph??ng K??? to??n" value="Ph??ng K??? to??n" />
            <Picker.Item label="Ph??ng Nh??n s???" value="Ph??ng Nh??n s???" />
          </Picker>
          <Text style={styles.label}>Ng??y sinh</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: 17,
              marginVertical: 10,
              // backgroundColor: 'gray',
              alignItems: 'center',
            }}
            onPress={() => setOpen(true)}>
            {/* setOpen(true) */}
            <Text
              style={{
                fontSize: 17.5,
              }}>
              {JSON.stringify(birthDay).replace(/[""]/g, '')}
            </Text>
            <Icon
              type="material-community"
              name="calendar"
              size={20}
              style={{marginLeft: 40}}
            />
          </TouchableOpacity>

          <Text style={styles.label}>Gi???i t??nh</Text>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              // center
              title="Nam"
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="green"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              checked={!Gioitinh}
              onPress={() => gender()}
            />
            <CheckBox
              // center
              title={'N???'}
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="green"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              checked={Gioitinh}
              onPress={() => gender()}
            />
          </View>
          <Input
            onChangeText={value => setCCCD(value)}
            onEndEditing={() => valCCCD()}
            value={CCCD}
            label={'C??n c?????c c??ng d??n'}
            placeholder={`${item.CCCD}`}
            defaultValue={item.CCCD}
            keyboardType="number-pad"
            // secureTextEntry={true}
            maxLength={12}
          />

          <Input
            onChangeText={value => setQuequan(value)}
            onEndEditing={() => valQuequan()}
            value={Quequan}
            label={'Qu?? qu??n'}
            defaultValue={`${item.Quequan}`}
            keyboardType="default"
            placeholder={item.Quequan}
            // secureTextEntry={true}
            maxLength={255}
            autoCapitalize={'words'}
          />
          <Input
            onChangeText={value => setDiachi(value)}
            onEndEditing={() => valDiachi()}
            value={Diachi}
            label={'?????a ch??? hi???n t???i'}
            defaultValue={`${item.Diachi}`}
            keyboardType="default"
            placeholder={item.Diachi}
            // secureTextEntry={true}
            maxLength={255}
            autoCapitalize={'words'}
          />
          <Input
            onChangeText={value => setSdt(value)}
            onEndEditing={() => valSdt()}
            value={Sdt}
            label={'S??? ??i???n tho???i'}
            defaultValue={item.Sdt}
            keyboardType="number-pad"
            placeholder={`${item.Sdt}`}
            // secureTextEntry={true}
            maxLength={12}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => update()}
        // onPress={() => console.log(typeof(dummy))}
        style={styles.button}>
        <MaterialCommunityIcons
          name="content-save"
          size={20}
          color="white"
          style={styles.buttonTxt}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </MaterialCommunityIcons>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default updateInfoMember;

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
    justifyContent: 'center',
  },
  formHeader: {
    fontSize: 20,
    marginTop: 10,
  },
  form: {
    marginTop: 10,
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
  label: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#949494',
  },
});
