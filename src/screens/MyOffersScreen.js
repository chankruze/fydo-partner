import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {PRIMARY, WHITE} from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';
import LiveOffersScreen from './myoffers/LiveOffersScreen';
import RequestedOffersScreen from './myoffers/ReqestedOffersScreen';

const Tab = createMaterialTopTabNavigator();

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

const MyOffersScreen = ({user}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const triggerModal = () => setIsModalVisible(prev => !prev);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
      <Tab.Navigator
        // initialRouteName="RequestedOffers"
        screenOptions={{
          tabBarActiveTintColor: PRIMARY,
          tabBarLabelStyle: {
            fontWeight: 'bold',
            letterSpacing: 0.2,
          },
          tabBarIndicatorStyle: {
            backgroundColor: PRIMARY,
          },
        }}>
        <Tab.Screen
          name="LiveOffers"
          component={LiveOffersScreen}
          options={{
            tabBarLabel: 'Live Offers',
          }}
        />
        <Tab.Screen
          name="RequestedOffers"
          component={RequestedOffersScreen}
          options={{
            tabBarLabel: 'Requested Offers',
          }}
        />
      </Tab.Navigator>
      {/* if modal is visible */}
      {/* {isModalVisible ? (
        <Modal
          statusBarTranslucent
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={triggerModal}>
          <Pressable
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={triggerModal}>
            <MyOffersBottomSheet
              token={user?.accessToken}
              toggle={triggerModal}
            />
          </Pressable>
        </Modal>
      ) : null}
      <TouchableOpacity onPress={triggerModal} style={styles.fab}>
        <MaterialIcons size={24} color="white" name="add" />
      </TouchableOpacity> */}
    </View>
  );
};

export default connect(mapStateToProps)(WithNetInfo(MyOffersScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PRIMARY,
    // position: 'absolute',
    bottom: 20,
    left: 20,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '100%',
  },
});
