import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components';
import styles from '../Styles';

const HomeScreen = ()=> {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Card
                iconName='fitness-outline'
                monitoring='HRM'
            />
            <Card
                iconName='thermometer-outline'
                monitoring='Temp'
            />
            <Card
                iconName='speedometer-outline'
                monitoring='Weight'
            />
            <Card
                iconName='cafe-outline'
                monitoring='Water'
            />

            <TouchableOpacity style={styles.iconConnect} onPress={() => navigation.navigate('QRScan')}>
                <Icon name='bluetooth-outline' size={30} color={'#fff'}/>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen;