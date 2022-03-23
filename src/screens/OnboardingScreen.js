import React, {useState, useRef, createRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
  Dimensions,
  StatusBar,
  Alert
} from 'react-native';

import slides from '../utils/slides';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import NextButton from '../components/NextButton';
import SkipButton from '../components/SkipButton';
import {GREY, GREY_2, GREY_3} from '../assets/colors';
import {Modal} from 'react-native';
import AuthNavigation from './../navigations/authNavigation';
import PhoneLoginScreen from './PhoneLoginScreen';
import OTPVerifyScreen from './OTPVerifyScreen';
import ChooseLanguage from './ChooseLanguage';
import { SCREENS } from '../constants/authScreens';
import { connect } from 'react-redux';

const HEIGHT = Dimensions.get('screen').height;

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user
  }
}


const OnboardingScreen = (props) => {
  let {navigation, user} = props;

  const [navigationData, setNavigationData] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(SCREENS.PHONE_LOGIN)
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const bottomSheetRef = createRef();

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
    setCurrentScreen(screen);
    setNavigationData(data);
  }

  const skip = () => {
    // navigateToAuth();
    setShowBottomSheet(true);
    // setFinished(true);
  };
  
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
        <SkipButton skip={skip} />
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        />
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={showBottomSheet}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setShowBottomSheet(false)
          }}>
            <StatusBar 
              backgroundColor={'rgba(0, 0, 0, .3)'} 
              barStyle="light-content"/>
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, .3)'}}></View>
          
         {currentScreen == SCREENS.PHONE_LOGIN && (<PhoneLoginScreen {...props} handleNextScreen={handleNextScreen}/>)}
         {currentScreen == SCREENS.LANGUAGE && (<ChooseLanguage {...props} handleNextScreen={handleNextScreen}/>)}
         {currentScreen == SCREENS.OTP_VERIFY && (<OTPVerifyScreen {...props} handleNextScreen={handleNextScreen} navigationData={navigationData}/>)}
      </Modal>
    </View>
  );
};

export default connect(mapStateToProps)(OnboardingScreen);

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
