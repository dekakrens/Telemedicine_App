import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabScreen from '../TabScreen';
import HomeScreen from '../HomeScreen';
import InformationScreen from '../InformationScreen';
import QRScan from '../QRScan';
import WeightScreen from '../WeightScreen';
import HeartScreen from '../HeartScreen';
import TempScreen from '../TempScreen';
import WiFiBTScreen from '../WiFiBTScreen';
import SetWifiTempScreen from '../SetWifiTempScreen';

const Stack = createStackNavigator();

const StackScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="TabScreen"
                component={TabScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="InformationScreen"
                component={InformationScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="QRScan"
                component={QRScan}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="WeightScreen"
                component={WeightScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="HeartScreen"
                component={HeartScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="TempScreen"
                component={TempScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="WiFiBTScreen"
                component={WiFiBTScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SetWifiTempScreen"
                component={SetWifiTempScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default StackScreen;