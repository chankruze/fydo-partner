import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ChooseLanguage from '../screens/ChooseLanguage';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="PhoneLogin"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
      <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
      <Stack.Screen name="Language" component={ChooseLanguage} />
    </Stack.Navigator>
  );
}
