
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, 
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import BleManager from "react-native-ble-manager"
import React, { useEffect, useState } from 'react';
import { stringToBytes, bytesToString } from 'convert-string';
import { NativeModules, NativeEventEmitter } from "react-native";
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import axios from 'axios';
var Aes = NativeModules.Aes;

export default class WeightScreen extends React.Component {
  constructor(props){
    
    super(props)
        this.state = {
          heart:[],
          dataesp: '',
  }
    
    this.writeBtn1 = this.writeBtn1.bind(this);
    this.writeBtn2 = this.writeBtn2.bind(this);
    this.notifBtn = this.notifBtn.bind(this);
    this.stopNotif = this.stopNotif.bind(this);
    this.postkeAPI = this.postkeAPI.bind(this);
    this.getdrAPI = this.getdrAPI.bind(this);
    this.encryptAES = this.encryptAES.bind(this);
    this.decryptAES = this.decryptAES.bind(this);
  }
    
  async stopNotif (){
    BleManager.stopNotification('10:52:1C:68:14:E2','182d','1006');
    BleManager.stopNotification('10:52:1C:68:14:E2','182d','1141');
  }
  async postkeAPI (){
    axios.post('http://159.89.204.122/input/dj', {
    Heart_Rate: '80 bpm',
  })
  .then(function (response) {
    console.log("Data sent");
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  async decryptAES () {
    const key = '591825e3a4f2c9b8f73eb963c77ad160d4802ad7aadc179b066275bcb9d9cfd2';
    const iv = '0123456789abcdef0123456789abcdef';
    const cipher = encrypt_string;

    try {
      var decrypt_string = await decryptData({ cipher, iv }, key);

      console.log ("plain text : " + decrypt_string);
    } catch (e) {
        console.error(e)
    }
  }
  async encryptAES () {
    const key = '591825e3a4f2c9b8f73eb963c77ad160d4802ad7aadc179b066275bcb9d9cfd2';
    const iv = '0123456789abcdef0123456789abcdef';
    const value = '40';
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
      }).catch((error: any) => {})
    } catch (e) {
        console.error(e)
    }
  }
  async getdrAPI (){
    axios.get('http://159.89.204.122/info/dj')
    .then(function (response) {
      const heart = response.data.webserver1[0].Heart_Rate;
      // setTitle(response.data.title);
      
      // handle success
      // console.log(response);
      console.log(heart);
    })
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
  
  async notifBtn() {
    const id = "10:52:1C:68:14:E2"
    const characteristicID = 'a8e6a804-216b-4dd8-90ff-a230226b42c1'
    const serviceID = '182d'
  await BleManager.startNotification(id, serviceID, 'a8e6a804-216b-4dd8-90ff-a230226b42c1');
  // Add event listener
  bleManagerEmitter.addListener(
    "BleManagerDidUpdateValueForCharacteristic",
    ({ value}) => {
      // Convert bytes array to string
      const data = bytesToString(value);
      this.setState({dataesp: data});
      console.log('Received ' +data);
      
    }
  );
  // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
}
// async hasilNotif() {
//   const id = "10:52:1C:68:14:E2"
//     const characteristicID = '1141'
//     const serviceID = '182d'
//   await BleManager.startNotification(id, serviceID, '1141');
//   // Add event listener
//   bleManagerEmitter.addListener(
//     "BleManagerDidUpdateValueForCharacteristic",
//     ({ value}) => {
//       // Convert bytes array to string
//       const datahasil = bytesToString(value);
//       this.setState({analyzeesp: datahasil});
//       console.log('Received ' +datahasil);
      
//     }
//   );
  // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
  

  async writeBtn1(){
    const id = "10:52:1C:68:14:E2"
    const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
    const serviceID = '182d'
    
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
  async writeBtn2(){
    const id = "10:52:1C:68:14:E2"
    const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
    const serviceID = '182d'
    
    

    const data = stringToBytes('2');
    console.log(data)

    BleManager.retrieveServices(id).then((peripheralInfo) => {
      //console.log(peripheralInfo);

      setTimeout(() => {
        BleManager.startNotification(id, serviceID, characteristicID).then(() => {
          console.log('Started notification on ' + id);
          setTimeout(() => {
            BleManager.write(id, serviceID, characteristicID, data).then(() => {
              console.log("Success Write");
              
              
            }).catch((e) => {
              console.log(e)
            });

          }, 500);
        }).catch((error) => {
          console.log('Notification error', error);
        });
      }, 200);
    });

  }

  render() 
  {
    return (
      <View>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn1}>
          <Text style={{fontSize: 20}}>Write 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn2}>
          <Text style={{fontSize: 20}}>Write 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.notifBtn}>
          <Text style={{fontSize: 20}}>Get data from BLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.stopNotif}>
          <Text style={{fontSize: 20}}>Stop Notif</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.postkeAPI}>
          <Text style={{fontSize: 20}}>Post data to Server</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.getdrAPI}>
          <Text style={{fontSize: 20}}>Get data Server</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.encryptAES}>
          <Text style={{fontSize: 20}}>encrypt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.decryptAES}>
          <Text style={{fontSize: 20}}>decrypt</Text>
        </TouchableOpacity>
            <Text style={styles.connectBtn}>
            {this.state.dataesp}
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
    marginTop: "10%",
    
  }
});
