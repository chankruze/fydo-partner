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
import { Switch } from 'react-native-paper';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNOtpVerify from 'react-native-otp-verify';
import SmsRetriever from 'react-native-sms-retriever';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValue, storeValue } from '../utils/sharedPreferences';

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

    _onSmsListenerPressed = async () => {
        try {
            const registered = await SmsRetriever.startSmsRetriever();
            if (registered) {
                await SmsRetriever.addSmsListener(async event => {
                    if (event?.message) {
                        ReactNativeForegroundService.update_task(async () => {

                            if (event?.message?.toLowerCase().includes('rupees')
                                || event?.message?.toLowerCase().includes('received')) {
                                let message = event?.message?.split('-')[0];
                                let Y = 'Lfyd';
                                let Z = event?.message?.split(Y).pop();
                                let pId = Z.substring(0, 25).trim();

                                const getList = await getValue('speak');

                                if (getList?.length > 0) {
                                    getList?.map((i, index) => {
                                        SmsRetriever.removeSmsListener();
                                        let Arr = [];

                                        let diff = (new Date().getTime() - i?.createdAt) / 1000;
                                        diff /= 60;
                                        let difference = Math.round(diff);

                                        if (difference > 6) {
                                            delete getList[index];

                                            let newArr = getList.filter((element) => {
                                                return element !== undefined;
                                            });

                                            Arr = [...newArr];
                                        } else {
                                            Arr = [...getList]
                                        }

                                        let has = Arr.some(item => pId === item?.paymentId);

                                        if (has) {
                                            SmsRetriever.removeSmsListener();
                                            this.onStart();
                                            return;
                                        } else {
                                            SmsRetriever.removeSmsListener();

                                            Arr.push({
                                                createdAt: JSON.stringify(new Date().getTime()),
                                                paymentId: pId
                                            });
                                            storeValue('speak', JSON.stringify(Arr))

                                            Tts.speak(message);
                                            this.onStart();
                                            return;

                                        }
                                    })
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
                                    this.onStart();
                                    return;

                                }
                            }
                        },
                            {
                                delay: 15000,
                                onLoop: false,
                                taskId: '12345',
                                onError: (e) => console.log(`Error logging:`, e),
                            }
                        )
                        await SmsRetriever.removeSmsListener();
                    }
                });
            }
            // }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    };

    onStart = () => {
        // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
        if (ReactNativeForegroundService.is_task_running('12345')) return;
        // Creating a task.
        ReactNativeForegroundService.add_task(
            () => {
                console.log("hello");
                this._onSmsListenerPressed();
            },
            {
                delay: 25000,
                onLoop: true,
                taskId: '12345',
                onError: (e) => console.log(`Error logging:`, e),
            }
        );
        // starting  foreground service.
        return ReactNativeForegroundService.start({
            id: 144,
            title: 'Foreground Service',
            message: 'you are online!',
        });
    };

    onStop = () => {
        // Make always sure to remove the task before stoping the service. and instead of re-adding the task you can always update the task.
        if (ReactNativeForegroundService.is_task_running('12345')) {
            ReactNativeForegroundService.remove_task('12345');
        }
        SmsRetriever.removeSmsListener();
        // RNOtpVerify.removeListener();
        // Stoping Foreground service.
        return ReactNativeForegroundService.stop();
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
        if (val) {
            storeValue('speakPayment', 'true');
            this.onStart()
        } else {
            AsyncStorage.removeItem('speakPayment');
            this.onStop()
        }

        this.setState({
            checked: val
        })
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
        height: 0.3,
        backgroundColor: 'lightgrey',
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
