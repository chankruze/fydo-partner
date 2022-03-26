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
import {GREY, GREY_2, GREY_3, PRIMARY} from '../assets/colors';
import {Modal} from 'react-native';
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
    // handleFirstLaunch();
    setCurrentIndex(3);
  //   setFinished(true);
  // };

    // navigateToAuth();
    setShowBottomSheet(true);
    // setFinished(true);
  };
  
  //   const viewConfig = useRef({viewAreaCoveragePercentThresold: 50}).current;
  return (
    <View style={(currentIndex == 3) ? styles.container2 : styles.container1}>
      <StatusBar translucent={false} backgroundColor={PRIMARY}/>
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
      
       <Modal
          animationType="slide"
          transparent={true}
          visible={showBottomSheet}>
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
