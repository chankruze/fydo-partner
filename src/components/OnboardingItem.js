import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import { DARKBLACK, DARKBLUE, DARKGREY } from '../assets/colors';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width: width*.8, resizeMode: 'contain'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: DARKBLUE,
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold'
  },
  description: {
    fontWeight: '500',
    fontSize: 15,
    color: DARKGREY,
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: .3,
    paddingHorizontal: 64,
    fontFamily: 'Gilroy-Medium'
  },
});
