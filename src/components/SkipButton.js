import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LIGHTBLUE} from '../assets/colors';
import {moderateScale} from '../utils/responsiveSize';

const SkipButton = ({skip}) => {
  return (
    <TouchableOpacity onPress={skip}>
      <Text style={styles.button}>Skip</Text>
    </TouchableOpacity>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  button: {
    fontSize: moderateScale(16),
    fontFamily: 'Gilroy-Bold',
    color: LIGHTBLUE,
    padding: moderateScale(16),
  },
});
