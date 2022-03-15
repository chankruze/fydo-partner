import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default class NotificationScreen extends Component{

    constructor(){
        super();
        this.state = {
            notifications: []
        }
    }

    render(){
        let {notifications} = this.state;

        if(notifications.length == 0){
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.info}>We have no item to show here</Text>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <Text>NotificationScreen</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    info: {
        alignSelf: 'center',
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: .2
    }
})