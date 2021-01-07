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
                screenName='HeartScreen'
                iconName='fitness-outline'
                monitoring='HRM'
            />
            <Card
                screenName='TempScreen'
                iconName='thermometer-outline'
                monitoring='Temp'
            />
            <Card
                screenName='WeightScreen'
                iconName='speedometer-outline'
                monitoring='Weight'
            />

            <TouchableOpacity style={styles.iconConnect} onPress={() => navigation.navigate('QRScan')}>
                <Icon name='bluetooth-outline' size={30} color={'#fff'}/>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen;