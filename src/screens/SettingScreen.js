import React, {Component} from 'react';
import {Linking, StyleSheet, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import FAQIcon from './../assets/icons/faq.svg';
import PrivacyIcon from './../assets/icons/privacypolicy.svg';
import FeekbackIcon from './../assets/icons/feedback.svg';
import SupportServiceIcon from './../assets/icons/support.svg';
import ChangeLanguageIcon from './../assets/icons/websitesvg.svg';
import AboutUsIcon from './../assets/icons/about us.svg';
import { PRIMARY } from '../assets/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getAppVersion } from '../utils/deviceInfo';

const PRIVACY_PAGE = "https://fydo.in/privacy-policy.html";

export default class SettingScreen extends Component{

    constructor(props){
        super(props);
        this.navigateToFAQScreen = this.navigateToFAQScreen.bind(this);
        this.navigateToFeedbackScreen = this.navigateToFeedbackScreen.bind(this);
        this.navigateToSupportServiceScreen = this.navigateToSupportServiceScreen.bind(this);
        this.navigateToAboutUsScreen = this.navigateToAboutUsScreen.bind(this);
        this.openPrivacyPage = this.openPrivacyPage.bind(this);
    }

    navigateToFAQScreen(){
        let {navigation} = this.props;
        navigation.navigate('FAQ');
    }

    navigateToFeedbackScreen(){
        let {navigation} = this.props;
        navigation.navigate('Feedback');
    }

    navigateToSupportServiceScreen(){
        let {navigation} = this.props;
        navigation.navigate('SupportService');
    }

    navigateToAboutUsScreen(){
        let {navigation} = this.props;
        navigation.navigate('AboutUs');
    }

    openPrivacyPage(){
        Linking.openURL(PRIVACY_PAGE).catch(err => console.error("Couldn't load page", err));
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity 
                    style={styles.row}
                    onPress={this.navigateToFAQScreen}>
                    <FAQIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>FAQ</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity 
                    style={styles.row}
                    onPress={this.openPrivacyPage}>
                    <PrivacyIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>Privacy policy</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity 
                    style={styles.row}
                    onPress={this.navigateToFeedbackScreen}>
                    <FeekbackIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>Feedback</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity 
                    style={styles.row}
                    onPress={this.navigateToSupportServiceScreen}>
                    <SupportServiceIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>Support and service</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity style={styles.row}>
                    <ChangeLanguageIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>Change language</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity 
                    style={styles.row}
                    onPress={this.navigateToAboutUsScreen}>
                    <AboutUsIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>About us</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity style={styles.row}>
                    <SimpleLineIcons
                        style={styles.logoutIcon}
                        size={18}
                        name="logout"
                        color={'#FE3838'}
                    />
                    <Text style={styles.label}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <Text style={styles.version}>v {getAppVersion()}</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        marginLeft: 16,
        color: PRIMARY,
        fontWeight: '500',
        fontSize: 14
    },
    line: {
        height: 1,
        backgroundColor: 'lightgrey'
    },
    logoutIcon: {
        width: 22
    },
    version: {
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: 20,
        fontWeight: '500',
        color: PRIMARY,
        fontSize: 15
    }
})