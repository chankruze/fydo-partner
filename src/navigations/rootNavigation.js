import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './mainNavigation';
import SettingScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator();

function RootNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={MainNavigation} />
          <Stack.Screen 
            name="Settings" 
              component={SettingScreen}
              options={{headerShown: true}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default RootNavigation;