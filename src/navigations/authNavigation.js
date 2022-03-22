import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';
import OTPVerifyScreen from '../screens/OTPVerifyScreen';
import RegisterShop from '../screens/shop/RegisterShop';
import MapScreen from '../screens/MapScreen';
import ShopDetails from '../screens/shop/ShopDetails';
import ChooseLanguage from '../screens/ChooseLanguage';
import MyShop from '../screens/shop/MyShop';
import ShopTiming from '../screens/shop/ShopTiming'

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
      <Stack.Navigator
        initialRouteName="RegisterShop"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
        <Stack.Screen name="Language" component={ChooseLanguage} />
      </Stack.Navigator>
  );
}
