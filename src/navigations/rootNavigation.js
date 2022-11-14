import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './mainNavigation';
import SettingScreen from '../screens/SettingScreen';
import { PRIMARY, WHITE } from '../assets/colors';
import FAQScreen from '../screens/FAQScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SupportServiceScreen from '../screens/SupportServiceScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import MyOffersScreen from '../screens/MyOffersScreen';
import ReferAndEarnScreen from '../screens/ReferAndEarnScreen';
import RegisterShop from '../screens/shop/RegisterShop';
import MapScreen from '../screens/MapScreen';
import ShopDetails from '../screens/shop/ShopDetails';
import MyShop from '../screens/shop/MyShop';
import ShopTiming from '../screens/shop/ShopTiming'
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { textScale } from '../utils/responsiveSize';
import MySalesScreen from '../screens/MySalesScreen';
import ReferralHistoryScreen from '../screens/ReferralHistoryScreen';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      {/* <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Auth">
          <Stack.Screen name="Main" component={MainNavigation} />
          <Stack.Screen name="Auth" component={AuthNavigation} />
          <Stack.Navigator/> */}
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen options={{ headerShown: false }} name="RegisterShop" component={RegisterShop} />
        <Stack.Screen options={{ headerShown: false }} name="Maps" component={MapScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ShopDetails" component={ShopDetails} />
        <Stack.Screen options={{ headerShown: false }} name="MyShop" component={MyShop} />
        <Stack.Screen options={{ headerShown: false }} name="ShopTiming" component={ShopTiming} />
        <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name="OnBoarding" component={OnboardingScreen} />
        {/* <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{ headerShown: false}}
        /> */}
        <Stack.Screen
          name="Main"
          component={MainNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerShown: true,
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQScreen}
          options={{
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
        {/* <Stack.Screen
          name="SupportService"
          component={SupportServiceScreen}
          options={{
            headerTintColor: WHITE,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: textScale(15),
              //fontWeight:'bold'
            },
            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: PRIMARY,
            },
            
          }}
        /> */}
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{
            title: 'About Us',
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
        <Stack.Screen
          name="MyOffers"
          component={MyOffersScreen}
          options={{
            title: 'My Offers',
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
        {/* <Stack.Screen
          name="MySales"
          component={MySalesScreen}
          options={{
            title: 'My Sales',
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        /> */}
        <Stack.Screen
          name="ReferralHistory"
          component={ReferralHistoryScreen}
          options={{
            title: 'Referral History',
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
        <Stack.Screen
          name="Support"
          component={SupportServiceScreen}
          options={{
            title: 'Support and service',
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
        <Stack.Screen
          name="ReferEarn"
          component={ReferAndEarnScreen}
          options={{
            title: 'Refer and earn',
            headerTintColor: WHITE,
            headerStyle: {
              backgroundColor: PRIMARY,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
