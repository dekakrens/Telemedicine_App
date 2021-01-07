import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const card = (props) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.card} onPress={()=> navigation(props.screenName)}>
            <View style={styles.cardIcon}>
                <Icon name={props.iconName} size={40}/>
                <Text>{props.monitoring}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default card;