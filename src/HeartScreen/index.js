import React from 'react';
import {Alert,View, Text} from 'react-native';

import BleManager from "react-native-ble-manager"
import { stringToBytes, bytesToString } from 'convert-string';
import { NativeModules, NativeEventEmitter } from "react-native";
 
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


const HeartScreen = () => {
    const data = stringToBytes('1');
    BleManager.retrieveServices(mac).then((peripheralInfo)=> {
        service = peripheralInfo.characteristics.[4].service
        bpm = peripheralInfo.characteristics.[4].characteristics
        penyakit = peripheralInfo.characteristics.[5].characteristics
        choose = peripheralInfo.characteristics.[6].characteristics
        console.log(service);
        console.log(peripheralInfo);
    })
    Alert.alert(
        'Connection',
        'Do you want to connect using Bluetooth?',
        [
          {
            text: 'No',
            onPress: () => console.log('Koneksi menggunakan WiFi'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => {
              BleManager.write("24:6F:28:15:87:DA", service, choose, data).then(()=>{
                  console.log('write success');
              })
          } }
        ],
        { cancelable: false }
      )
    return(
        <View>
            <Text>hahahihi</Text>
        </View>
    )
}

export default HeartScreen;
// export default class WeightScreen extends React.Component {
//   constructor(props){
//     super(props)

//     this.writeBtn1 = this.writeBtn1.bind(this);
//     this.writeBtn2 = this.writeBtn2.bind(this);
//     this.notifBtn = this.notifBtn.bind(this);
//   }

//   async notifBtn() {
//     const id = "24:6F:28:15:87:DA"
//     const characteristicID = '1141'
//     const serviceID = '180D'
//   await BleManager.startNotification(id, serviceID, characteristicID);
//   // Add event listener
//   bleManagerEmitter.addListener(
//     "BleManagerDidUpdateValueForCharacteristic",
//     ({ value}) => {
//       // Convert bytes array to string
//       const data = bytesToString(value);
//       console.log('Received ' +data);
//     }
//   );
// }
//   async writeBtn1(){
//     const id = "24:6F:28:15:87:DA"
//     const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
//     const serviceID = '180D'
    
//     const data = stringToBytes('1');
//     console.log(data)

//     BleManager.retrieveServices(id).then((peripheralInfo) => {
//       setTimeout(() => {
//         BleManager.write(id, serviceID, characteristicID, data).then(() => {
//           console.log("Success Write");
          
//         }).catch((e) => {
//           console.log(e)
//         });

//       }, 500);
//     });

//   }
//   async writeBtn2(){
//     const id = "24:6F:28:15:87:DA"
//     const characteristicID = '78604f25-789e-432e-b949-6fb2306fd5d7'
//     const serviceID = '180D'

//     const data = stringToBytes('2');
//     console.log(data)

//     BleManager.retrieveServices(id).then((peripheralInfo) => {
//       //console.log(peripheralInfo);

//       setTimeout(() => {
//         BleManager.startNotification(id, serviceID, characteristicID).then(() => {
//           console.log('Started notification on ' + id);
//           setTimeout(() => {
//             BleManager.write(id, serviceID, characteristicID, data).then(() => {
//               console.log("Success Write");
              
//             }).catch((e) => {
//               console.log(e)
//             });

//           }, 500);
//         }).catch((error) => {
//           console.log('Notification error', error);
//         });
//       }, 200);
//     });

//   }

//   render(){
//     return (
//       <View>
//         <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn1}>
//           <Text style={{fontSize: 40}}>Write 1</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn2}>
//           <Text style={{fontSize: 40}}>Write 2</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.connectBtn} onPress={this.notifBtn}>
//           <Text style={{fontSize: 40}}>Notification</Text>
//         </TouchableOpacity>
//       </View>
//       );
//   }
  
// };

// const styles = StyleSheet.create({
//   connectBtn: {
//     alignSelf: "center",
//     borderColor: "red",
//     borderWidth: 1,
//     marginTop: "20%",
    
//   }
// });
