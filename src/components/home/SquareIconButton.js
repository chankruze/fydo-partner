import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LIGHTBLUE, PRIMARY} from '../../assets/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

const SquareIconButton = ({onPress, icon, label}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SquareIconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    marginRight: moderateScale(5),
    height: moderateScale(70),
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    backgroundColor: LIGHTBLUE,
    shadowColor: 'rgba(227, 242, 253, 1)',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  label: {
    color: PRIMARY,
    fontSize: textScale(13),
    marginTop: moderateScaleVertical(5),
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
  },
});
