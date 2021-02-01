import React from 'react';
import { Platform, PermissionsAndroid, View } from 'react-native';
import BleManager from 'react-native-ble-manager';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

BleManager.enableBluetooth();
BleManager.start();

if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if (result) {
            console.log("Permission is OK");
        } else {
            PermissionsAndroid.request(PermissionsAndroid.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("User accept");
                } else {
                    console.log("User refuse");
                }
            });
        }
    });
}

function QRScan () {
    const navigation = useNavigation();
    return(
        <View style={{flex: 1}}>
            <QRCodeScanner
              onRead={(e)=> BleManager.connect(e.data).then(()=> {
                  console.log('Connected')
                //   if (e.data == "24:6F:28:24:BF:1A" ){
                    if (e.data == "10:52:1C:68:14:E2" ){
                      navigation.navigate('WeightScreen')
                  }
                //   if (e.data == "10:52:1C:68:14:E2" ){
                  if (e.data == "24:6F:28:15:87:DA" ){
                      navigation.navigate('HeartScreen')
                  }
                   if (e.data == "3C:71:BF:74:89:C2" ){
                      navigation.navigate('TempScreen')
                  }
              })}
              flashMode={RNCamera.Constants.FlashMode.auto}
            />
        </View>
        )
}

export default QRScan;