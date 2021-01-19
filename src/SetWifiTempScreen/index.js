import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native'
import BleManager from "react-native-ble-manager"
import { stringToBytes } from 'convert-string';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
class SetWifiTempScreen extends Component {
   state = {
      ssid: '',
      password: '',
      nilaisuhu: '',
   }
   
   handleSSID = (text) => {
      this.setState({ ssid: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   initwifi = (ssid, password) => {
      Alert.alert('SSID: ' + ssid + ' Password: ' + password)
      const id = "3C:71:BF:74:89:C2"
      const serviceID = '181a'
    
    const dua = stringToBytes('2');
    const datassid = stringToBytes(ssid);
    const datapw = stringToBytes(password);
    console.log(dua)
    console.log(datassid)
    console.log(datapw)

    BleManager.retrieveServices(id).then((peripheralInfo) => {
      setTimeout(() => {
        BleManager.write(id, serviceID, '78604f25-789e-432e-b949-6fb2306fd5d7', dua).then(() => {
          console.log('Success Write 2');
          setTimeout(() => {
            BleManager.write(id, serviceID,'98a8d501-07ab-42a9-94e1-d590839bf71b', datassid).then(() => {
              console.log("Success Write SSID");
              setTimeout(() => {
        BleManager.write(id, serviceID, '2b9310ca-d12c-4940-a436-c33e32be84c7', datapw).then(() => {
          console.log("Success Write Password");
          
        }).catch((e) => {
          console.log(e)
        });

      }, 500);
    });
              
            }).catch((e) => {
              console.log(e)
            });

          }, 500);
        }).catch((error) => {
          console.log(' error', error);
        });
      }, 200);
   }

   // getdatawifinya (){
   //    this.navigation.navigate('TempScreen')
   // }
//   getdatawifinya (){
//    axios.get('http://159.89.204.122/info/dj')
//    .then(response => this.setState({nilaisuhu: response.data.webserver1[1].heart.Heart_Rate}))
//    .catch(err => console.log(err))
//   }
//    // axios({
//    //    method: 'get',
//    //    url: 'http://159.89.204.122/info/dj'
//    //  }).then((response) => {
//    //    this.setState({nilaisuhu: response.data.webserver1[0].heart})
//    //    console.log('Datanya [' + this.state.nilaisuhu + ']')
//    //  }).catch(function(error) {
//    //    console.log(error)
//    //  });
//   }
   //  axios.get('http://159.89.204.122/info/dj')
   //  .then(function (response) {
   //    this.setState({ nilaisuhu: response.data.webserver1[0].heart})
   //    console.log(heart);
      
   //  })
  

   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "SSID"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleSSID}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.initwifi(this.state.ssid, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Send to Temperature Device </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity  onPress={this.getdatawifinya}>
            <Text style={{fontSize: 30}}> Get Temperature Data </Text>
            </TouchableOpacity>
            <Text > {this.state.nilaisuhu} </Text> */}
            
         </View>
      )
   }
}
export default SetWifiTempScreen

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})