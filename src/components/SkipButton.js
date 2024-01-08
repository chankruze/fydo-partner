import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { DARKBLUE, DARKGREY } from '../assets/colors';

const SkipButton = ({ skip }) => {
  return (
    <TouchableOpacity onPress={skip}>
      <Text style={styles.button}>Skip</Text>
    </TouchableOpacity>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Gilroy-Bold',
    color: DARKGREY,
  },
});
