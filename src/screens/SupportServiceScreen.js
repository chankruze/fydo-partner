import React, {Component} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {LIGHTBLUE, PRIMARY} from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';
import ButtonComponent from '../components/ButtonComponent';
class SupportServiceScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: 'support@fydo.in',
      phoneNo: '+918447734227',
      whatsAppMsg: 'Hi there!'
    };
    this.sendEmail = this.sendEmail.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.whatsappText = this.whatsappText.bind(this);
  }

  async sendEmail() {
    try {
      let url = `mailto:${this.state.email}`;
        Linking.openURL(url)
    } catch (error) {
      console.log(error);
    }
  }

  async makeCall() {
    try {
      let url = `tel:${this.state.phoneNo}`;
      Linking.openURL(url)
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
            <Text style={styles.title}>Send us email at</Text>
            <Text style={styles.label}>{this.state.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.makeCall} style={styles.button}>
            <Text style={styles.title}>Contact our customer care</Text>
            <Text style={styles.label}>{this.state.phoneNo}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.row}>
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
    height: 130,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },

  label: {
    color: PRIMARY,
    fontSize: 16,
    marginVertical: 13,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
  buttonContainer: {
    width: '85%',
    marginTop: 18,
    borderRadius: 10,
  },
});
