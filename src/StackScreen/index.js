import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabScreen from '../TabScreen';
import HomeScreen from '../HomeScreen';
import ChatScreen from '../ChatScreen';
import QRScan from '../QRScan';

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
                name="ChatScreen"
                component={ChatScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="QRScan"
                component={QRScan}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default StackScreen;