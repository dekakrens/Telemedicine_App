import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../HomeScreen';
import InformationScreen from '../InformationScreen';

const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => {
    return(
        <Tab.Navigator
            initialRouteName='Home'
            activeColor='#fff'
            style={{backgroundColor: '#adeecf'}}
            shifting={true}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({color}) => (
                        <Icon name='home-sharp' color={color} size={26}/>
                    )
                }}
            />
            <Tab.Screen
                name='Information'
                component={InformationScreen}
                options={{
                    tabBarLabel: 'Information',
                    tabBarIcon: ({color}) => (
                        <Icon name='information-circle-outline' color={color} size={26}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabScreen;