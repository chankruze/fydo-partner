import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState, useEffect, createRef} from 'react';


const HEIGHT = Dimensions.get('screen').height;

const ImageSlider = ({images, navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const viewPagerRef = createRef();

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      if (isMounted) {
        if (currentIndex == images?.length - 1) {
          setCurrentIndex(0);
          viewPagerRef?.current?.setPage(0);
        } else {
          viewPagerRef?.current?.setPage(currentIndex + 1);
          setCurrentIndex(currentIndex + 1);
        }
      }
    }, 2500);

    return clearInterval(interval);
  }, []);

  const handleIndicator = ({nativeEvent}) => {
    setCurrentIndex(nativeEvent.position);
  };

  const renderIndicators = () => {
    return images?.map((item, index) => {
      let style =
        currentIndex == index ? styles.activeIndicator : styles.indicator;
      return <View style={style} key={index} />;
    });
  };

  const renderView = ({url}, id) => {
    url;
    return (
      <View style={styles.page} key={id}>
        <Image style={styles.image} source={{uri: url}} />
        {/* <Text style={styles.title}>{title}</Text> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <PagerView
        ref={viewPagerRef}
        style={styles.pagerView}
        onPageSelected={handleIndicator}
        showPageIndicator={false}>
        {images?.map((item, index) => renderView(item, index))}
      </PagerView>
      {true && (
        <>
          <View style={styles.indicators}>{renderIndicators()}</View>
          <View style={styles.toolbar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 5,
              }}>
              <AntDesign name="arrowleft" size={22} color="white" />
            </TouchableOpacity>
            {/* <TouchableOpacity 
        style={styles.favorite}
        onPress={handleFavoriteToggle}>
        <MaterialIcons 
            size={24}
            color={favorite ? 'white': 'white'}
            name={favorite ? 'favorite' : 'favorite-border'}/>
    </TouchableOpacity> */}
          </View>
        </>
      )}
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.5,
  },
  pagerView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  page: {
    flex: 1,
    // backgroundColor: 'blue'
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'lightgrey',
  },
  title: {
    position: 'absolute',
    bottom: 50,
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    letterSpacing: 0.6,
    lineHeight: 21,
  },
  activeIndicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 3,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#505050',
    marginHorizontal: 3,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  toolbar: {
    width: '100%',
    height: 57,
    marginTop: 35,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favorite: {
    marginLeft: 'auto',
  },
});
