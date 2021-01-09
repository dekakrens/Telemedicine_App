
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, 
  FlatList,
  TouchableOpacity 
} from 'react-native';
import BleManager from "react-native-ble-manager"
import React, { useEffect, useState } from 'react';
import { stringToBytes, bytesToString } from 'convert-string';
import { NativeModules, NativeEventEmitter } from "react-native";
 
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class WeightScreen extends React.Component {
  constructor(props){
    super(props)
        this.state = {
          dataesp: '',
          analyzeesp: '',
  }

    this.writeBtn1 = this.writeBtn1.bind(this);
    this.hasilNotif = this.hasilNotif.bind(this);
    this.writeBtn2 = this.writeBtn2.bind(this);
    this.notifBtn = this.notifBtn.bind(this);
    this.stopNotif = this.stopNotif.bind(this);
    this.postkeAPI = this.postkeAPI.bind(this);
    this.getdrAPI = this.getdrAPI.bind(this);
  }
    
  async stopNotif (){
    BleManager.stopNotification('10:52:1C:68:14:E2','180D','1006');
    BleManager.stopNotification('10:52:1C:68:14:E2','180D','1141');
  }
  async postkeAPI (){
    try 
    {
      await fetch('http://192.168.1.4:5000/input/bb', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({
    berat: '55',
  })
}); console.log("Data sent");
    }catch(e){
      console.log(e);
    }
  }
  async getdrAPI (){
     try {
    let response = await fetch(
      'http://192.168.1.4:5000/info/bb'
    );
    let json = await response.json();
    const databerat = json.webberat;
    console.log("Received data" +JSON.stringify(databerat));
  } catch (error) {
    console.error(error);
  }
  }
  async notifBtn() {
    const id = "10:52:1C:68:14:E2"
    const characteristicID = '1006'
    const serviceID = '180D'
  await BleManager.startNotification(id, serviceID, '1006');
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
async hasilNotif() {
  const id = "10:52:1C:68:14:E2"
    const characteristicID = '1141'
    const serviceID = '180D'
  await BleManager.startNotification(id, serviceID, '1141');
  // Add event listener
  bleManagerEmitter.addListener(
    "BleManagerDidUpdateValueForCharacteristic",
    ({ value}) => {
      // Convert bytes array to string
      const datahasil = bytesToString(value);
      this.setState({analyzeesp: datahasil});
      console.log('Received ' +datahasil);
      
    }
  );
  // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
  
}
  async writeBtn1(){
    const id = "10:52:1C:68:14:E2"
    const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
    const serviceID = '180D'
    
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
    });

  }
  async writeBtn2(){
    const id = "10:52:1C:68:14:E2"
    const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
    const serviceID = '180D'
    
    

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
        <TouchableOpacity style={styles.connectBtn} onPress={this.hasilNotif}>
          <Text style={{fontSize: 20}}>Analyze Heart Rate</Text>
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
            <Text style={styles.connectBtn}>
            {this.state.dataesp}
             </Text>
            <Text style={styles.connectBtn}>
            {this.state.analyzeesp}
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
