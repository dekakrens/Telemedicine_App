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


export default class TempScreen extends React.Component {
  constructor(props){
    super(props)
        this.state = {
          datasuhu: '',
          tulisan: '',
          keterangan: '',
          encrypt_string: '',
          nilaisuhu: '',
          hasildekrip:'',
  }

    this.writeBtn1 = this.writeBtn1.bind(this);
    this.notifBtn = this.notifBtn.bind(this);
    this.getdrAPI = this.getdrAPI.bind(this);
    this.postkeAPI = this.postkeAPI.bind(this);
    this.decryptAES = this.decryptAES.bind(this);
  }

  async notifBtn() {
    const id = "3C:71:BF:74:89:C2"
    const characteristicID = 'a8e6a804-216b-4dd8-90ff-a230226b42c1'
    const serviceID = '181a'
  await BleManager.startNotification(id, serviceID, characteristicID);

  bleManagerEmitter.addListener(
    "BleManagerDidUpdateValueForCharacteristic",
    ({ value}) => {
      // Convert bytes array to string
      const data = bytesToString(value);
      this.setState({datasuhu: data});
      this.setState({tulisan: 'Body Temperature Value'});
      this.setState({keterangan: 'Well Done!'});
      console.log('Received ' +data);
    }
  );
  
}
 
async postkeAPI (){
const key = '591825e3a4f2c9b8f73eb963c77ad160d4802ad7aadc179b066275bcb9d9cfd2';
const iv = '0123456789abcdef0123456789abcdef';
const value = this.state.datasuhu;
const encryptDataIV = (value, key, iv) => {
console.log ("mulai enkripsi " + value);
return Aes.encrypt(value, key, iv).then((cipher: any) => ({
cipher,
iv,
}))      
}
try {
encryptDataIV(value, key, iv).then(({ cipher }) => {
console.log ("encrypted : " + cipher);
axios.post('http://159.89.204.122/input/suhu', {
suhu: this.state.encrypt_string,
})
.then(function (response) {
Alert.alert('Body Temperature Value tersimpan di Database');
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
   async decryptAES () {
   const key = '591825e3a4f2c9b8f73eb963c77ad160d4802ad7aadc179b066275bcb9d9cfd2';
     const iv = '0123456789abcdef0123456789abcdef';
     const cipher = this.state.nilaisuhu;
     const decryptData = (encryptedData: { cipher: any; iv: any; }, key: any) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

     try {
      console.log ("mulai dekrip " + cipher);
      var decrypt_string = await decryptData({ cipher, iv }, key);
       console.log ("plain text : " + decrypt_string);
       this.setState({hasildekrip: decrypt_string });
     } catch (e) {
         console.error(e)
    }
   }
  async writeBtn1(){
    const id = "3C:71:BF:74:89:C2"
    const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
    const serviceID = '181a'
    
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

     async getdrAPI (){
     axios.get('http://159.89.204.122/info/ambilsuhu')
    .then(response => 
    this.setState({nilaisuhu: response.data.webserver1[0].suhu}))
    .catch(err => console.log(err))
     };
    
  
  render(){
    return (
      <View style={{flex: 1}} >
        <View style={{flex: 0.4, backgroundColor: 'powderblue'}}> 
        <Icon name='thermometer-outline' size={75}>
        <Text style={{ fontSize: 25, marginBottom: 20, textAlign: 'center', fontFamily: 'mbold'}}>Body Temperature</Text> </Icon>
        </View>
        <View style={{flexDirection:'row', margin : 20}}>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn1}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Send Data via BLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={() => this.props.navigation.navigate('SetWifiTempScreen')}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Send Data via Wi-Fi</Text>
        </TouchableOpacity>
        </View >
        <View style={{flexDirection:'row', margin : 20}}>
        <TouchableOpacity style={styles.connectBtn} onPress={this.notifBtn}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Get Data from BLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.getdrAPI}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Get Data from Wifi</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.style3ni}>
        <Text style={{fontSize: 20, fontFamily : 'mmedium'}}>
            {this.state.tulisan}
        </Text>
        </View>
        <View style={styles.style3ni}>
        <Text style={{fontSize: 40, fontFamily : 'mmedium'}}>
            {this.state.datasuhu} °Celcius
        </Text>
        </View>
        <View style={styles.style3ni}>
        <Text style={{fontSize: 20, fontFamily : 'mbold'}}>
            {this.state.keterangan}
        </Text>
        </View>
        <TouchableOpacity style={styles.connectBtn} onPress={this.postkeAPI}>
          <Text style={{fontSize: 15, fontFamily : 'mmedium'}}>Save Body Temperature Value to Server</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.style4ni} onPress={this.decryptAES}>
          <Text style={{fontSize: 15, fontFamily : 'mbold'}}>Show Body Temperature from Server</Text>
        </TouchableOpacity>
        <View style={styles.style3ni}>
        <Text style={{fontSize: 40, fontFamily : 'mmedium'}}>
            {this.state.hasildekrip} °Celcius
        </Text>
        </View>
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
  },
  style4ni: {
    alignSelf: "center",
    borderWidth : 2,
    borderColor : 'red',
    margin: 5
  }
});