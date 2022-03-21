import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageSlider from '../../components/ImageSlider';
import {DARKBLUE, LIGHTBLUE} from '../../assets/colors';
import {response} from '../../utils/dummyStore';
import StoreOffers from '../../components/shop/StoreOffers';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const MyShop = ({navigation}) => {
 const store = response
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [timeView, setTimeView] = useState(false);

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI2MjA0ZTRiYWRiZDJkN2QzODgzNmYwZGUiLCJsb2dpblRpbWUiOjE2NDc3NjA5NjU0ODUsImlhdCI6MTY0Nzc2MDk2NSwiZXhwIjoxNjUwMzg4OTY1fQ.vI4WWLr7ZzcjedC4izPLw9dk1W0VR41Nk840U40pbdo';

  const id = '6204e4badbd2d7d38836f0de';


  const onRefresh = () => {
    setRefreshing(true);
  };

  const handleTiming = () => {
    setTimeView(!timeView);
  };

  const renderTag = item => {
    let {_id, name} = item;
    return (
      <TouchableOpacity key={_id} style={styles.tag}>
        <Text style={styles.tagName}>{name}</Text>
      </TouchableOpacity>
    );
  };

  renderTiming = ({item, index}) => {
    const today = new Date().getDay();
    let d = item.dayOfWeek;

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.dayStyle,
            {
              color: days[today] == d ? DARKBLACK : GREY_2,
            },
          ]}>
          {item.dayOfWeek}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text
            style={[
              styles.startTime,
              {
                color: days[today] == d ? DARKBLACK : GREY_2,
              },
            ]}>
            {item?.timings?.startTime}
            {' - '}
          </Text>
          <Text
            style={[
              styles.endTime,
              {
                color: days[today] == d ? DARKBLACK : GREY_2,
              },
            ]}>
            {item?.timings?.endTime}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={DARKBLUE} />
      </View>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      ListEmptyComponent={
        <View>
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent={true}
          />
          <ImageSlider images={store?.images} navigation={navigation} />
          <View style={styles.contentContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{store?.name}</Text>
            </View>
            {store?.address?.addressLine1 && (
              <Text style={styles.address}>{store?.address?.addressLine1}</Text>
            )}
            <View style={styles.tags}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {store?.categories.map(renderTag)}
              </ScrollView>
            </View>
            {store?.description && (
              <Text style={styles.about}>{store?.description}</Text>
            )}

            <View style={styles.row}>
              
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => handleTiming()}>
                {isOpen ? (
                  <Text style={styles.open}>Open</Text>
                ) : (
                  <Text style={styles.close}>Closed</Text>
                )}
                
              </TouchableOpacity>
            </View>
            {timeView && (
              <View style={styles.timeView}>
                <FlatList
                  data={store?.timing}
                  renderItem={item => renderTiming(item)}
                  ItemSeparatorComponent={() => <View style={{height: 5}} />}
                />
              </View>
            )}
            {/* <OptionsComponent
              id={store?._id}
              type={DeepLinkTypes.STORE}
              navigation={navigation}
              latitude={store?.location[1]}
              longitude={store?.location[0]}
              isFavourite={store?.isFavourite}
              mobile={store?.mobile}
              token={accessToken}
              data={{
                title: store?.name,
                description: store?.description,
                imageUrl: store?.images[0]?.url,
              }}
            /> */}
            <Text style={styles.amenities}>My Amenities</Text>
            {store?.amenities?.length > 0 && (
              <View style={styles.options}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {store?.amenities?.map(({_id, name, iconUrl}) => (
                    <View style={styles.option} key={_id}>
                      {iconUrl &&
                        (iconUrl?.split('.').pop() == 'svg' ? (
                          <SvgCssUri width={50} height={50} uri={iconUrl} />
                        ) : (
                          <Image
                            source={{uri: iconUrl}}
                            style={{
                              width: 50,
                              height: 50,
                            }}
                          />
                        ))}
                      <Text style={styles.optionName}>{name}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View>
            <StoreOffers
              storeId={id}
              token={accessToken}
              navigation={navigation}
            />
          </View>
          <View style={styles.editButton}>
              <TouchableOpacity onPress={()=> navigation.navigate('RegisterShop')}>
              <FontAwesomeIcon name="edit" color="white" size={25}/>

              </TouchableOpacity>
          </View>
        </View>
      }></FlatList>
  );
};

export default MyShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    marginTop: 9,
    padding: 15,
    flex: 1,
  },
  name: {
    color: '#1F2630',
    fontSize: 22,
    fontFamily: 'Gilroy-Bold',
    letterSpacing: 0.3,
  },
  about: {
    lineHeight: 22,
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    color: '#FE3838',
    // fontWeight: '600',
    fontFamily: 'Gilroy-Semibold',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  open: {
    color: '#42ba96',
    fontFamily: 'Gilroy-Semibold',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  timing: {
    fontWeight: '500',
    fontSize: 12,
    color: '#5E7278',
    marginLeft: 15,
  },
  amenities: {
    color: '#1F2630',
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    letterSpacing: 0.3,
  },
  options: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  option: {
    width: Dimensions.get('screen').width / 4 - 10,
    minHeight: 80,
    marginHorizontal: 17,
    alignItems: 'center',
  },
  optionIcon: {
    width: 24,
    height: 24,
  },
  optionName: {
    fontSize: 12,
    lineHeight: 16,
    color: '#5E7278',
    textAlign: 'center',
    marginVertical: 7,
    fontFamily: 'Gilroy-Regular',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1F2630',
    paddingHorizontal: 20,
  },
  subContainer: {
    marginVertical: 5,
  },
  otherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '400',
    fontSize: 13,
    color: '#5E7278',
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  tag: {
    marginRight: 20,
    backgroundColor: LIGHTBLUE,
    height: 34,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  tagName: {
    fontSize: 12,
    color: DARKBLUE,
    fontWeight: '500',
  },
  buttons: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  websiteButton: {
    flex: 1,
    height: 44,
    borderWidth: 0.4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderColor: 'rgba(0, 53, 121, 0.3)',
    marginRight: 4,
    flexDirection: 'row',
  },
  callButton: {
    flex: 1,
    height: 44,
    borderWidth: 0.4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03D618',
    borderColor: 'rgba(0, 53, 121, 0.3)',
    marginLeft: 4,
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#5E7278',
    lineHeight: 22,
    fontSize: 13,
  },
  buttonIcon: {
    height: 18,
    width: 18,
    resizeMode: 'center',
    marginRight: 10,
  },
  addressContainer: {
    margin: 20,
    marginVertical: 0,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: 'rgba(25, 0, 0, 0.4)',
    // fontWeight: '500',
    letterSpacing: 0.3,
    lineHeight: 22,
    // marginVertical: 5
  },
  timeView: {
    marginHorizontal: 10,
  },
  dayStyle: {
    width: '10%',
    fontFamily: 'Gilroy-Semibold',
    textTransform: 'capitalize',
  },
  startTime: {
    fontFamily: 'Gilroy-Medium',
    paddingLeft: 10,
  },
  editButton: {
      position: 'absolute', 
      width: 50,
      height: 50,
      bottom: 50,
      right: 30,
      backgroundColor: DARKBLUE,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center'
  }
});
