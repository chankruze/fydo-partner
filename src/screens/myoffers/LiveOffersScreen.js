import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default class LiveOffersScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            offers: []
        }
    }

    render(){

        let {offers} = this.state;

        if(offers.length == 0)
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.info}>
                        We have no item to show here
                    </Text>
                </SafeAreaView>
            )

        return (
            <SafeAreaView style={styles.container}>
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    info: {
        alignSelf: 'center',
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: .2
    }
})