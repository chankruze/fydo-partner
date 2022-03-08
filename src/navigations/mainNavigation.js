import React from 'react';
import {TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function MainNavigation(){
    return (
        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons 
                  name="home"
                  size={20}/>
              ),
              tabBarStyle: {
                paddingBottom: 5
              }, 
              headerRight: () => (
                <TouchableOpacity>
                  <MaterialIcons 
                    name='settings'
                    size={22}/>
                </TouchableOpacity>
              ),
              headerRightContainerStyle: {
                paddingRight: 10
              }
            }} />
          <Tab.Screen 
            name="Notification" 
            component={NotificationScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons 
                  name="notifications"
                  size={20}/>
              ),
              tabBarStyle: {
                paddingBottom: 5
              }
            }} />
        </Tab.Navigator>
      );
}