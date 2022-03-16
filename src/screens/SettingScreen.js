import React, {Component} from 'react';
import {
    Linking, 
    StyleSheet, 
    ScrollView, 
    View, 
    Text, 
    TouchableOpacity, 
    Modal, 
    Pressable
} from 'react-native';
import FAQIcon from './../assets/icons/faq.svg';
import PrivacyIcon from './../assets/icons/privacypolicy.svg';
import FeekbackIcon from './../assets/icons/feedback.svg';
import SupportServiceIcon from './../assets/icons/support.svg';
import ChangeLanguageIcon from './../assets/icons/websitesvg.svg';
import AboutUsIcon from './../assets/icons/about us.svg';
import { PRIMARY } from '../assets/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getAppVersion } from '../utils/deviceInfo';
import WithNetInfo from '../components/hoc/withNetInfo';
import ChooseLanguageComponent from '../components/common/ChooseLanguageComponent';

const PRIVACY_PAGE = "https://fydo.in/privacy-policy.html";

class SettingScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: true
        }
        this.navigateToFAQScreen = this.navigateToFAQScreen.bind(this);
        this.navigateToFeedbackScreen = this.navigateToFeedbackScreen.bind(this);
        this.navigateToSupportServiceScreen = this.navigateToSupportServiceScreen.bind(this);
        this.navigateToAboutUsScreen = this.navigateToAboutUsScreen.bind(this);
        this.openPrivacyPage = this.openPrivacyPage.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
    }

    // componentDidMount(){
    //     this.triggerModal();
    // }
    

    triggerModal() {
        this.setState(prevState => {
          return {
            modalVisible: !prevState.modalVisible
          }
        });
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

    renderModal(){
        return (
            <Modal 
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this.triggerModal}
                >
                <Pressable 
                    activeOpacity={1}
                    style={styles.modalContainer}
                    onPress={this.triggerModal}>

                    <ChooseLanguageComponent />

                </Pressable>
            </Modal>
        )
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                {this.state.modalVisible && this.renderModal()}
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
                <TouchableOpacity 
                    style={styles.row}
                    onPress={this.triggerModal}>
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
        flex: 1,
        backgroundColor: 'white'
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
        height: .3,
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
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        height: '100%'
    },
})

export default WithNetInfo(SettingScreen)
