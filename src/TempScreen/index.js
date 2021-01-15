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
import { useNavigation } from '@react-navigation/native';
import BleManager from "react-native-ble-manager"
import { stringToBytes, bytesToString } from 'convert-string';
import { NativeModules, NativeEventEmitter } from "react-native";
 
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


export default class TempScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
          dataesp: '',
  }
   
    this.writeBtn1 = this.writeBtn1.bind(this);
    this.notifBtn = this.notifBtn.bind(this);
  }

  async notifBtn() {
    const id = "10:52:1C:68:14:E2"
    const characteristicID = 'a8e6a804-216b-4dd8-90ff-a230226b42c1'
    const serviceID = '182D'
    await BleManager.startNotification(id, serviceID, 'a8e6a804-216b-4dd8-90ff-a230226b42c1');
  // Add event listener
    bleManagerEmitter.addListener(
    "BleManagerDidUpdateValueForCharacteristic",
    ({ value}) => {
      // Convert bytes array to string
      const data = bytesToString(value);
      console.log('Received ' +data);
    }
  );
  // Actions triggereng BleManagerDidUpdateValueForCharacteristic event
}
  async writeBtn1(){
    const id = "10:52:1C:68:14:E2"
    const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
    const serviceID = '182D'
    
    const data = stringToBytes('1');
    console.log(data)

    BleManager.retrieveServices(id).then((peripheralInfo) => {
      setTimeout(() => {
        BleManager.write(id, serviceID, characteristicID, data).then(() => {
          console.log("Success Write");
          
        }).catch((e) => {
          console.log(e)
        });

      }, 500);
    });

  }
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

  render(){
    const { navigation } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn1}>
          <Text style={{fontSize: 40}}>Send Data via BLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn}  onPress={() => this.props.navigation.navigate('SetWifiSuhu')}>
          <Text style={{fontSize: 40}}>Send Data via WiFi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.notifBtn}>
          <Text style={{fontSize: 40}}>Get Data from BLE</Text>
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
    marginTop: "20%",
    
  }
});
