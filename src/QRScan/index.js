import React, {useState} from 'react';
import { Platform, PermissionsAndroid, View } from 'react-native';
import BleManager from 'react-native-ble-manager';
import QRCodeScanner from 'react-native-qrcode-scanner';
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
                onRead={(e)=> {
                    mac = e.data
                    BleManager.connect(mac).then(()=> {
                        console.log('Connected.')
                        BleManager.retrieveServices(mac).then((peripheralInfo) => {
                            switch(peripheralInfo.characteristics.[4].service) {
                                case '180d':
                                  navigation.navigate('HeartScreen');
                                  break;
                                case '181d':
                                  navigation.navigate('TempScreen');
                                  break;
                                case '182d':
                                    navigation.navigate('WeightScreen');
                                    break;
                                default:
                                    break;
                            }
                        });
                    })
                }}
            />
        </View>
    )
}

export default QRScan;