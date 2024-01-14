import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PRIMARY, WHITE} from '../../assets/colors';
import {moderateScale} from '../../utils/responsiveSize';

export const TransactionsCount = ({count}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginStart: moderateScale(4),
    paddingHorizontal: moderateScale(4),
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
  },
  counterText: {
    color: WHITE,
  },
});
