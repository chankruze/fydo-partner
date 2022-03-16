import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
} from 'react-native';

import slides from '../utils/slides';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import NextButton from '../components/NextButton';
import SkipButton from '../components/SkipButton';
import { GREY, GREY_2, GREY_3 } from '../assets/colors';

const OnboardingScreen = ({handleFirstLaunch}) => {
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      handleFirstLaunch();
    }
  };

  const skip = ()=> {
    handleFirstLaunch();
  }

  //   const viewConfig = useRef({viewAreaCoveragePercentThresold: 50}).current;
  return (
    <View style={styles.container}>
      <View style={styles.miniContainer}>
        <FlatList
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          // viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <View style={[styles.buttonContainer, {width: width * 0.9}]}>
        <SkipButton skip={skip}/>
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GREY_3,
  },
  miniContainer: {
    flex: 3,
  },
  buttonContainer: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
