import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';
import {AirbnbRating} from 'react-native-ratings';
import {PRIMARY} from '../assets/colors';
import {feedback} from '../services/feedbackService';
import ButtonComponent from '../components/ButtonComponent';

class FeedbackScreen extends Component {
  constructor() {
    super();
    this.state = {
      ratingCount: 0,
      feedback: null,
    };
    this.onFinishRating = this.onFinishRating.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  onFinishRating(rating) {
    this.setState({ratingCount: rating});
  }

  handleFeedback(feedback) {
    this.setState({feedback: feedback});
  }

  async sendFeedback() {
    feedback();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>How was your experience? </Text>
        <TextInput
          style={styles.input}
          placeholder="Tell us your experience"
          numberOfLines={13}
          onChangeText={this.handleFeedback}
          multiline
        />
        <Text style={styles.subTitle}>Rate us</Text>
        <Text style={styles.label}>Your opinion matters</Text>
        <View style={styles.starContainer}>
        <AirbnbRating
          showRating={false}
          type="star"
          ratingCount={5}
          size={35}
          starContainerStyle={styles.ratingContainer}
          onFinishRating={this.onFinishRating}
          jumpValue={1}
          selectedColor={PRIMARY}
          defaultRating={this.state.ratingCount}
        />
        </View>
        
        <View style={styles.buttonContainer}>
          <ButtonComponent
            label="Submit"
            color="white"
            backgroundColor={PRIMARY}
            onPress={this.sendFeedback}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Gilroy-Medium',
  },
  input: {
    backgroundColor: '#eeeeee',
    borderRadius: 5,
    marginVertical: 20,
    padding: 10,
    fontSize: 15,
    textAlignVertical: 'top',
    fontFamily: 'Gilroy-Medium',
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Gilroy-Medium',
  },
  label: {
    marginVertical: 10,
    color: 'black',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center'
  },
  starContainer: {
    marginTop: 20,
    alignSelf: 'center',
  }
});

export default WithNetInfo(FeedbackScreen);
