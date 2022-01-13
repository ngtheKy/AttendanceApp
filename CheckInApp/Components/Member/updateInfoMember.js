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
      .get(`http://192.168.1.14:3000/nhanvien/${data.id}`)
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
      .patch(`http://192.168.1.14:3000/nhanvien/${data.id}`, input)
      .then(res => {
        console.log(res.status);
        Alert.alert('Thông báo', 'Cập nhật thông tin thành công', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack('Thông tin nhân viên'),
          },
        ]);
      })
      .catch(error => console.log(error));
  };

  function valTenNV() {
    // setTenNV(value)
    if (TenNV.length < 4) {
      Alert.alert('Lỗi', 'Tên không hợp lệ, nhập tên dài hơn 4 kí tự!');
    }
    convertDate();
  }
  function valEmail() {
    // don't remember from where i copied this code, but this works.
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(Email)) {
    } else {
      Alert.alert('Lỗi', 'Email không hợp lệ!');
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
      Alert.alert('Mật khẩu không hợp lệ', 'Xác nhận lại mật khẩu!');
    }
  }
  const validatePass = () => {
    var strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    if (strongRegex.test(Password)) {
    } else {
      Alert.alert(
        'Mật khẩu không hợp lệ',
        'Mật khẩu có ít nhất 8 kí tự và chứa các kí tự chữ thường, chữ in, số, kí tự đặc biệt!',
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
        'Thông tin không hợp lệ',
        'Nhập số CCCD hoặc Chứng minh thư có độ dài 9 - 12 số',
      );
    }
  };

  const valQuequan = () => {
    if (Quequan.length < 4) {
      Alert.alert(
        'Thông tin không hợp lệ',
        'Nhập thông tin quê quán có độ dài > 4 ký tự',
      );
    }
  };

  const valDiachi = () => {
    if (Diachi.length < 4) {
      Alert.alert(
        'Thông tin không hợp lệ',
        'Nhập thông tin địa chỉ có độ dài > 4 ký tự',
      );
    }
  };
  const valSdt = () => {
    if (Sdt.length < 10) {
      Alert.alert(
        'Thông tin không hợp lệ',
        'Nhập số điện thoại có độ dài > 10 ký tự',
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
        <Text style={styles.formHeader}>Thông tin tài khoản</Text>
        <View className="Account-login" style={styles.form}>
          <Input
            onChangeText={value => setTenNV(value)}
            onEndEditing={() => valTenNV()}
            value={TenNV}
            label={'Họ và tên'}
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
            label={'Mật khẩu'}
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
            label={'Xác nhận mật khẩu'}
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
        <Text style={styles.formHeader}>Hồ sơ nhân viên</Text>
        <View className="Mem-profile" style={styles.form}>
          <Input
            // onChangeText={(value) => setid(value)}
            // value={id}
            label={'Mã Nhân viên'}
            placeholder={`${item.id}`}
            defaultValue={item.id}
            keyboardType="default"
            editable={false}
          />
          <Text style={styles.label}>Phòng ban, Bộ phận</Text>
          <Picker
            selectedValue={TenPhongban}
            onValueChange={(itemValue, itemIndex) => setTenPhongban(itemValue)}
            mode="dropdown"
            style={{}}>
            <Picker.Item label="Phòng Kỹ thuật" value="Phòng Kỹ thuật" />
            <Picker.Item label="Phòng Hành chính" value="Phòng Hành chính" />
            <Picker.Item label="Phòng Kế toán" value="Phòng Kế toán" />
            <Picker.Item label="Phòng Nhân sự" value="Phòng Nhân sự" />
          </Picker>
          <Text style={styles.label}>Ngày sinh</Text>
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

          <Text style={styles.label}>Giới tính</Text>
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
              title={'Nữ'}
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
            label={'Căn cước công dân'}
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
            label={'Quê quán'}
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
            label={'Địa chỉ hiện tại'}
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
            label={'Số điện thoại'}
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
