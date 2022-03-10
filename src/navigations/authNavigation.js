import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import RegisterShop from '../screens/RegisterShop';
const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
      <Stack.Navigator
        initialRouteName="PhoneLogin"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
        <Stack.Screen name="RegisterShop" component={RegisterShop} />
      </Stack.Navigator>
  );
}
