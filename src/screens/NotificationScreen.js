import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default class NotificationScreen extends Component{

    render(){
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
    }
})