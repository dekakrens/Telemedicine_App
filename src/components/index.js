import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles';
import Icon from 'react-native-vector-icons/Ionicons';

const card = (props) => {
    return(
        <View style={styles.card}>
            <View style={styles.cardIcon}>
                <Icon name={props.iconName} size={40}/>
                <Text>{props.monitoring}</Text>
            </View>
        </View>
    )
}

export default card;