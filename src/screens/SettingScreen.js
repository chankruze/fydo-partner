import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PopOver from 'react-native-popover-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
import {PRIMARY} from '../assets/colors';
import ChooseLanguageComponent from '../components/common/ChooseLanguageComponent';
import WithNetInfo from '../components/hoc/withNetInfo';
import {logout} from '../services/authService';
import {clearUser} from '../store/actions/user.action';
import {getAppVersion} from '../utils/deviceInfo';
import {getValue, storeValue} from '../utils/sharedPreferences';
import AboutUsIcon from './../assets/icons/about us.svg';
import FAQIcon from './../assets/icons/faq.svg';
import FeekbackIcon from './../assets/icons/feedback.svg';
import PrivacyIcon from './../assets/icons/privacypolicy.svg';
import SupportServiceIcon from './../assets/icons/support.svg';
import BackgroundService from './BackgroundService';

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).

const PRIVACY_PAGE = 'https://fydo.in/privacy-policy.html';

const mapStateToProps = state => {
  return {
    language: state?.userReducer?.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearData: () => dispatch(clearUser()),
  };
};

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      checked: false,
      isRunningService: false,
    };
    this.logoutDevice = this.logoutDevice.bind(this);
    this.navigateToFAQScreen = this.navigateToFAQScreen.bind(this);
    this.navigateToFeedbackScreen = this.navigateToFeedbackScreen.bind(this);
    this.navigateToSupportServiceScreen =
      this.navigateToSupportServiceScreen.bind(this);
    this.navigateToAboutUsScreen = this.navigateToAboutUsScreen.bind(this);
    this.openPrivacyPage = this.openPrivacyPage.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
  }

  async componentDidMount() {
    const isSpeak = await getValue('speakPayment');

    if (isSpeak) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  }

  triggerModal() {
    this.setState(prevState => {
      return {
        modalVisible: !prevState.modalVisible,
      };
    });
  }

  navigateToFAQScreen() {
    let {navigation} = this.props;
    navigation.navigate('FAQ');
  }

  navigateToFeedbackScreen() {
    let {navigation} = this.props;
    navigation.navigate('Feedback');
  }

  navigateToSupportServiceScreen() {
    let {navigation} = this.props;
    navigation.navigate('Support');
  }

  navigateToAboutUsScreen() {
    let {navigation} = this.props;
    navigation.navigate('AboutUs');
  }

  openPrivacyPage() {
    Linking.openURL(PRIVACY_PAGE).catch(err =>
      console.error("Couldn't load page", err),
    );
  }

  async logoutDevice() {
    let {clearData, navigation} = this.props;
    try {
      await logout();
      await clearData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'OnBoarding'}],
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  onStart = async () => {
    BackgroundService.startService();
  };

  onStop = async () => {
    BackgroundService.stopService();
  };

  renderModal() {
    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.triggerModal}>
        <Pressable
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={this.triggerModal}>
          <ChooseLanguageComponent toggle={this.triggerModal} />
        </Pressable>
      </Modal>
    );
  }

  setRead = async val => {
    if (val) {
      await storeValue('speakPayment', 'true');
      this.onStart();
    } else {
      await AsyncStorage.removeItem('speakPayment');
      this.onStop();
    }

    this.setState({
      checked: val,
    });
  };

  render() {
    let {language} = this.props;
    return (
      <ScrollView style={styles.container}>
        {this.state.modalVisible && this.renderModal()}
        <TouchableOpacity style={styles.row} onPress={this.navigateToFAQScreen}>
          <FAQIcon width={22} height={22} />
          <Text style={styles.label}>
            {language === 'HINDI' ? 'सामान्य प्रश्न' : 'FAQ'}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.row} onPress={this.openPrivacyPage}>
          <PrivacyIcon width={22} height={22} />
          <Text style={styles.label}>
            {language === 'HINDI' ? 'गोपनीयता नीति' : 'Privacy policy'}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        {Platform.OS === 'android' && (
          <>
            <View style={styles.line} />
            <TouchableOpacity
              style={styles.row}
              // onPress={this.openPrivacyPage}
            >
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={this.state.checked ? '#f5dd4b' : '#f4f3f4'}
                value={this.state.checked}
                onValueChange={val => {
                  this.setRead(val);
                }}
              />
              <Text
                style={[
                  styles.label,
                  {
                    flex: 1,
                  },
                ]}>
                {language === 'HINDI' ? 'गोपनीयता नीति' : 'Read Payments'}
              </Text>
              <PopOver
                from={
                  <TouchableOpacity>
                    <Ionicons
                      name="information-circle-outline"
                      size={22}
                      color={'black'}
                      style={{
                        marginLeft: 4,
                      }}
                    />
                  </TouchableOpacity>
                }>
                <View>
                  <Text style={styles.infoText}>
                    {' '}
                    1. Readout payment might not work if phone is on low battery
                    or power saver mode.
                    {'\n'} 2. Please check the "listening to payments" permanent
                    notification.
                    {'\n'} 3. Keep opening the app within each 45 minutes to one
                    hour in order for payment readout to work seamlessly.
                    {'\n'} 4. If there's no notification, switch off the read
                    payments and switch on again. The notification will come
                    within 10 seconds of switch on.
                  </Text>
                </View>
              </PopOver>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.row}
          onPress={this.navigateToFeedbackScreen}>
          <FeekbackIcon width={22} height={22} />
          <Text style={styles.label}>
            {language === 'HINDI' ? 'प्रतिक्रिया' : 'Feedback'}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.row}
          onPress={this.navigateToSupportServiceScreen}>
          <SupportServiceIcon width={22} height={22} />
          <Text style={styles.label}>
            {language === 'HINDI' ? 'समर्थन और सेवा' : 'Support and service'}
          </Text>
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
          <AboutUsIcon width={22} height={22} />
          <Text style={styles.label}>
            {' '}
            {language === 'HINDI' ? 'हमारे बारे में' : 'About us'}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.row} onPress={this.logoutDevice}>
          <SimpleLineIcons
            style={styles.logoutIcon}
            size={18}
            name="logout"
            color={'#FE3838'}
          />
          <Text style={styles.label}>
            {language === 'HINDI' ? 'लॉग आउट' : 'Logout'}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <Text style={styles.version}>Version {getAppVersion()}</Text>
      </ScrollView>
    );
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
    marginLeft: 8,
    color: PRIMARY,
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  line: {
    height: 0.4,
    backgroundColor: 'lightgrey',
  },
  logoutIcon: {
    width: 22,
  },
  version: {
    alignSelf: 'center',
    padding: 24,
    color: PRIMARY,
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '100%',
  },
  infoText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
    color: 'black',
    width: '90%',
    marginLeft: 15,
    marginVertical: 6,
  },
});
