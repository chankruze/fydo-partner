import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

export default class FAQScreen extends Component{
    render(){
        return (
            <ScrollView style={styles.container}>
                <Text>FAQScreen</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})