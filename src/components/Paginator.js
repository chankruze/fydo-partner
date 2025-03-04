import React from 'react';
import {Animated, StyleSheet, View, useWindowDimensions} from 'react-native';
import {WHITE} from '../assets/colors';
import {moderateScale} from '../utils/responsiveSize';

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: moderateScale(24),
    paddingHorizontal: moderateScale(16),
  },
  dot: {
    height: moderateScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: WHITE,
    marginHorizontal: moderateScale(8),
  },
});
