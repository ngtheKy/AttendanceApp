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
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {DataTable} from 'react-native-paper';

export default function TimeSheet() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://192.168.43.101:3000/chamcongthang`)
      .then(res => {
        const chamcong = res.data.chamcong;
        setData(chamcong);
      })
      .catch(error => console.log(error));
  }, []);

  //   console.log(data);

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
    <View style={styles.container}>
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
            data={data}
            renderItem={({item}) => <LogData item={item} />}
            keyExtractor={item => item.idChamcongthang}
          />
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logsData: {
    // backgroundColor: 'gray',
    // marginBottom: 0,
    height: '100%',
  },
});
