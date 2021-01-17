import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabScreen from '../TabScreen';
import HomeScreen from '../HomeScreen';
import InformationScreen from '../InformationScreen';
import QRScan from '../QRScan';
import WeightScreen from '../WeightScreen';
import HeartScreen from '../HeartScreen';
import SplashScreen from '../SplashScreen';
import TempScreen from '../TempScreen';
import SetWifiTempScreen from '../SetWifiTempScreen';
import SetWifiHeartScreen from '../SetWifiHeartScreen';
import SetWifiWeightScreen from '../SetWifiWeightScreen';
import BMIScreen from '../BMIScreen';

const Stack = createStackNavigator();

const StackScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
            />
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
                name="BMIScreen"
                component={BMIScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SetWifiTempScreen"
                component={SetWifiTempScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SetWifiHeartScreen"
                component={SetWifiHeartScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SetWifiWeightScreen"
                component={SetWifiWeightScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default StackScreen;