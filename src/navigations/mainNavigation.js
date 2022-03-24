import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { useHeaderHeight } from '@react-navigation/elements';
import NotificationScreen from '../screens/NotificationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PRIMARY } from '../assets/colors';

const Tab = createBottomTabNavigator();

export default function MainNavigation(){

  const headerHeight = useHeaderHeight();

  const navigateToSetting = (navigation) => {
    navigation.navigate('Settings');
  }

    return (
        <Tab.Navigator
          // initialRouteName='MyOfferss'
          screenOptions={{
            tabBarActiveTintColor: PRIMARY,
            tabBarInactiveTintColor: 'lightgrey',
            tabBarShowLabel: false,
          }}>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={(({navigation}) => (
              {
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons 
                    name={focused ? "home": "home-outline"}
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
                    <Ionicons 
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
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons 
                  name={focused ? "notifications": "notifications-outline"}
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
              // headerTitle: (props) => (
              //   <View style={styles.titleContainer}>
              //     <Text style={styles.title}>Notifications</Text>
              //     <Text style={styles.label}>1 New Notification</Text>
              //   </View>
              // )
            }} />
        </Tab.Navigator>
      );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: PRIMARY,
    width: '100%'
  },
  titleContainer: {

  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: .5
  },
  label: {
    marginTop: 3,
    color: 'white',
    fontSize: 10,
    letterSpacing: .5
  }
})