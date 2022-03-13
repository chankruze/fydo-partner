import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';

class SupportServiceScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>SupportServiceScreen</Text>
      </ScrollView>
    );
  }
}

export default WithNetInfo(SupportServiceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
