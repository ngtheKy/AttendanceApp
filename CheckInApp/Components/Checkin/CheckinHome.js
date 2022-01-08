import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Clock from 'react-live-clock';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

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
  const [currentLocation, setLocation] = useState();

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log(position.coords);
  //       setLocation(position.coords);
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }, []);
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

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };
  // console.log(currentLocation.latitude);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <MapView
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            latitude: 21.030653,
            longitude: 105.84713,
            // latitude: currentLocation.latitude,
            // longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        />
      </View>
      <TouchableOpacity style={styles.checkin} onPress={() => {}}>
        <Text style={styles.clock}>{clockState}</Text>
        <Text style={styles.checkinBtn}>CHECK IN</Text>
      </TouchableOpacity>
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
});
