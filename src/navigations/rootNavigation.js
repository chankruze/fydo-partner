import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './mainNavigation';
import AuthNavigation from './authNavigation';

const Stack = createNativeStackNavigator();

function RootNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Auth">
          <Stack.Screen name="Main" component={MainNavigation} />
          <Stack.Screen name="Auth" component={AuthNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default RootNavigation;