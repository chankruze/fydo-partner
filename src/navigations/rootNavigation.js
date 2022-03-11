import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './mainNavigation';
import SettingScreen from '../screens/SettingScreen';
import { PRIMARY } from '../assets/colors';
import FAQScreen from '../screens/FAQScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SupportServiceScreen from '../screens/SupportServiceScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

const Stack = createNativeStackNavigator();

function RootNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen 
            name="Main" 
            component={MainNavigation}
            options={{headerShown: false}} />
          <Stack.Screen 
            name="Settings" 
              component={SettingScreen}
              options={{
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: PRIMARY,
                }
              }}/>
          <Stack.Screen
            name='FAQ'
            component={FAQScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: PRIMARY,
              }
            }}
          />
          <Stack.Screen
            name='Feedback'
            component={FeedbackScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: PRIMARY,
              }
            }}
          />
          <Stack.Screen
            name='SupportService'
            component={SupportServiceScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: PRIMARY,
              }
            }}
          />
          <Stack.Screen
            name='AboutUs'
            component={AboutUsScreen}
            options={{
              title: 'About Us',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: PRIMARY,
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default RootNavigation;