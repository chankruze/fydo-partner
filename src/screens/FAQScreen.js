import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';

const FAQS = [
  {
    id: 1,
    question: 'What is Fydo?',
  }
];

class FAQScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>FAQScreen</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default WithNetInfo(FAQScreen);
