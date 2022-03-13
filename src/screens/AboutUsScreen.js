import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

export default class AboutUsScreen extends Component{
    render(){
        return (
            <ScrollView style={styles.container}>
                <Text>AboutUsScreen</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})