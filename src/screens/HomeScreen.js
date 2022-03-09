import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Text, StatusBar} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeFab from '../components/home/HomeFab';
import HomeSlider from './../components/home/HomeSlider';
import Entypo from 'react-native-vector-icons/Entypo';
import { PRIMARY } from '../assets/colors';

export default class HomeScreen extends Component{

    render(){
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor={PRIMARY}/>
                <HomeSlider />
                <HomeFab />
                <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}>
                            <Entypo 
                                name='shop' 
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                        <Text style={styles.label}>My Shops</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}>
                            <Entypo 
                                name='shop' 
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'color'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 20
    },
    button: {
        backgroundColor: PRIMARY,
        borderRadius: 25,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    label: {
        marginTop: 5
    }
})  