import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';

class AboutUsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>AboutUsScreen</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WithNetInfo(AboutUsScreen);
