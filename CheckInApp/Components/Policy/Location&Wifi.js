import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'

const LocationWifi = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.info}>
          <Image source={{ uri: 'https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png' }}
              style={styles.img} />
          <Text style={{marginHorizontal: 30}}>Tên Cty</Text>
      </View>


      <View className='Wifi' style={styles.form}>
        <Text style={styles.label}>Điểm Wifi chấm công</Text>
        <TouchableOpacity
          style={styles.addBtn}
        >
          <Text style={styles.addLabel}>Thêm</Text>
        </TouchableOpacity>
      </View>


      <View className='Location' style={styles.form}>
        <Text style={styles.label}>Địa điểm chấm công</Text>
        <TouchableOpacity
          style={styles.addBtn}
        >
          <Text style={styles.addLabel}>Thêm</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

export default LocationWifi

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: 20,
    // backgroundColor: 'gray'
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: 'flex-start'
  },
  info:{
    // backgroundColor: 'gray',
    marginHorizontal: 0,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label:{
    fontSize: 19,
    fontWeight: 'bold',
    color: "#8f8f8f"
  },
  form:{
    flexDirection: 'row',
    width: '100%',
    borderColor: '#b3b3b3',
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',

  },
  addBtn:{
    width: 60,
    height: 35,
    backgroundColor: '#0796dc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
})
