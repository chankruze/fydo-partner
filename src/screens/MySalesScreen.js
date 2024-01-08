import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {PRIMARY, WHITE} from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';
import {moderateScale} from '../utils/responsiveSize';
import LiveOffersScreen from './myoffers/LiveOffersScreen';
import RequestedOffersScreen from './myoffers/ReqestedOffersScreen';

const Tab = createMaterialTopTabNavigator();

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

class MySalesScreen extends Component {
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
          name="LiveSales"
          component={LiveOffersScreen}
          options={{
            tabBarLabel: 'LIVE SALES',
          }}
        />
        <Tab.Screen
          name="RequestedSales"
          component={RequestedOffersScreen}
          options={{
            tabBarLabel: 'REQUESTED SALES',
          }}
        />
      </Tab.Navigator>
    );
  }
  render() {
    return this.renderTabs();
  }
}

export default connect(mapStateToProps)(WithNetInfo(MySalesScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    //height: '100%'
  },
  fab: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
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
