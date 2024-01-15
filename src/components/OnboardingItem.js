import React from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {LIGHTBLUE, PRIMARY, WHITE} from '../assets/colors';
import growth from '../assets/images/Vector.png';
import appLogo from '../assets/images/app-icon.png';
import {moderateScale} from '../utils/responsiveSize';
import ButtonComponent from './ButtonComponent';

const OnboardingItem = ({item, index, next, finish}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      {index === 3 ? (
        <Image source={appLogo} style={[styles.image, styles.specialImage]} />
      ) : null}
      {index === 3 ? (
        <Image source={growth} style={[styles.image, styles.specialImage]} />
      ) : (
        <Image source={item.image} style={styles.image} />
      )}
      <View style={styles.textContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          label={index === 3 ? 'Get started' : 'Next'}
          color={PRIMARY}
          backgroundColor="white"
          onPress={index === 3 ? finish : next}
        />
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    width: '70%',
    padding: moderateScale(16),
  },
  specialImage: {
    width: '50%',
  },
  textContent: {
    marginVertical: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    color: WHITE,
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: moderateScale(14),
    padding: moderateScale(16),
    color: LIGHTBLUE,
    textAlign: 'center',
    fontFamily: 'Gilroy-Medium',
  },
  buttonContainer: {
    width: '100%',
    padding: moderateScale(16),
  },
});
