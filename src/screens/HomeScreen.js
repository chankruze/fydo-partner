import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default class HomeScreen extends Component{

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <Text>HomeScreen</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
})