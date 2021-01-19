import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  View,
  Text,
  StatusBar,
  TouchableOpacity 
} from 'react-native';

import BleManager from "react-native-ble-manager"
import Icon from 'react-native-vector-icons/Ionicons';
import { stringToBytes, bytesToString } from 'convert-string';
import { NativeModules, NativeEventEmitter } from "react-native";
import { useNavigation } from '@react-navigation/native';
var Aes = NativeModules.Aes;
import axios from 'axios';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class HeartScreen extends React.Component {
  constructor(props){
    super(props)
        this.state = {
          databpm: '',
          heart: '',
          tulisan: '',
          keterangan: '',
          encrypt_string: '',
          nilaijantung: '',
  }

    this.writeBtn1 = this.writeBtn1.bind(this);
    this.notifBtn = this.notifBtn.bind(this);
    this.getdrAPI = this.getdrAPI.bind(this);
    this.postkeAPI = this.postkeAPI.bind(this);
  }

  async notifBtn() {
    const id = "3C:71:BF:74:8D:2E"
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
      this.setState({tulisan: 'Heart Rate Value'});
      if (this.state.databpm<50){
        this.setState({keterangan: 'Detak Jantung Terlalu Rendah'});
      } else if (this.state.databpm>100){
        this.setState({keterangan: 'Detak Jantung Terlalu Tinggi'});
      } else {
        this.setState({keterangan: 'Detak Jantung Anda Normal'});
      }
      console.log('Received ' +data);
    }
  );
  // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
}
async postkeAPI (){
  const key = '591825e3a4f2c9b8f73eb963c77ad160d4802ad7aadc179b066275bcb9d9cfd2';
  const iv = '0123456789abcdef0123456789abcdef';
  const value = this.state.databpm;
  const encryptDataIV = (value, key, iv) => {
  console.log ("mulai");
  return Aes.encrypt(value, key, iv).then((cipher: any) => ({
  cipher,
  iv,
  }))      
  }
  try {
  encryptDataIV(value, key, iv).then(({ cipher }) => {
  console.log ("encrypted : " + cipher);
  axios.post('http://159.89.204.122/input/dj', {
  heart: this.state.encrypt_string,
  })
  .then(function (response) {
    console.log("Data sent");
    Alert.alert('Heart Rate Value tersimpan di Database');
  })
  .catch(function (error) {
    console.log(error);
  });
  this.setState({encrypt_string:cipher});
  }).catch((error: any) => {})
  } catch (e) {
   console.error(e)
  }
  }
  async writeBtn1(){
    const id = "3C:71:BF:74:8D:2E"
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
      <View style={{flex: 1}} >
        <View style={{flex: 0.3, backgroundColor: 'powderblue'}}> 
        <Icon name='fitness-outline' size={75}>
        <Text style={{ fontSize: 25, marginBottom: 20, textAlign: 'center', fontFamily: 'mbold'}}>Heart Rate</Text> </Icon>
        </View>
        <View style={{flexDirection:'row', margin : 30}}>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn1}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Send Data via BLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={() => this.props.navigation.navigate('SetWifiHeartScreen')}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Send Data via Wi-Fi</Text>
        </TouchableOpacity>
        </View>
        <View style={{ margin: 20}}> 
        <TouchableOpacity style={styles.style2ni} onPress={this.notifBtn}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Get Data from BLE</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.style3ni}>
        <Text style={{fontSize: 20, fontFamily : 'mmedium'}}>
            {this.state.tulisan}
        </Text>
        </View>
        <View style={styles.style3ni}>
        <Text style={{fontSize: 40, fontFamily : 'mmedium'}}>
            {this.state.databpm} bpm
        </Text>
        </View>
        <View style={styles.style3ni}>
        <Text style={{fontSize: 20, fontFamily : 'mbold'}}>
            {this.state.keterangan}
        </Text>
        </View>
        <Text style={{fontSize: 20, fontFamily : 'mmedium'}}>
            {this.state.nilaijantung}
        </Text>
        <TouchableOpacity style={styles.connectBtn} onPress={this.postkeAPI}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Save Heart Rate Value to Server</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.getdrAPI}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Get Heart Rate Value from Server</Text>
        </TouchableOpacity>
      </View>
      );
  }
  
};

const styles = StyleSheet.create({
  connectBtn: {
    alignSelf: "center",
    borderWidth : 1,
    borderColor : 'skyblue',
    margin: 5
  },
  style2ni: {
    alignSelf: "center",
    borderWidth : 1,
    margin: 5
  },
  style3ni: {
    alignSelf: "center",
    margin: 5
  }
});
