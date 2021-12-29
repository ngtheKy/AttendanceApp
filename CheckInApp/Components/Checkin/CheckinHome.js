import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import Clock from 'react-live-clock';
import DeviceInfo from 'react-native-device-info';


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

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);


    
    return (
        <SafeAreaView style={styles.container}>
             <MapView
                style={{ width: '100%', height: '40%'}}
                initialRegion={{
                latitude: 21.030653,
                longitude: 105.847130,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                
                }}
                showsUserLocation={true}
            />
            <TouchableOpacity 
              style={styles.checkin}
              onPress={() => {}}
            >
                
                <Text style={styles.clock}>{clockState}</Text>
                <Text style={styles.checkinBtn}>CHECK IN</Text>
            </TouchableOpacity>
            

        </SafeAreaView>
    )
}

export default CheckinHome

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  clock:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    // backgroundColor: 'gray',
    // height: '100%',
    width: '30%',
    textAlign: 'center'
  },
  checkinBtn:{
    width: '70%',
    fontWeight: 'normal',
    color: 'white',
    // backgroundColor: '#5e5e5e',
    fontSize: 18,
    textAlign: 'center'
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
    alignItems: 'center'
  }
})
