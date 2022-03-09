import React from 'react';
import {TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY } from '../assets/colors';

const Tab = createBottomTabNavigator();

export default function MainNavigation(){

  const navigateToSetting = (navigation) => {
    navigation.navigate('Settings');
  }

    return (
        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={(({navigation}) => (
              {
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons 
                    name="home"
                    size={20}/>
                ),
                tabBarStyle: {
                  paddingBottom: 5
                },
                headerTintColor: PRIMARY,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={navigateToSetting.bind(this, navigation)}>
                    <MaterialIcons 
                      name='settings'
                      size={22}
                      color={PRIMARY}/>
                  </TouchableOpacity>
                ),
                headerRightContainerStyle: {
                  paddingRight: 10
                }
              }
            ))} />
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