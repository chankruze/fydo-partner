import React, {Component} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {GREY_1, LIGHTBLUE, PRIMARY} from '../assets/colors';
import ButtonComponent from '../components/ButtonComponent';
import WithNetInfo from '../components/hoc/withNetInfo';
import {moderateScale, textScale} from '../utils/responsiveSize';
class SupportServiceScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: 'support@fydo.in',
      phoneNo: '+918447734227',
      whatsAppMsg: 'Hi there!',
    };
    this.sendEmail = this.sendEmail.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.whatsappText = this.whatsappText.bind(this);
  }

  async sendEmail() {
    try {
      let url = `mailto:${this.state.email}`;
      Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  async makeCall() {
    try {
      let url = `tel:${this.state.phoneNo}`;
      Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  async whatsappText() {
    try {
      let url = 'whatsapp://send?text=' + '&phone=' + this.state.phoneNo;
      Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.phoneEmail}>
          <TouchableOpacity onPress={this.sendEmail} style={styles.button}>
            <IonIcons name="mail-outline" size={36} color={PRIMARY} />
            <Text
              style={[
                styles.title,
                {
                  paddingTop: 10,
                },
              ]}>
              Send us email at
            </Text>
            <Text style={styles.label}>{this.state.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.makeCall} style={styles.button}>
            <IonIcons name="call-outline" size={36} color={PRIMARY} />
            <Text
              style={[
                styles.title,
                {
                  paddingTop: 10,
                },
              ]}>
              Contact our customer care
            </Text>
            <Text style={styles.label}>{this.state.phoneNo}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.row}>
          <IonIcons
            name="logo-whatsapp"
            size={38}
            color={PRIMARY}
            style={{
              marginVertical: 8,
            }}
          />
          <Text style={styles.title}>Chat with us now</Text>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              label="Message"
              color="white"
              backgroundColor={PRIMARY}
              onPress={this.whatsappText}
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default WithNetInfo(SupportServiceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  phoneEmail: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  button: {
    backgroundColor: LIGHTBLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 150,
    width: '45%',
    marginHorizontal: 8,
  },
  row: {
    backgroundColor: LIGHTBLUE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: textScale(14),
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
    color: GREY_1,
    width: '85%',
  },

  label: {
    color: PRIMARY,
    fontSize: 16,
    marginVertical: 6,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
  },
  buttonContainer: {
    width: '85%',
    marginTop: 10,
    borderRadius: moderateScale(10),
  },
});
