import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PhoneLogin"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
