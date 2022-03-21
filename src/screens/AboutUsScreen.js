import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import { DARKBLACK } from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';

const ABOUT_US = "Fydo Pvt. Ltd. built the fydo app as a Commercial app. This SERVICE is provided by fydo Pvt. Ltd. and is intended for use as is."+
"This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service."+
"If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy."+
"The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at fydo unless otherwise defined in this Privacy Policy;"

class AboutUsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>{ABOUT_US}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  label: {
    fontSize: 17,
    color: DARKBLACK,
    letterSpacing: .3,
    fontFamily: 'Giroy-Medium',
    lineHeight: 25,
    paddingVertical: 10
  }
});

export default WithNetInfo(AboutUsScreen);
