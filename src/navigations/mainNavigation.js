import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { useHeaderHeight } from '@react-navigation/elements';
import NotificationScreen from '../screens/NotificationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BLACK, PRIMARY, WHITE } from '../assets/colors';
import { connect } from 'react-redux';
import { moderateScaleVertical, textScale } from '../utils/responsiveSize';
import TransactionScreen from '../screens/TransactionScreen';

const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => {
  return {
    language: state?.userReducer?.language,
    user: state?.userReducer?.user,
    myshop: state?.userReducer?.myshop,
  }
}

function MainNavigation({ language, user, myshop }) {

  const headerHeight = useHeaderHeight();

  const navigateToSetting = (navigation) => {
    navigation.navigate('Settings');
  }

  return (
    <Tab.Navigator
      // initialRouteName='MyOfferss'
      screenOptions={{
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: 'black',
        // tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={(({ navigation }) => (
          {
            title: myshop?.name ? myshop.name : 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={20}
                color={PRIMARY}
              />
            ),
            tabBarStyle: {
              // paddingBottom: 5
            },
            headerTintColor: PRIMARY,
            headerTitleStyle: {
              fontSize: textScale(18),
              fontWeight: 'bold',
              fontFamily: 'Gilroy-Bold',
            },
            headerTitleAlign: 'left',
            tabBarLabel: language == 'HINDI' ? 'घर' : 'Home',
            headerRight: () => (
              <TouchableOpacity
                onPress={navigateToSetting.bind(this, navigation)}>
                <Ionicons
                  name='settings'
                  size={22}
                  color={PRIMARY} />
              </TouchableOpacity>
            ),
            headerRightContainerStyle: {
              paddingRight: 10
            }
          }
        ))} />
      <Tab.Screen
        name="Alerts"
        component={NotificationScreen}
        options={{
          tabBarLabel: language == 'HINDI' ? 'अधिसूचना' : 'Alerts',
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={20}
              color={PRIMARY} />
          ),
          tabBarStyle: {
            // paddingBottom: 5
          },
          headerTintColor: WHITE,
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
      <Tab.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{
          tabBarLabel: language == 'HINDI' ? 'अधिसूचना' : 'Transactions',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={20}
              color={PRIMARY} />
          ),
          tabBarStyle: {
            // paddingBottom: 5
          },
          headerTintColor: WHITE,
          headerStyle: {
            backgroundColor: PRIMARY,
            shadowOpacity: 0,
            elevation: 0
          },

        }} />
    </Tab.Navigator>
  );
}

export default connect(mapStateToProps)(MainNavigation);

const styles = StyleSheet.create({
  header: {
    backgroundColor: PRIMARY,
    width: '100%'
  },
  titleContainer: {

  },
  title: {
    fontSize: textScale(18),
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: .5
  },
  label: {
    marginTop: moderateScaleVertical(3),
    color: 'white',
    fontSize: textScale(10),
    letterSpacing: .5
  }
})