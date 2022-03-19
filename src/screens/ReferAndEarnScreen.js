import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid} from 'react-native';
import { PRIMARY } from '../assets/colors';
import { refer } from '../services/referearnService';
import ReferEarnImage from './../assets/images/referearn.png';

export default class ReferAndEarnScreen extends Component{
    
    constructor(){
        super();
        this.state = {
            loading: false,
            shopName: null,
            contactNumber: null
        };
        this.onReferClick = this.onReferClick.bind(this);
        this.handleShopName = this.handleShopName.bind(this);
        this.handleContactNumber = this.handleContactNumber.bind(this);
    }

    async onReferClick(){
        let {shopName, contactNumber} = this.state;
        try {
            this.setState({loading: true});
            const data = await refer(shopName, contactNumber);

            setTimeout(() => {
                this.setState({loading: false});
                ToastAndroid.show('Refered', ToastAndroid.SHORT);
            }, 2000)
            console.log(data);
        } catch (error) {
            console.log(error);
            this.setState({loading: false});
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
    }

    handleShopName(value){
        this.setState({shopName: value});
    }

    handleContactNumber(value){
        this.setState({contactNumber: value});
    }

    render(){
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Refer your nearby merchant and earn upto &#8377;100.</Text>
                <Text style={styles.label}>You will receive the reward as soon as the merchant add money to their wallet.</Text>
                <Image
                    source={ReferEarnImage} 
                    style={styles.image}
                />
                <TextInput 
                    style={styles.input}
                    onChangeText={this.handleShopName}
                    placeholder="Shop name"
                    placeholderTextColor="gray"
                />
                <TextInput 
                    style={styles.input}
                    onChangeText={this.handleContactNumber}
                    placeholder="Shop contact number"
                    placeholderTextColor="gray"
                    keyboardType="phone-pad"
                />
                <TouchableOpacity 
                    activeOpacity={.8}
                    onPress={this.onReferClick}
                    style={styles.button}>
                        {this.state.loading && <ActivityIndicator size="small" color="white"/>}
                        {!this.state.loading && <Text style={styles.buttonLabel}>Refer</Text>}
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 25
    },
    title: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        letterSpacing: .3
    },
    label: {
        marginVertical: 10,
        color: 'black',
        letterSpacing: .3
    },
    image: {
        height: 150,
        width: '60%',
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginVertical: 10
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginVertical: 10,
        borderRadius: 5,
        fontSize: 15,
        paddingHorizontal: 10
    },
    button: {
        width: 200,
        backgroundColor: PRIMARY,
        alignSelf: 'center',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginVertical: 10
    },
    buttonLabel: {
        color: 'white',
        fontSize: 15,
    }
})