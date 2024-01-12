import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SECONDARY, WHITE} from '../../assets/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

const CardIconButton = props => {
  const {title, buttonTitle, icons, cardLabelStyle, cardButtonStyle, onPress} =
    props;
  return (
    <TouchableOpacity style={styles.Card} onPress={onPress}>
      {icons}
      <View style={styles.cardLabelContainer}>
        <Text style={{...styles.cardLabel, ...cardLabelStyle}}>{title}</Text>
        <Text style={{...styles.cardButtonLabel, ...cardButtonStyle}}>
          {buttonTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardIconButton;

const styles = StyleSheet.create({
  Card: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(10),
    backgroundColor: SECONDARY,
    flexDirection: 'row',
    alignItems: 'center',
    margin: moderateScale(4),
  },
  cardLabelContainer: {
    marginLeft: moderateScale(16),
  },
  cardLabel: {
    color: WHITE,
    fontSize: textScale(12),
    fontFamily: 'Gilroy-Medium',
  },
  cardButtonLabel: {
    fontFamily: 'Gilroy-Regular',
    color: WHITE,
    fontSize: textScale(8),
    marginTop: moderateScaleVertical(4),
  },
});
