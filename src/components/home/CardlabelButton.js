import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LIGHTWHITE, SECONDARY, WHITE} from '../../assets/colors';
import MoneyBag from '../../assets/images/money-bag.png';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import RoundButtonComponent from '../RoundButtonComponent';
const CardlabelButton = props => {
  const {title, subTitle, buttonTitle, onPress} = props;
  return (
    <View style={styles.CardContainer}>
      <View style={styles.Card}>
        <View style={styles.cardLabelContainer}>
          <Text style={styles.cardLabel}>{title}</Text>
          <Text style={styles.cardSubTitle}>{subTitle}</Text>
          <RoundButtonComponent
            label={buttonTitle}
            onPress={onPress}
            buttonStyle={{
              width: moderateScale(100),
              marginTop: moderateScaleVertical(10),
            }}
          />
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Image source={MoneyBag} />
        </View>
      </View>
    </View>
  );
};

export default CardlabelButton;

const styles = StyleSheet.create({
  CardContainer: {
    padding: moderateScale(12),
    paddingVertical: moderateScaleVertical(10),
  },
  Card: {
    borderRadius: moderateScale(10),
    backgroundColor: SECONDARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(25),
  },
  cardLabelContainer: {
    paddingVertical: moderateScaleVertical(12),
  },
  cardLabel: {
    color: LIGHTWHITE,
    fontSize: textScale(12),
    fontWeight: '600',
    fontFamily: 'Gilroy-Medium',
    marginTop: moderateScaleVertical(15),
  },
  cardSubTitle: {
    color: WHITE,
    fontSize: textScale(14),
    marginVertical: moderateScaleVertical(4),
    fontWeight: '600',
    fontFamily: 'Gilroy-Medium',
  },
});
