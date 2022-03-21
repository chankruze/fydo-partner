import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, Image, Modal, View, Pressable} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiveOffersScreen from './myoffers/LiveOffersScreen';
import RequestedOffersScreen from './myoffers/ReqestedOffersScreen';
import { PRIMARY } from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyOffersBottomSheet from '../components/myoffers/MyOffersBottomSheet';
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class MyOffersScreen extends Component{

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
                    name="LiveOffers" 
                    component={LiveOffersScreen}
                    options={{
                        tabBarLabel: 'LIVE OFFERS'
                    }} 
                />
                <Tab.Screen 
                    name="RequestedOffers" 
                    component={RequestedOffersScreen} 
                    options={{
                        tabBarLabel: 'REQUESTED OFFERS'
                    }}
                />
            </Tab.Navigator>
        )
    }

    renderModal(){
        let {user} = this.props;
        return (
            <Modal 
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this.triggerModal}
                >
                <Pressable 
                    activeOpacity={1}
                    style={styles.modalContainer}
                    onPress={this.triggerModal}>

                    <MyOffersBottomSheet 
                        token={user?.accessToken}
                        toggle={this.triggerModal}/>
                </Pressable>
            </Modal>
        )
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar 
                    backgroundColor={PRIMARY}
                    barStyle="light-content" 
                />
                <TouchableOpacity
                    onPress={this.triggerModal} 
                    style={styles.fab}>
                    <MaterialIcons 
                        size={26}
                        color='white'
                        name='add'
                    />
                </TouchableOpacity>
                {this.renderTabs()}
                {this.state.modalVisible && this.renderModal()}
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(MyOffersScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        zIndex: 10
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        height: '100%'
    },
})