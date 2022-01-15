import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import {Input, Icon, CheckBox} from 'react-native-elements';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OTRequest = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(1640995200000));
  const [date1, setDate1] = useState(new Date(1640995200000));
  const [TenPhongban, setTenPhongban] = useState('');
  const [OTDay, setOTDay] = useState('1-1-2022');
  const [Ngay, setNgay] = useState(new Date(1640995200000));
  const [lydo, setLydo] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('00:00');
  const [time1, setTime1] = useState('00:00');

  const onChange = date => {
    setOpen(false);
    setDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString1 = `${year}-${month}-${day}`;
    const dateString = `${day}-${month}-${year}`;

    setOTDay(dateString);
    setNgay(dateString1);
    console.log(dateString1);
    console.log(date);
  };
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(1640995200000);
    let tempDate1 = new Date(currentDate);
    let time = tempDate.getHours() + `:` + tempDate.getMinutes();
    let time1 = tempDate1.getHours() + `:` + tempDate1.getMinutes();
    setTime(time);
    setTime1(time1);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
  };
  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={styles.container}>
      <View className="form-input" style={styles.input}>
        <View className="dateTimePicker">
          {/* <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View>
              <Button onPress={showTimepicker} title="Show time picker!" />
            </View> */}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date1}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange1}
            />
          )}
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          format="DD-MM-YYYY"
          //   maximumDate={new Date()}
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

          <View>
            <Text style={styles.label}>Ngày đăng ký tăng ca</Text>
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
                {JSON.stringify(OTDay).replace(/[""]/g, '')}
              </Text>
              <Icon
                type="material-community"
                name="calendar"
                size={20}
                style={{marginLeft: 40}}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Giờ đăng ký tăng ca</Text>
          <View className="Daily" style={styles.daily}>
            <TouchableOpacity onPress={showTimepicker}>
              <Text style={{fontSize: 17}}>{time}</Text>
            </TouchableOpacity>
            <Text> - </Text>
            <TouchableOpacity onPress={showTimepicker}>
              <Text style={{fontSize: 17}}>{time1}</Text>
            </TouchableOpacity>
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

export default OTRequest;

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
  daily: {
    width: '29%',
    // backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
  },
});
