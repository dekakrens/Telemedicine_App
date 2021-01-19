import React from 'react';
import { View, Text } from 'react-native';
import { NativeModules, Platform } from 'react-native'
var Aes = NativeModules.Aes
import styles from '../Styles';

const InformationScreen = () => {

    return(
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={{margin: 20, fontSize: 15, fontFamily: 'mbold', flex: 1, marginTop: "70%",height: 50, color:'#1B3D6C', textAlign: 'justify'}}>Aplikasi Android ini masih dalam tahap pengembangan dan dirancang dalam rangka pengerjaan Tugas Akhir untuk 
            memenuhi syarat kelulusan di Program Strata 1 Teknik Telekomunikasi oleh Dhea Dearly. Mohon kritik dan saran agar aplikasi bisa lebih baik lagi.</Text>
        </View>
    )
}

export default InformationScreen;