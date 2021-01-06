import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackScreen from './src/StackScreen';

const App = () => {
    return(
        <NavigationContainer>
            <StackScreen/>
        </NavigationContainer>
    )
}

export default App;