import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

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
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
});
