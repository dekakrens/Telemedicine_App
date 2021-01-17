import React from 'react';
import { View, Text } from 'react-native';
import { NativeModules, Platform } from 'react-native'
var Aes = NativeModules.Aes
import styles from '../Styles';

const InformationScreen = () => {

    return(
        <View>
            <Text style={styles.buttonText}>Aplikasi Android ini masih dalam tahap pengembangan dan dirancang dalam rangka pengerjaan Tugas Akhir untuk 
            memenuhi syarat kelulusan di Program Strata 1 Teknik Telekomunikasi oleh Dhea Dearly</Text>
            <Text style={styles.buttonText}>Mohon kritik dan saran agar aplikasi bisa lebih baik lagi</Text>
        </View>
    )
}

export default InformationScreen;