import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';

class NotificationScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>NotificationScreen</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WithNetInfo(NotificationScreen);
