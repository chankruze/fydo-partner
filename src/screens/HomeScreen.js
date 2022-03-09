import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Text, StatusBar, Switch} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeFab from '../components/home/HomeFab';
import HomeSlider from './../components/home/HomeSlider';
import Entypo from 'react-native-vector-icons/Entypo';
import { PRIMARY } from '../assets/colors';
import { SvgUri } from 'react-native-svg';
import OfferIcon from './../assets/icons/my offer.svg';
import MyShopIcon from './../assets/icons/myshop.svg';
import SupportIcon from './../assets/icons/support.svg';
import ReferEarnIcon from './../assets/icons/refer and earn.svg';

export default class HomeScreen extends Component{

    constructor(){
        super();
        this.state = {
            shopOpen: false
        }
        this.handleShopStatus = this.handleShopStatus.bind(this);
    }

    handleShopStatus(){
        this.setState({shopOpen: !this.state.shopOpen});
    }

    render(){
        let {shopOpen} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{flex: 1}}>
                    <StatusBar backgroundColor={PRIMARY}/>
                    <HomeSlider />
                    <TouchableOpacity style={styles.shareCard}>

                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.addTagsCard}>
                        
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <HomeFab />
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}>
                                <MyShopIcon 
                                    width={24}
                                    height={24}
                                />
                            </TouchableOpacity>
                            <Text style={styles.label}>My Shops</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}>
                                <OfferIcon 
                                    width={24}
                                    height={24}
                                />
                            </TouchableOpacity>
                            <Text style={styles.label}>My Offers</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.support}>
                            <SupportIcon 
                                width={24}
                                height={24}/>
                            <Text style={styles.otherLabel}>Support and service</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.referEarn}>
                            <SupportIcon 
                                width={24}
                                height={24}/>
                            <Text style={styles.otherLabel}>Refer and earn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.shopStatusRow}>
                        <Text style={styles.shopStatusLabel}>Your shop status</Text>
                        <Switch
                            style={styles.switchButton}
                            value={shopOpen}
                            thumbColor={shopOpen ? PRIMARY : 'lightgrey'}
                            onValueChange={this.handleShopStatus}/>
                        <View style={Object.assign({...styles.shopStatus}, {backgroundColor: shopOpen? '#66bb6a': '#ff7043'})}>
                            <Text style={styles.shopStatusOtherLabel}>{shopOpen ? 'Opened': 'Closed'}</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15
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
        marginTop: 7,
        // fontFamily: 'Gilroy-Bold',
        fontWeight: '600',
        color: PRIMARY
    },
    support: {
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
        height: 70,
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        backgroundColor: 'rgba(227, 242, 253, .3)',
        shadowColor: 'rgba(227, 242, 253, 1)',
    },
    referEarn: {
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
        height: 70,
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        backgroundColor: 'rgba(227, 242, 253, .3)',
        shadowColor: 'rgba(227, 242, 253, 1)',
    },
    otherLabel: {
        color: PRIMARY,
        fontWeight: '500',
        fontSize: 13,
        marginTop: 5
    },
    line: {
        backgroundColor: 'lightgrey',
        height: .4
    },
    shopStatusLabel: {
        color: 'black',
        fontSize: 13
    },
    shopStatusRow: {
        padding: 10,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchButton: {
        marginLeft: 10
    },
    shopStatus: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    shopStatusOtherLabel: {
        fontSize: 13
    },
    shareCard: {
        height: 60
    },
    addTagsCard: {
        height: 60
    }
})  
