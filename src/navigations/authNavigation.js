import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import RegisterShop from '../screens/RegisterShop';
import MapScreen from '../screens/MapScreen';
const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
      <Stack.Navigator
        initialRouteName="RegisterShop"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
        <Stack.Screen name="RegisterShop" component={RegisterShop} />
        <Stack.Screen name="Maps" component={MapScreen} />
      </Stack.Navigator>
  );
}
