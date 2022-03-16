import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';
import { AirbnbRating } from 'react-native-ratings';
import { PRIMARY } from '../assets/colors';
import { feedback } from '../services/feedbackService';

class FeedbackScreen extends Component {

  constructor(){
    super();
    this.state = {
      ratingCount: 0,
      feedback: null
    }
    this.onFinishRating = this.onFinishRating.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  onFinishRating(rating){
    this.setState({ratingCount: rating});
  }

  handleFeedback(feedback){
    this.setState({feedback: feedback});
  }

  async sendFeedback(){
    feedback();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>How was your experience? </Text>
        <TextInput
          style={styles.input}
          placeholder='Tell us your experience'
          numberOfLines={5}
          onChangeText={this.handleFeedback}
          multiline
        />
        <Text style={styles.subTitle}>Rate us</Text>
        <Text style={styles.label}>Your opinion matters</Text>
        <AirbnbRating
          showRating={false}
          type='star'
          ratingCount={5}
          size={35}
          starContainerStyle={styles.ratingContainer}
          onFinishRating={this.onFinishRating}
          jumpValue={1}
          selectedColor={PRIMARY}
          defaultRating={this.state.ratingCount}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          activeOpacity={1}
          onPress={this.sendFeedback}>
          <Text style={styles.sendButtonLabel}>Send</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 18,
    color: 'black'
  },
  input: {
    backgroundColor: '#eeeeee',
    borderRadius: 5,
    marginVertical: 20,
    padding: 10,
    fontSize: 15,
    textAlignVertical: 'top'
  },
  subTitle: {
    fontSize: 16,
    color: 'black'
  },
  label: {
    marginVertical: 10,
    color: 'black',
    fontSize: 13
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  sendButton: {
    backgroundColor: PRIMARY,
    height: 40,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  sendButtonLabel: {
    color: 'white',
    fontWeight: '500',
    letterSpacing: 1
  }
});

export default WithNetInfo(FeedbackScreen);
