import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiveOffersScreen from './myoffers/LiveOffersScreen';
import RequestedOffersScreen from './myoffers/ReqestedOffersScreen';
import { PRIMARY } from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();

export default class MyOffersScreen extends Component{

    
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar 
                    backgroundColor={PRIMARY}
                    barStyle="light-content" 
                />
                <TouchableOpacity style={styles.fab}>
                    <MaterialIcons 
                        size={26}
                        color='white'
                        name='add'
                    />
                </TouchableOpacity>
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
                        }} />
                    <Tab.Screen 
                        name="RequestedOffers" 
                        component={RequestedOffersScreen} 
                        options={{
                            tabBarLabel: 'REQUESTED OFFERS'
                        }}/>
                </Tab.Navigator>
            </SafeAreaView>
        )
    }
}

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
    }
})