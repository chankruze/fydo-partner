import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, Image, Modal, View, Pressable} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiveOffersScreen from './myoffers/LiveOffersScreen';
import RequestedOffersScreen from './myoffers/ReqestedOffersScreen';
import { PRIMARY, WHITE } from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyOffersBottomSheet from '../components/myoffers/MyOffersBottomSheet';
import { connect } from 'react-redux';
import { moderateScale } from '../utils/responsiveSize';
import WithNetInfo from '../components/hoc/withNetInfo';

const Tab = createMaterialTopTabNavigator();

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class MySalesScreen extends Component{

    constructor(){
        super();
        this.state = {
            modalVisible: false
        }
        this.triggerModal = this.triggerModal.bind(this);
    }

    triggerModal() {
        this.setState(prevState => {
          return {
            modalVisible: !prevState.modalVisible
          }
        });
     }

    renderTabs(){
        return (
            <Tab.Navigator
                // initialRouteName='RequestedOffers'
                screenOptions={{
                    tabBarActiveTintColor: PRIMARY,
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        letterSpacing: .2
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: PRIMARY
                    }
                }}>
                <Tab.Screen 
                    name="LiveSales" 
                    component={LiveOffersScreen}
                    options={{
                        tabBarLabel: 'LIVE SALES'
                    }} 
                />
                <Tab.Screen 
                    name="RequestedSales" 
                    component={RequestedOffersScreen} 
                    options={{
                        tabBarLabel: 'REQUESTED SALES'
                    }}
                />
            </Tab.Navigator>
        )
    }
    render(){
        return (
            this.renderTabs()
        )
    }
}

export default connect(mapStateToProps)(WithNetInfo(MySalesScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:WHITE,
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
        zIndex: 10
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        height: '100%'
    },
})