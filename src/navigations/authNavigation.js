import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import RegisterShop from '../screens/shop/RegisterShop';
import MapScreen from '../screens/MapScreen';
import ShopDetails from '../screens/shop/ShopDetails';
import ChooseLanguage from '../screens/ChooseLanguage';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
      <Stack.Navigator
        initialRouteName="PhoneLogin"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
        <Stack.Screen name="RegisterShop" component={RegisterShop} />
        <Stack.Screen name="Maps" component={MapScreen} />
        <Stack.Screen name="ShopDetails" component={ShopDetails} />
        <Stack.Screen name="Language" component={ChooseLanguage} />
      </Stack.Navigator>
  );
}
