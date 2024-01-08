import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {Component} from 'react';
import {Modal, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {PRIMARY, WHITE} from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';
import MyOffersBottomSheet from '../components/myoffers/MyOffersBottomSheet';
import LiveOffersScreen from './myoffers/LiveOffersScreen';
import RequestedOffersScreen from './myoffers/ReqestedOffersScreen';

const Tab = createMaterialTopTabNavigator();

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

class MyOffersScreen extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
    this.triggerModal = this.triggerModal.bind(this);
  }

  triggerModal() {
    this.setState(prevState => {
      return {
        modalVisible: !prevState.modalVisible,
      };
    });
  }

  renderTabs() {
    return (
      <Tab.Navigator
        // initialRouteName='RequestedOffers'
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
            tabBarLabel: 'LIVE OFFERS',
          }}
        />
        <Tab.Screen
          name="RequestedOffers"
          component={RequestedOffersScreen}
          options={{
            tabBarLabel: 'REQUESTED OFFERS',
          }}
        />
      </Tab.Navigator>
    );
  }

  renderModal() {
    let {user} = this.props;
    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.triggerModal}>
        <Pressable
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={this.triggerModal}>
          <MyOffersBottomSheet
            token={user?.accessToken}
            toggle={this.triggerModal}
          />
        </Pressable>
      </Modal>
    );
  }

  render() {
    return (
      // <SafeAreaView style={styles.container}>
      // </SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        {/* <TouchableOpacity
                    onPress={this.triggerModal}
                    style={styles.fab}>
                    <MaterialIcons
                        size={26}
                        color='white'
                        name='add'
                    />
                </TouchableOpacity> */}
        {this.renderTabs()}
        {/* {this.state.modalVisible && this.renderModal()} */}
      </View>
    );
  }
}

export default connect(mapStateToProps)(WithNetInfo(MyOffersScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '100%',
  },
});
