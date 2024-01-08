import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LIGHTPRIMARY, WHITE} from '../assets/colors';
import {moderateScale, textScale} from '../utils/responsiveSize';

export default function RoundButtonComponent({
  label,
  onPress,
  labelStyle,
  buttonStyle,
}) {
  return (
    <TouchableOpacity
      style={{...styles.button, ...buttonStyle}}
      activeOpacity={0.6}
      onPress={onPress}>
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: moderateScale(30),
    borderRadius: 20,
    paddingHorizontal: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHTPRIMARY,
  },
  label: {
    color: WHITE,
    fontSize: textScale(16),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 0.3,
    fontWeight: '600',
  },
});
