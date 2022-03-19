import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { useHeaderHeight } from '@react-navigation/elements';
import NotificationScreen from '../screens/NotificationScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY } from '../assets/colors';

const Tab = createBottomTabNavigator();

export default function MainNavigation(){

  const headerHeight = useHeaderHeight();

  const navigateToSetting = (navigation) => {
    navigation.navigate('Settings');
  }

    return (
        <Tab.Navigator
          // initialRouteName='Notification'
          screenOptions={{
            tabBarActiveTintColor: PRIMARY,
            tabBarInactiveTintColor: 'lightgrey'
          }}>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={(({navigation}) => (
              {
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons 
                    name="home"
                    size={20}
                    color={PRIMARY}
                  />
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
              headerShown: true,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons 
                  name="notifications"
                  size={20}
                  color={PRIMARY}/>
              ),
              tabBarStyle: {
                paddingBottom: 5
              },
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: PRIMARY,
              },
              header: () => {
                return (
                  <View style={Object.assign({...styles.header}, {height: headerHeight})}></View>
                )
              }
            }} />
        </Tab.Navigator>
      );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: PRIMARY,
    width: '100%'
  }
})