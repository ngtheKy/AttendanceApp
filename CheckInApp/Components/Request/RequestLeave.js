import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Input, Icon, CheckBox} from 'react-native-elements';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from './RequestHome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RequestLeave = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(1640995200000));
  const [TenPhongban, setTenPhongban] = useState('');
  const [birthDay, setBirthDay] = useState('1-1-2022');
  const [Ngaysinh, setNgaysinh] = useState(new Date(1640995200000));
  const [lydo, setLydo] = useState('');
  const [data, setData] = useState();
  const [input, setInput] = useState({
    TenPhongban: '',
    idPhongban: '',
    TenNV: '',
    lydo: '',
    ngpheduyet: '',
    ngaynghi: '',
    nghitoingay: '',
  });
  const [animating, setAnimating] = useState(true);

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

  const data1 = useContext(Context);
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

  // console.log(data1);
  return (
    <View style={styles.container}>
      <View className="form-input" style={styles.input}>
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

        <View className="Account-login" style={styles.form}>
          <Text style={styles.label}>Phòng ban, Bộ phận</Text>
          <Picker
            selectedValue={TenPhongban}
            onValueChange={(itemValue, itemIndex) => setTenPhongban(itemValue)}
            mode="dropdown"
            style={styles.picker}>
            {/* {data.map(() => {
              return (
                <Picker.Item
                  label={data.TenPhongban}
                  value={data.TenPhongban}
                  key={data.idPhongban}
                />
              );
            })} */}
            <Picker.Item label="Phòng Kỹ thuật" value="Phòng Kỹ thuật" />
            <Picker.Item label="Phòng Hành chính" value="Phòng Hành chính" />
            <Picker.Item label="Phòng Kế toán" value="Phòng Kế toán" />
            <Picker.Item label="Phòng Nhân sự" value="Phòng Nhân sự" />
          </Picker>
          <Text style={styles.label}>Nhân viên</Text>
          <Picker
            selectedValue={TenPhongban}
            onValueChange={(itemValue, itemIndex) => setTenPhongban(itemValue)}
            mode="dropdown"
            style={styles.picker}>
            <Picker.Item label="Phòng Kỹ thuật" value="Phòng Kỹ thuật" />
            <Picker.Item label="Phòng Hành chính" value="Phòng Hành chính" />
            <Picker.Item label="Phòng Kế toán" value="Phòng Kế toán" />
            <Picker.Item label="Phòng Nhân sự" value="Phòng Nhân sự" />
          </Picker>
          <Input
            onChangeText={value => setLydo(value)}
            value={lydo}
            label={'Lý do xin nghỉ'}
            keyboardType="default"
            // disabled='true'
            maxLength={255}
            // autoFocus={true}
            autoCapitalize={'sentences'}
          />
          <Text style={styles.label}>Người phê duyệt</Text>
          <Picker
            selectedValue={TenPhongban}
            onValueChange={(itemValue, itemIndex) => setTenPhongban(itemValue)}
            mode="dropdown"
            style={styles.picker}>
            <Picker.Item label="Phòng Kỹ thuật" value="Phòng Kỹ thuật" />
            <Picker.Item label="Phòng Hành chính" value="Phòng Hành chính" />
            <Picker.Item label="Phòng Kế toán" value="Phòng Kế toán" />
            <Picker.Item label="Phòng Nhân sự" value="Phòng Nhân sự" />
          </Picker>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.label}>Nghỉ từ ngày</Text>
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
            </View>
            <View>
              <Text style={styles.label}>Tới ngày</Text>
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
            </View>
          </View>
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
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Save
          </Text>
        </MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
};

export default RequestLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Arial',
    // backgroundColor: 'gray',
  },

  input: {
    marginHorizontal: 13,
    backgroundColor: 'white',
    height: '93%',
  },
  buttonTxt: {
    backgroundColor: '#0796dc',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  formHeader: {
    fontSize: 20,
    marginTop: 20,
  },
  form: {
    marginTop: 20,
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
    marginTop: 15,
  },
  picker: {
    marginTop: 7,
  },
  button: {
    width: '100%',
    height: 70,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
