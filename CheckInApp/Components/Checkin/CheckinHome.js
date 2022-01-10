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
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Clock from 'react-live-clock';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import {Icon} from 'react-native-elements';
import {DataTable} from 'react-native-paper';

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

const dummy = [
  {id: 1, date: '10/01', weekday: 'monday', timein: '08:00', timeout: '12:00'},
  {id: 2, date: '11/01', weekday: 'tuesday', timein: '08:00', timeout: '17:00'},
  {
    id: 3,
    date: '12/01',
    weekday: 'wednesday',
    timein: '08:00',
    timeout: '17:00',
  },
  {
    id: 4,
    date: '13/01',
    weekday: 'thursday',
    timein: '08:00',
    timeout: '17:00',
  },
  {id: 5, date: '14/01', weekday: 'friday', timein: '08:00', timeout: '17:00'},
  {
    id: 6,
    date: '15/01',
    weekday: 'saturday',
    timein: '08:00',
    timeout: '17:00',
  },
];

const CheckinHome = () => {
  const [clockState, setClockState] = useState();
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [lat, setLat] = useState(21.030653);
  const [long, setLong] = useState(105.84713);

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

  // console.log(currentLatitude);

  function marker() {
    if (currentLatitude !== null) {
      setLat(currentLatitude);
      // console.log(typeof lat);
    }
    if (currentLongitude !== null) {
      setLong(currentLongitude);
      // console.log(typeof long);
    }
    console.log(lat, long);
  }

  const LogData = ({item}) => {
    return (
      <DataTable.Row style={{height: 60}}>
        <DataTable.Cell>{item.date}</DataTable.Cell>
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
          showsUserLocation={true}>
          <Marker
            key={1}
            coordinate={{
              latitude: Number(lat),
              longitude: Number(long),
            }}
          />
        </MapView>
      </View>
      <TouchableOpacity style={styles.checkin} onPress={() => marker()}>
        <Text style={styles.clock}>{clockState}</Text>
        <Text style={styles.checkinBtn}>CHECK IN</Text>
      </TouchableOpacity>
      <View style={styles.logs}>
        <View style={styles.headerLogs}>
          <Icon type="material-community" name="calendar-clock" size={20} />
          <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 5}}>
            Lastest Attendance Logs
          </Text>
        </View>
        <View style={styles.logsData}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Weekday</DataTable.Title>
              <DataTable.Title numeric>First In</DataTable.Title>
              <DataTable.Title numeric>Last Out</DataTable.Title>
            </DataTable.Header>

            <FlatList
              style={{width: '100%', height: '87%', backgroundColor: 'white'}}
              data={dummy}
              renderItem={({item}) => <LogData item={item} />}
              keyExtractor={item => item.id}
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
    backgroundColor: '#0796dc',
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
