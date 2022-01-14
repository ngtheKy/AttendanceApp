import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  MarkerAnimated,
} from 'react-native-maps';
import Clock from 'react-live-clock';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import {Icon} from 'react-native-elements';
import {DataTable} from 'react-native-paper';
import axios from 'axios';

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
// console.log(`${hours}:${minutes}:${seconds}`)

// how to handle the cases where time is one digit
// function makeTwoDigits (time) {
//   const timeString = `${time}`;
//   if (timeString.length === 2) return time
//   return `0${time}`
// }

const CheckinHome = () => {
  const [clockState, setClockState] = useState();
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [lat, setLat] = useState(21.030653);
  const [long, setLong] = useState(105.84713);
  const [check, setCheck] = useState(false);
  const [input, setInput] = useState({
    lat: '',
    long: '',
    Weekday: '',
    date: '',
    month: '',
    year: '',
    timein: '',
    timeout: '',
  });
  const [btnColor, setBtnColor] = useState('#0796dc');
  const [chamcong, setChamcong] = useState();
  const [dateTrue, setDateTrue] = useState(false);
  const [count, setCount] = useState(0);

  var options = {hour12: false};
  const logs = new Date();
  const hour = logs.getHours();
  const min = logs.getMinutes();
  const timeout = `${hour}:${min}`.toLocaleString('en-US', options);
  // const day = logs.getDay();
  const date = logs.getDate();
  const month = logs.getMonth() + 1;
  const date2 = `${date}/${month}`;

  useEffect(() => {
    axios
      .get(`http://192.168.1.14:3000/chamcong`)
      .then(res => {
        const data = res.data.chamcong;
        setChamcong(data);
        // const b64 = new Buffer(member[0].Hinhanh.data).toString('base64');
        // setImgData(b64);
      })
      .catch(error => console.log(error));
  }, [count]);

  const post = () => {
    delete input.timeout;
    axios
      .post(`http://192.168.1.14:3000/chamcong/`, input)
      .then(res => {
        console.log(res.status);
        // Alert.alert('Chấm công', 'Check in thành công!', [
        //   {
        //     text: 'Ok',
        //   },
        // ]);
      })
      .catch(error => console.log(error));
  };

  const update = () => {
    // delete input.timein;
    const clone = JSON.parse(JSON.stringify(input));
    delete clone.timein;
    axios
      .patch(
        `http://192.168.1.14:3000/chamcong/${
          chamcong[chamcong.length - 1].idChamcong
        }`,
        clone,
      )
      .then(res => {
        console.log(res.status);
        // Alert.alert('Thông báo', 'Check Out thành công', [
        //   {
        //     text: 'Ok',
        //   },
        // ]);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    function DayinWeek() {
      switch (new Date().getDay()) {
        case 0:
          day = 'Chủ nhật';
          break;
        case 1:
          day = 'Thứ 2';
          break;
        case 2:
          day = 'Thứ 3';
          break;
        case 3:
          day = 'Thứ 4';
          break;
        case 4:
          day = 'Thứ 5';
          break;
        case 5:
          day = 'Thứ 6';
          break;
        case 6:
          day = 'Thứ 7';
      }
      return day;

      // console.log(day);
    }
    DayinWeek();
    if (day == 'Chủ nhật') {
      // console.log(day == 'Thứ 5');
      chamcong.map(item => {
        delete item.idChamcong;
        delete item.delId;
        axios
          .post(`http://192.168.1.14:3000/chamcongthang/`, item)
          .then(res => {
            console.log(res.status);
            // Alert.alert('Chấm công', 'Check in thành công!', [
            //   {
            //     text: 'Ok',
            //   },
            // ]);
          })
          .catch(error => console.log(error));
      });
      axios
        .delete(`http://192.168.1.14:3000/chamcong`)
        .then(res => {
          // console.log(res);
          console.log(res.data);
          // Alert.alert('Xóa thành công!');
        })
        .catch(error => console.log(error));
    }
  }, []);
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => {
        setLocationStatus(error.message);
      },
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        // console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => {
        setLocationStatus(error.message);
      },
      {enableHighAccuracy: false, maximumAge: 1000},
    );
  };

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  useEffect(() => {
    var options = {hour12: false};
    const logs = new Date();
    // const day = logs.getDay();
    const date = logs.getDate();
    const month = logs.getMonth() + 1;
    const year = logs.getFullYear();
    const hour = logs.getHours();
    const min = logs.getMinutes();
    const timein = `${hour}:${min}`.toLocaleString('en-US', options);
    const date2 = `${date}/${month}`;
    // setInput({
    //   lat: lat,
    //   long: long,
    //   Weekday: null,
    //   date: date2,
    //   year: year,
    //   timein: timein,
    // });
    function Week() {
      switch (new Date().getDay()) {
        case 0:
          day = 'Chủ nhật';
          break;
        case 1:
          day = 'Thứ 2';
          break;
        case 2:
          day = 'Thứ 3';
          break;
        case 3:
          day = 'Thứ 4';
          break;
        case 4:
          day = 'Thứ 5';
          break;
        case 5:
          day = 'Thứ 6';
          break;
        case 6:
          day = 'Thứ 7';
      }
      return (
        day,
        setInput({
          lat: lat,
          long: long,
          date: date,
          month: month,
          year: year,
          timein: timein,
          Weekday: day,
        })
      );

      // console.log(day);
    }
    Week();
  }, []);

  if (count === 1000) {
    setCount(0);
  }
  function marker() {
    if (currentLatitude !== null) {
      setLat(currentLatitude);
    }
    if (currentLongitude !== null) {
      setLong(currentLongitude);
    }

    if (check == false) {
      //checkin press
      setBtnColor('#f57171');

      if (Object.keys(chamcong).length !== 0) {
        console.log(Object.keys(chamcong).length !== 0, 'obj != 0');
        if (date == chamcong[chamcong.length - 1].date) {
          console.log(
            date == chamcong[chamcong.length - 1].date,
            'date = obj.date',
          );
        } else if (date !== chamcong[chamcong.length - 1].date) {
          post();
          console.log('post0', date == chamcong[chamcong.length - 1].date);
        }
      } else if (Object.keys(chamcong).length === 0) {
        post();
        console.log('post1', 'obj = 0', Object.keys(chamcong).length == 0);
      }
      setInput({...input, timeout: timeout});
    } else {
      //checkout press
      setBtnColor('#0796dc');
      console.log('update0');
      update();
    }
    setCheck(!check);
    setCount(count + 1);
    console.log(chamcong);
  }

  const LogData = ({item}) => {
    return (
      <DataTable.Row style={{height: 60}}>
        <DataTable.Cell>{`${item.date}/${item.month}`}</DataTable.Cell>
        <DataTable.Cell>{item.weekday}</DataTable.Cell>
        <DataTable.Cell numeric>{item.timein}</DataTable.Cell>
        <DataTable.Cell numeric>{item.timeout}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <MapView
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            // latitude: 21.030653,
            // longitude: 105.84713,
            latitude: Number(lat),
            longitude: Number(long),
            latitudeDelta: 0.05, //0.0922,
            longitudeDelta: 0.05, //0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          moveOnMarkerPress={true}>
          <MarkerAnimated
            key={1}
            coordinate={{
              latitude: Number(lat),
              longitude: Number(long),
            }}
          />
        </MapView>
      </View>
      <TouchableOpacity
        style={{...styles.checkin, backgroundColor: btnColor}}
        onPress={() => marker()}>
        <Text style={styles.clock}>{clockState}</Text>
        <Text style={styles.checkinBtn}>
          {check == false ? 'CHECK IN' : 'CHECK OUT'}
        </Text>
      </TouchableOpacity>
      <View style={styles.logs}>
        <View style={styles.headerLogs}>
          <Icon type="material-community" name="calendar-clock" size={20} />
          <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 5}}>
            Nhật ký chấm công
          </Text>
        </View>
        <View style={styles.logsData}>
          <DataTable>
            <DataTable.Header
              style={{
                height: 40,
                // backgroundColor: 'gray',
                alignItems: 'center',
              }}>
              <DataTable.Title>Ngày tháng</DataTable.Title>
              <DataTable.Title>Thứ</DataTable.Title>
              <DataTable.Title numeric>Check In</DataTable.Title>
              <DataTable.Title numeric>Check Out</DataTable.Title>
            </DataTable.Header>

            <FlatList
              style={{width: '100%', height: '87%', backgroundColor: 'white'}}
              data={chamcong}
              renderItem={({item}) => <LogData item={item} />}
              keyExtractor={item => item.idChamcong}
            />
          </DataTable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckinHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clock: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    // backgroundColor: 'gray',
    // height: '100%',
    width: '30%',
    textAlign: 'center',
  },
  checkinBtn: {
    width: '70%',
    fontWeight: 'bold',
    color: 'white',
    // backgroundColor: '#5e5e5e',
    fontSize: 20,
    textAlign: 'center',
  },
  checkin: {
    // width: '100%',
    height: 60,
    // backgroundColor: '#0796dc',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '40%',
  },
  logs: {
    // width: '100%',
    height: '49%',
    borderRadius: 3,
    shadowOpacity: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 5,
  },
  headerLogs: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    // borderBottomColor: 'black',
    paddingHorizontal: 10,
    borderRadius: 3,
    // borderBottomWidth: 1,
  },
  logsDataHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  logsData: {
    // backgroundColor: 'gray',
    marginBottom: 20,
    height: '87%',
  },
});
