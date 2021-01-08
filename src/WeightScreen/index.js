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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BleManager from "react-native-ble-manager"
import { stringToBytes } from 'convert-string';


export default class WeightScreen extends React.Component {
  constructor(props){
    super(props)

    this.writeBtn1 = this.writeBtn1.bind(this);
    this.writeBtn2 = this.writeBtn2.bind(this);
  }

  async writeBtn1(){
    const id = '10:52:1C:68:14:E2'
    const characteristicID = '00004f25-0000-1000-8000-00805f9b34fb'
    const serviceID = '181D'
    
    

    const data = stringToBytes('1');
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
  async writeBtn2(){
    const id = '10:52:1C:68:14:E2'
    const characteristicID = '00004f25-0000-1000-8000-00805f9b34fb'
    const serviceID = '181D'
    
    

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

  render(){
    return (
      <View>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn1}>
          <Text style={{fontSize: 40}}>Write 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectBtn} onPress={this.writeBtn2}>
          <Text style={{fontSize: 40}}>Write 2</Text>
        </TouchableOpacity>
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
