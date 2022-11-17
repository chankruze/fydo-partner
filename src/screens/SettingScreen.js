import React, { Component } from 'react';
import {
    Linking,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    DeviceEventEmitter,
    Switch,
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
import { connect } from 'react-redux';
import { clearUser, setLanguage, setUser } from '../store/actions/user.action';
import { CommonActions } from '@react-navigation/native';
import { clearData, saveUserData } from '../utils/defaultPreference';
import SmsRetriever from 'react-native-sms-retriever';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValue, storeValue } from '../utils/sharedPreferences';
import { Platform } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import { isCameraPermissionGranted, isLocationPermissionGranted } from '../utils/permissionManager';
import ToastMessage from '../components/common/ToastComponent';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).

const options = {
    taskName: 'Fydo Partner',
    taskTitle: 'Fydo Partner',
    taskDesc: 'Listening to payments',
    taskIcon: {
        name: 'ic_launcher_1',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 15000,
    },

};

const PRIVACY_PAGE = "https://fydo.in/privacy-policy.html";

const mapStateToProps = (state) => {
    return {
        language: state?.userReducer?.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearData: () => dispatch(clearUser())
    }
}

class SettingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            checked: false,
            isRunningService: false
        }
        this.logout = this.logout.bind(this);
        this.navigateToFAQScreen = this.navigateToFAQScreen.bind(this);
        this.navigateToFeedbackScreen = this.navigateToFeedbackScreen.bind(this);
        this.navigateToSupportServiceScreen = this.navigateToSupportServiceScreen.bind(this);
        this.navigateToAboutUsScreen = this.navigateToAboutUsScreen.bind(this);
        this.openPrivacyPage = this.openPrivacyPage.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
    }

    async componentDidMount() {
        const isSpeak = await getValue('speakPayment');

        if (isSpeak) {
            this.setState({
                checked: true
            })
        } else {
            this.setState({
                checked: false
            })
        }
    }

    veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve, reject) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log("hello");
                global.isListenerAttached = false;

                const registered = await SmsRetriever.startSmsRetriever();
                if (registered) {
                    await SmsRetriever.addSmsListener(async event => {
                        await new Promise(async (resolve, reject) => {
                            if (event?.message && !global.isListenerAttached) {
                                global.isListenerAttached = true;

                                if (event?.message?.toLowerCase().includes('rupees')
                                    || event?.message?.toLowerCase().includes('received')) {
                                    let message = event?.message?.split('-')[0];
                                    let Y = 'Lfyd';
                                    let Z = event?.message?.split(Y).pop();
                                    let pId = Z.substring(0, 25).trim();

                                    const getList = await getValue('speak');

                                    if (getList?.length > 0) {
                                        let diffData = getList?.filter((i) => {
                                            let diff = (new Date().getTime() - i?.createdAt) / 1000;
                                            diff /= 60;
                                            let difference = Math.round(diff);
                                            if (difference < 6) {
                                                return i
                                            }
                                        });

                                        let existData = diffData.filter((j) => {
                                            return j?.paymentId === pId
                                        })

                                        if (existData?.length > 0) {
                                            SmsRetriever.removeSmsListener();
                                            storeValue('speak', JSON.stringify(diffData))
                                        } else {
                                            SmsRetriever.removeSmsListener();

                                            diffData.push({
                                                createdAt: JSON.stringify(new Date().getTime()),
                                                paymentId: pId
                                            });

                                            storeValue('speak', JSON.stringify(diffData))

                                            Tts.speak(message);
                                        }
                                    } else {
                                        SmsRetriever.removeSmsListener();
                                        let newArr = [];

                                        newArr.push({
                                            createdAt: JSON.stringify(new Date().getTime()),
                                            paymentId: pId
                                        });
                                        storeValue('speak', JSON.stringify(newArr))

                                        // Tts.stop();
                                        Tts.speak(message);
                                    }
                                }
                            }
                        })
                    });
                    await sleep(delay);
                }
            }
        });
    };

    triggerModal() {
        this.setState(prevState => {
            return {
                modalVisible: !prevState.modalVisible
            }
        });
    }


    navigateToFAQScreen() {
        let { navigation } = this.props;
        navigation.navigate('FAQ');
    }

    navigateToFeedbackScreen() {
        let { navigation } = this.props;
        navigation.navigate('Feedback');
    }

    navigateToSupportServiceScreen() {
        let { navigation } = this.props;
        navigation.navigate('Support');
    }

    navigateToAboutUsScreen() {
        let { navigation } = this.props;
        navigation.navigate('AboutUs');
    }

    openPrivacyPage() {
        Linking.openURL(PRIVACY_PAGE).catch(err => console.error("Couldn't load page", err));
    }

    async logout() {
        let { clearData, navigation } = this.props;
        try {
            await clearData();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'OnBoarding' },
                    ],
                })
            );

        } catch (error) {
            console.log(error);
        }
    }

    onStart = async () => {
        await BackgroundService.start(this.veryIntensiveTask, options);
        // await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' });
    };

    onStop = async () => {
        await BackgroundService.stop();
    };

    renderModal() {
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

                    <ChooseLanguageComponent toggle={this.triggerModal} />

                </Pressable>
            </Modal>
        )
    }

    setRead = async (val) => {
        // const permissionStatus = await isLocationPermissionGranted();
        // const cameraPermissionStatus = await isCameraPermissionGranted();

        // if (permissionStatus === 'granted' && cameraPermissionStatus === 'granted') {
        if (val) {
            await storeValue('speakPayment', 'true');
            this.onStart()
        } else {
            await AsyncStorage.removeItem('speakPayment');
            this.onStop()
        }

        this.setState({
            checked: val
        })
        // } else {
        //     ToastMessage({ message: 'Please give location and camera permissions for using read payments feature.' })
        // }

    }

    render() {
        let { language } = this.props;
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
                    <Text style={styles.label}>{language == 'HINDI' ? 'सामान्य प्रश्न' : 'FAQ'}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={this.openPrivacyPage}>
                    <PrivacyIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>{language == 'HINDI' ? 'गोपनीयता नीति' : 'Privacy policy'}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity
                    style={styles.row}
                // onPress={this.openPrivacyPage}
                >
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.checked ? "#f5dd4b" : "#f4f3f4"}
                        value={this.state.checked}
                        onValueChange={(val) => {
                            this.setRead(val)
                        }
                        }
                    />
                    <Text style={styles.label}>{language == 'HINDI' ? 'गोपनीयता नीति' : 'Read Payments'}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={this.navigateToFeedbackScreen}>
                    <FeekbackIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>{language == 'HINDI' ? 'प्रतिक्रिया' : 'Feedback'}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={this.navigateToSupportServiceScreen}>
                    <SupportServiceIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>{language == 'HINDI' ? 'समर्थन और सेवा' : 'Support and service'}</Text>
                </TouchableOpacity>
                {/* <View style={styles.line}/>
                <TouchableOpacity 
                    style={styles.row}
                    onPress={this.triggerModal}>
                    <ChangeLanguageIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}>{language == 'HINDI'? 'भाषा बदलें': 'Change language'}</Text>
                </TouchableOpacity> */}
                <View style={styles.line} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={this.navigateToAboutUsScreen}>
                    <AboutUsIcon
                        width={22}
                        height={22}
                    />
                    <Text style={styles.label}> {language == 'HINDI' ? 'हमारे बारे में' : 'About us'}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity
                    style={styles.row}
                    onPress={this.logout}>
                    <SimpleLineIcons
                        style={styles.logoutIcon}
                        size={18}
                        name="logout"
                        color={'#FE3838'}
                    />
                    <Text style={styles.label}>{language == 'HINDI' ? 'लॉग आउट' : 'Logout'}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <Text style={styles.version}>v {getAppVersion()}</Text>
            </ScrollView>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WithNetInfo(SettingScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        marginLeft: 14,
        color: PRIMARY,
        fontSize: 14,
        fontFamily: 'Gilroy-Medium',
        letterSpacing: 0.25,
        color: 'black',
    },
    line: {
        borderWidth: 0.3,
        // height: 0.3,
        borderColor: 'lightgrey',
    },
    logoutIcon: {
        width: 22,
    },
    version: {
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: 20,
        fontWeight: '500',
        color: PRIMARY,
        fontSize: 15,
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        height: '100%',
    },
});
