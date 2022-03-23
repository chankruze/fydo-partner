import React, {useState, useRef, createRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
  Dimensions,
} from 'react-native';

import slides from '../utils/slides';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import NextButton from '../components/NextButton';
import SkipButton from '../components/SkipButton';
import {GREY, GREY_2, GREY_3, PRIMARY} from '../assets/colors';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import AuthNavigation from '../navigations/authNavigation';
import {NavigationContainer} from '@react-navigation/native';

const HEIGHT = Dimensions.get('screen').height;

const OnboardingScreen = ({handleFirstLaunch}) => {
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [finished, setFinished] = useState(false);
  const snapPoints = [HEIGHT < 872 ? '60%' : '60', HEIGHT < 872 ? '60%' : '60'];

  const bottomSheetRef = createRef();

  // React.useEffect(()=>{
  //   console.log(currentIndex)
  // }, [currentIndex])

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      handleFirstLaunch();
      // setFinished(true);
    }
  };

  const skip = () => {
    // handleFirstLaunch();
    setCurrentIndex(3);
    setFinished(true);
  };

  return (
    <View style={(currentIndex == 3) ? styles.container2 : styles.container1}>
      <View style={styles.miniContainer}>
        {currentIndex == 3 ? null : (
          <View style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 10}}>
            <SkipButton skip={skip} />
          </View>
        )}

        <FlatList
          data={slides}
          renderItem={({item}) => (
            <OnboardingItem item={item} index={currentIndex} finish = {skip}/>
          )}
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
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      {/* <View style={[styles.buttonContainer]}>
        <SkipButton skip={skip} />
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        />
      </View> */}
      {finished && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          animateOnMount
          enableOverDrag
          handleIndicatorStyle={{backgroundColor: GREY}}>
          <BottomSheetScrollView
            contentContainerStyle={{flex: 1}}
            keyboardShouldPersistTaps="always">
            <NavigationContainer>
              <AuthNavigation />
            </NavigationContainer>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
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
