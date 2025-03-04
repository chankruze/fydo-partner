import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MapScreen from '../screens/MapScreen';
import RegisterShop from '../screens/shop/RegisterShop';
import ShopDetails from '../screens/shop/ShopDetails';

const Stack = createNativeStackNavigator();

export default function ShopInfoNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="PhoneLogin"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="RegisterShop" component={RegisterShop} />
      <Stack.Screen name="Maps" component={MapScreen} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} />
    </Stack.Navigator>
  );
}
