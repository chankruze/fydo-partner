import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

export default class FeedbackScreen extends Component{

    render(){
        return (
            <ScrollView style={styles.container}>
                <Text>FeedbackScreen</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    }
})