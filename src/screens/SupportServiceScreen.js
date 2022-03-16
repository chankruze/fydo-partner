import React, {Component} from 'react';
import {Linking, StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { PRIMARY } from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';

class SupportServiceScreen extends Component {

  constructor(){
    super();
    this.state = {
      email: 'support@fydo.in',
      phoneNo: '+918447734227'
    }
    this.sendEmail = this.sendEmail.bind(this);
  }

  async sendEmail(){
    try {
      let url = `mailto:${this.state.email}`;
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen)
          throw new Error('Provided URL can not be handled');
      await Linking.openURL(url);
    } catch (error) {
        console.log(error)
    }
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={this.sendEmail}
          style={styles.button}>
          <Text style={styles.title}>Send us email at</Text>
          <Text style={styles.label}>{this.state.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.title}>Contact our customer care</Text>
          <Text style={styles.label}>{this.state.phoneNo}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.title}>Chat with us now</Text>
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
    justifyContent: 'center',
  },
  button: {
    height: '20%',
    backgroundColor: PRIMARY,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    height: '20%',
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: '400',
    color: 'white',
    fontSize: 22
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 13
  }
});
