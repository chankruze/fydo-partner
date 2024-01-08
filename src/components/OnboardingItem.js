import React from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {DARKBLACK, DARKGREY, PRIMARY} from '../assets/colors';
import growth from '../assets/images/Vector.png';
import appLogo from '../assets/images/app-icon.png';
import ButtonComponent from './ButtonComponent';

const OnboardingItem = ({item, index, finish}) => {
  const {width} = useWindowDimensions();

  if (index === 3) {
    return (
      <View
        style={[styles.container, {width: width, backgroundColor: '#003579'}]}>
        <Image
          source={appLogo}
          style={[
            styles.image,
            {width: width * 0.45, resizeMode: 'contain', flex: 0.3},
          ]}
        />
        <Image
          source={growth}
          style={[
            styles.image,
            {width: width * 0.6, resizeMode: 'contain', flex: 0.5},
          ]}
        />
        <View style={{flex: 0.3}}>
          <Text style={[styles.title, {color: 'white', marginVertical: 20}]}>
            {item.title}
          </Text>
          <Text style={[styles.description, {color: 'white'}]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            label="Get started"
            color={PRIMARY}
            backgroundColor="white"
            onPress={finish}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, {width}]}>
        <Image
          source={item.image}
          style={[styles.image, {width: width * 0.8, resizeMode: 'contain'}]}
        />
        <View style={{flex: 0.3}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  }
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
    fontSize: 26,
    marginBottom: 10,
    color: DARKBLACK,
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
  },
  description: {
    fontSize: 16,
    color: DARKGREY,
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0.3,
    paddingHorizontal: 64,
    fontFamily: 'Gilroy-Medium',
  },
  buttonContainer: {
    width: '85%',
    flex: 0.2,
  },
});
