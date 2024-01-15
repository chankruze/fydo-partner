import React, {createRef, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import {connect} from 'react-redux';
import {PRIMARY} from '../assets/colors';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import SkipButton from '../components/SkipButton';
import WithNetInfo from '../components/hoc/withNetInfo';
import {SCREENS} from '../constants/authScreens';
import slides from '../utils/slides';
import OTPVerifyScreen from './OTPVerifyScreen';
import PhoneLoginScreen from './PhoneLoginScreen';

const HEIGHT = Dimensions.get('screen').height;

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

const OnboardingScreen = props => {
  let {navigation, user} = props;

  const [navigationData, setNavigationData] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(SCREENS.PHONE_LOGIN);
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [scrollEnable, setScrollEnable] = useState(true);

  const bottomSheetRef = createRef();

  React.useEffect(() => {
    if (showBottomSheet) {
      setScrollEnable(false);
    }
  }, [showBottomSheet]);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      // navigateToAuth();
      setShowBottomSheet(true);
      // setFinished(true);
    }
  };

  const handleNextScreen = (screen, data) => {
    console.log('kl==>', screen, data);
    setCurrentScreen(screen);
    setNavigationData(data);
  };

  const skip = () => {
    setCurrentIndex(3);

    setShowBottomSheet(true);
  };

  //   const viewConfig = useRef({viewAreaCoveragePercentThresold: 50}).current;
  return (
    <SafeAreaView
      style={currentIndex === 3 ? styles.container2 : styles.container1}>
      <StatusBar
        translucent={false}
        backgroundColor={PRIMARY}
        barStyle="default"
      />
      <View style={styles.miniContainer}>
        {currentIndex === 3 ? null : (
          <View style={styles.skipBtn}>
            <SkipButton skip={skip} />
          </View>
        )}
        <FlatList
          ref={slidesRef}
          scrollEnabled={scrollEnable}
          data={slides}
          renderItem={({item}) => (
            <OnboardingItem
              item={item}
              index={currentIndex}
              finish={skip}
              next={() => scrollTo(currentIndex + 1)}
            />
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
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={showBottomSheet}> */}
      {showBottomSheet && (
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            height: HEIGHT * 0.6,
            width: '100%',
          }}>
          {/* <StatusBar
            backgroundColor={'rgba(0, 0, 0, .3)'}
            barStyle="light-content" /> */}
          {/* <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .3)' }}></View> */}

          {currentScreen === SCREENS.PHONE_LOGIN && (
            <PhoneLoginScreen {...props} handleNextScreen={handleNextScreen} />
          )}
          {/* {currentScreen===SCREENS.LANGUAGE && (<ChooseLanguage {...props} handleNextScreen={handleNextScreen} />)} */}
          {currentScreen === SCREENS.OTP_VERIFY && navigationData && (
            <OTPVerifyScreen
              {...props}
              handleNextScreen={handleNextScreen}
              navigationData={navigationData}
            />
          )}
          {/* </Modal> */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(WithNetInfo(OnboardingScreen));

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
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
  skipBtn: {
    alignSelf: 'flex-end',
  },
});
