import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, ToastAndroid } from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';
import { AirbnbRating } from 'react-native-ratings';
import { PRIMARY } from '../assets/colors';
import { feedback, sendFeedback } from '../services/feedbackService';
import ButtonComponent from '../components/ButtonComponent';
import { connect } from 'react-redux';
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize';
import ToastMessage from '../components/common/ToastComponent';

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user
  }
}

class FeedbackScreen extends Component {
  constructor() {
    super();
    this.state = {
      ratingCount: 0,
      feedback: null,
      loading: false,
      error: null
    };
    this.onFinishRating = this.onFinishRating.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  isValidated() {
    let { feedback } = this.state;
    if (feedback == null || feedback?.length == 0) {
      this.setState({ error: 'Enter feedback' });
      return false
    }
    return true;

  }

  onFinishRating(rating) {
    this.setState({ ratingCount: rating });
  }

  handleFeedback(feedback) {
    this.setState({ feedback: feedback });
  }

  async submitFeedback() {
    let { user } = this.props;
    let { feedback, ratingCount } = this.state;
    if (!this.isValidated()) return;

    this.setState({ loading: true, error: null });
    try {
      const response = await sendFeedback(user?.accessToken, feedback, ratingCount);
      if (response) {
        ToastMessage({ message: 'Feedback submitted' });
        this.setState({ loading: false, feedback: null, ratingCount: null })
      }
      else this.setState({ loading: false })
    } catch (error) {
      console.log(error);
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>How was your experience? </Text>
        <TextInput
          style={styles.input}
          placeholder="Tell us your experience"
          numberOfLines={13}
          value={this.state.feedback}
          onChangeText={this.handleFeedback}
          multiline
        />
        {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
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
            onPress={this.submitFeedback}
            loading={this.state.loading}
          />
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(WithNetInfo(FeedbackScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: moderateScale(15),
  },
  title: {
    fontSize: textScale(18),
    color: 'black',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
  input: {
    backgroundColor: '#eeeeee',
    borderRadius: moderateScale(5),
    marginVertical: moderateScaleVertical(10),
    padding: 10,
    fontSize: textScale(15),
    textAlignVertical: 'top',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
    height: moderateScale(267),
    justifyContent: "flex-start"
  },
  subTitle: {
    fontSize: textScale(16),
    color: 'black',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
    marginTop: moderateScaleVertical(20)

  },
  label: {
    marginVertical: moderateScaleVertical(10),
    color: 'black',
    fontSize: textScale(13),
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
  ratingContainer: {
    alignSelf: 'flex-start',
    marginBottom: moderateScale(20),
  },
  buttonContainer: {
    marginTop: moderateScaleVertical(20),
    width: '80%',
    alignSelf: 'center'
  },
  starContainer: {
    marginTop: moderateScaleVertical(20),
    alignSelf: 'center',
  },
  error: {
    marginBottom: moderateScale(20),
    color: 'red',
    fontSize: 12
  }
});

