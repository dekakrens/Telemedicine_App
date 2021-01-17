import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity 
} from 'react-native';

import BleManager from "react-native-ble-manager"
import { stringToBytes, bytesToString } from 'convert-string';
import { NativeModules, NativeEventEmitter } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class HeartScreen extends React.Component {
  constructor(props){
    super(props)
        this.state = {
          databpm: '',
          heart: '',
          encrypt_string: '',
          nilaijantung: '',
  }

    this.writeBtn1 = this.writeBtn1.bind(this);
    this.notifBtn = this.notifBtn.bind(this);
    this.getdrAPI = this.getdrAPI.bind(this);
    this.postkeAPI = this.postkeAPI.bind(this);
  }

  async notifBtn() {
    const id = "24:6F:28:15:87:DA"
    const characteristicID = '1006'
    const serviceID = '180d'
  await BleManager.startNotification(id, serviceID, characteristicID);
  // Add event listener
  bleManagerEmitter.addListener(
    "BleManagerDidUpdateValueForCharacteristic",
    ({ value}) => {
      // Convert bytes array to string
      const data = bytesToString(value);
      this.setState({databpm: data});
      console.log('Received ' +data);
    }
  );
  // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
}
async postkeAPI (){
    axios.post('http://159.89.204.122/input/dj', {
    heart: this.state.databpm,
  })
  .then(function (response) {
    console.log("Data sent");
    Alert.alert('Data terkirim');
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  async writeBtn1(){
    const id = "24:6F:28:15:87:DA"
    const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
    const serviceID = '180d'
    
    const data = stringToBytes('1');
    console.log(data)

    BleManager.retrieveServices(id).then((peripheralInfo) => {
      //console.log(peripheralInfo);
      setTimeout(() => {
        BleManager.write(id, serviceID, characteristicID, data).then(() => {
          console.log("Success Write");
          
        }).catch((e) => {
          console.log(e)
        });

      }, 500);
    });
  }
      // BleManager.startNotification(id, serviceID, '1006');
  
  //     bleManagerEmitter.addListener(
  //       "BleManagerDidUpdateValueForCharacteristic",
  //       ( value, id, serviceID, '1006' ) => {
  //         const data = value;
  //         console.log('Received ' +data);
  //       }
  // );

      // setTimeout(() => {
      //   BleManager.startNotification(id, serviceID, '1006').then(() => {
      //     console.log('Started notification on ' + id);
          
      //   }).catch((error) => {
      //     console.log('Notification error', error);
      //   });
      // }, 200);
     async getdrAPI (){
     axios.get('http://159.89.204.122/info/dj')
    .then(response => this.setState({nilaijantung: response.data.webserver1[0].heart}))
    .catch(err => console.log(err))
    // axios.get('http://159.89.204.122/info/dj')
    // .then(function (response) {
    //   const heart = response.data.webserver1[0].heart;
    //   console.log(heart);
    //   this.setState({nilaisuhu: heart});
    // })
    // // this.setState({heart: data});
    // return fetch('http://159.89.204.122/info/dj')
    // .then((response) => response.json())
    // .then((json)  =>  {
    //   // setHeart(json.Heart_Rate);
    //   console.log(json.webserver1.Heart_Rate);
    //   return json;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  };
  
  render(){
    return (
      <View>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn1}>
          <Text style={{fontSize: 20}}>Send Data via BLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={() => this.props.navigation.navigate('SetWifiHeartScreen')}>
          <Text style={{fontSize: 20}}>Send Data via Wi-Fi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.notifBtn}>
          <Text style={{fontSize: 20}}>Get Data from BLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.getdrAPI}>
          <Text style={{fontSize: 20}}>Get Data from Server</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.postkeAPI}>
          <Text style={{fontSize: 20}}>Post Data to Server</Text>
        </TouchableOpacity>
        <Text style={styles.connectBtn}>
            {this.state.databpm}
             </Text>
        <Text style={styles.connectBtn}>
            {this.state.nilaijantung}
             </Text>
      </View>
      );
  }
  
};

const styles = StyleSheet.create({
  connectBtn: {
    alignSelf: "center",
    borderColor: "red",
    borderWidth: 1,
    marginTop: "20%",
    
  }
});
