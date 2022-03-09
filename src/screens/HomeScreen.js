import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class HomeScreen extends Component{

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <Text>HomeScreen</Text>
                <TouchableOpacity style={styles.fab}>
                    <MaterialIcons 
                        name='add-circle-outline'
                        size={26}
                        color={'white'}/>
                </TouchableOpacity>
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
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})  
