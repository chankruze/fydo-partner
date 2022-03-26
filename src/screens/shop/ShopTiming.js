import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { createRef, useRef, useState } from 'react';
import { Checkbox } from 'react-native-paper';
import {
  DARKBLACK,
  DARKBLUE,
  DARKGREY,
  GREEN,
  GREY,
  GREY_2,
  LIGHTBLUE,
  PRIMARY,
} from '../../assets/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Cross from '../../assets/icons/cross.svg';
import { CommonActions } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../components/ButtonComponent';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AddTags from './AddTags';
import AddBreaks from './AddBreaksBottomSheet';
import AddTagsBottomSheet from '../../components/home/AddTagsBottomSheet';
import AddBreaksBottomSheet from './AddBreaksBottomSheet';
import { updateShop } from '../../services/shopService';
import { connect } from 'react-redux';
import { generatePresignUrl } from '../../services/presignUrlService';
import uuid from 'react-native-uuid';
import { setUser } from '../../store/actions/user.action';
import { saveUserData } from '../../utils/sharedPreferences';

const HEIGHT = Dimensions.get('screen').height;

const snapPoints = [HEIGHT < 872 ? '60%' : '60', HEIGHT < 872 ? '70%' : '70'];
const bottomSheetRef = createRef();

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

const ShopTiming = (props) => {
  let rbSheet = useRef();
  const [images, setImages] = useState([]);
  const [timePicker, setTimePicker] = useState(false);
  const [opentimePicker, setOpenTimePicker] = useState(false);
  const [closetimePicker, setCloseTimePicker] = useState(false);
  const [checked, setChecked] = useState(false);
  const [usualOpen, setUsualOpen] = useState(null);
  const [usualClose, setUsualClose] = useState(null);
  const [addTags, setAddTags] = useState(false);
  const [addBreaks, setAddBreaks] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [individualTimings, setIndividualTimings] = useState([
    {
      timings: {
        startTime: null,
        endTime: null,
      },
      dayOfWeek: 'Sunday',
      _id: '62137c449c5674a6e62aed14',
    },
    {
      timings: {
        startTime: null,
        endTime: null,
      },
      dayOfWeek: 'Monday',
      _id: '62137c449c5674a6e62aed15',
    },
    {
      timings: {
        startTime: null,
        endTime: null,
      },
      dayOfWeek: 'Tuesday',
      _id: '62137c449c5674a6e62aed16',
    },
    {
      timings: {
        startTime: null,
        endTime: null,
      },
      dayOfWeek: 'Wednesday',
      _id: '62137c449c5674a6e62aed17',
    },
    {
      timings: {
        startTime: null,
        endTime: null,
      },
      dayOfWeek: 'Thursday',
      _id: '62137c449c5674a6e62aed18',
    },
    {
      timings: {
        startTime: null,
        endTime: null,
      },
      dayOfWeek: 'Friday',
      _id: '62137c449c5674a6e62aed19',
    },
    {
      timings: {
        startTime: null,
        endTime: null,
      },
      dayOfWeek: 'Saturday',
      _id: '62137c449c5674a6e62aed1a',
    },
  ]);

  const selectImages = () => {
    rbSheet.open();
  };

  const handleClosePress = () => {
    setAddTags(false);
    setAddBreaks(false);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        let imageData = [image];

        const data = imageData.map(i => {
          return {
            // uri: i.path,
            uri:
              Platform.OS === 'android'
                ? i.path
                : i.path.replace('file://', '')
          };
        });

        const newImages = [...images, ...data];

        setImages(newImages);
      })
      .catch(err => {
        console.log(' Error fetching image from Camera roll ', err);
      });
  };

  const choosePhotosFromGallery = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      // multiple: true,
      waitAnimationEnd: false,
      cropping: true,
      // includeExif: true,
      forceJpg: true,
    })
      .then(res => {
        let imageData = [res];
        console.log("sdf-->", imageData);

        const data = imageData.map((i, index) => {
          return {
            // uri: i.path,
            uri:
              Platform.OS === 'android'
                ? i.path
                : i.path.replace('file://', ''),
          };
        });
        const newImages = [...images, ...data];
        setImages(newImages);
      })
      .catch(err => {
        console.log(' Error fetching images from gallery ', err);
      });
  };

  const renderImages = async () => {
    let img = [], finalImages = [];
    if (images.length > 0) {
      images.map((i) => {
        img.push(uuid.v4(i))
      })

      console.log("hj==>", img);
      const imageResponse = await generatePresignUrl(props?.user?.accessToken, img);
      const data = await imageResponse.json();
      data.map((i) => {
        finalImages.push({ uri: i?.split("?")[0] })
      })
      return finalImages;
    } else {
      return [];
    }
  }

  const submit = async () => {
    let {setUser} = props;
    const finalImages = await renderImages();

    const prevParams = props?.route?.params?.data;

    try {
      const params = {
        name: prevParams.name,
        mobile: prevParams.mobile,
        type: prevParams.type,
        timing: individualTimings,
        images: finalImages
      }

      let {accessToken, navigation} = props;
      const response = await updateShop(accessToken, params);

      const json = await response.json();
      if(json){
        let object = Object.assign({...props?.user}, {...json});
        console.log()
        setUser(object);
        saveUserData(object);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Main' },
            ],
          })
        );
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderImage = image => {
    return (
      <View style={styles.row}>
        <View style={styles.imageMainContainer}>
          <Image
            style={styles.circleContainer}
            source={{
              uri: image.uri,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              removeImage(image.uri);
            }}
            style={styles.removeIcon}>
            <Cross />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const setGlobalTime = () => {
    setTimePicker(!timePicker);
  };

  const handleOpenTimePicker = id => {
    setOpenTimePicker(!opentimePicker);
    setSelectedDay(id);
  };

  const handleCloseTimePicker = id => {
    setCloseTimePicker(!closetimePicker);
    setSelectedDay(id);
  };

  const setGlobalOpenTime = item => {
    const d = moment(item).format('hh:mm A');
    let list = [];
    if (selectedDay == 'all') {
      setUsualOpen(d);

      list = individualTimings.map(item => {
        item.timings.startTime = d;
        return item;
      });
    } else {
      list = individualTimings.map(item => {
        if (item._id == selectedDay) {
          let object = item;
          object.timings.startTime = d;
          return object;
        }
        else {
          return item;
        }
      });
    }
    setIndividualTimings(list);
    console.log(JSON.stringify(list, null, 2));
    console.log('12-->', d);

  };

  const setGlobalCloseTime = item => {
    const d = moment(item).format('hh:mm A');
    let list = [];
    if (selectedDay == 'all') {
      setUsualClose(d);

      list = individualTimings.map(item => {
        item.timings.endTime = d;
        return item;
      });
    } else {
      list = individualTimings.map(item => {
        if (item._id == selectedDay) {
          let object = item;
          object.timings.endTime = d;
          return object;
        }
        else {
          return item;
        }
      });
    }
    setIndividualTimings(list);
    console.log(JSON.stringify(list, null, 2));
    console.log('12-->', d);
  };

  const setCloseStore = (item, data) => {
    // list = individualTimings.map(item => {
    //   item.timings.startTime = d;
    //   return item;
    // });
  }

  const renderTimings = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <Text
          style={{
            width: '23%',
            marginLeft: 5,
            fontFamily: 'Gilroy-Regular',
            fontSize: 14,
            color: '#383B3F',
          }}>
          {item.dayOfWeek}
        </Text>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={handleOpenTimePicker.bind(this, item._id)}>
          {individualTimings[index].timings.startTime ? (
            <Text style={styles.openTime}>
              {individualTimings[index].timings.startTime}
            </Text>
          ) : (
            <Text style={styles.timeTxt}>Open Time</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={handleCloseTimePicker.bind(this, item._id)}>
          {individualTimings[index].timings.endTime ? (
            <Text style={styles.closeTime}>
              {individualTimings[index].timings.endTime}
            </Text>
          ) : (
            <Text style={styles.timeTxt}>Close Time</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.closeTxt}>Closed</Text>
          <RadioButton
            color={PRIMARY}
            status={checked ? 'checked' : 'unchecked'}
            onPress={(data) => setCloseStore(item, data)}
          />
        </View>
      </View>
    );
  };

  const handleAddTags = () => {
    setAddTags(true);
  };

  const handleAddBreaks = () => {
    setAddBreaks(true);
  };

  const removeImage = uri => {
    var c = images.filter(i => {
      return i.uri !== uri;
    });
    setImages(c);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.imageTitle}>Add Shop Images</Text>
          <View style={styles.btnViewContainer}>
            <TouchableOpacity style={styles.button} onPress={selectImages}>
              <Image
                source={require('../../assets/images/add_image.png')}
                style={{
                  width: 29,
                  height: 29,
                }}
              />
            </TouchableOpacity>

            <ScrollView
              style={styles.imgContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {images
                ? images.map(i => (
                  <View style={styles.imgView} key={i.uri}>
                    {renderImage(i)}
                  </View>
                ))
                : null}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          <Text style={styles.imageTitle}>Add Timing</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.usualText}>Usual Timing</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={handleOpenTimePicker.bind(this, 'all')}>
              {usualOpen ? (
                <Text style={styles.timeTxt}>{usualOpen}</Text>
              ) : (
                <Text style={styles.timeTxt}>Open Time</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={handleCloseTimePicker.bind(this, 'all')}>
              {usualClose ? (
                <Text style={styles.timeTxt}>{usualClose}</Text>
              ) : (
                <Text style={styles.timeTxt}>Close Time</Text>
              )}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={opentimePicker}
              mode="time"
              onConfirm={setGlobalOpenTime}
              onCancel={setOpenTimePicker}
            />
            <DateTimePickerModal
              isVisible={closetimePicker}
              mode="time"
              onConfirm={setGlobalCloseTime}
              onCancel={setCloseTimePicker}
            />
          </View>
          <View
            style={{
              marginTop: 15,
            }}>
            <FlatList data={individualTimings} renderItem={renderTimings} />
          </View>
        </View>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleAddBreaks}
            style={styles.transparentButton}>
            <Text style={styles.buttonText}>Add Break</Text>
            <MaterialIcons
              name="add-circle-outline"
              size={20}
              color={PRIMARY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddTags}
            style={styles.transparentButton}>
            <Text style={styles.buttonText}>Add Tags</Text>
            <Ionicons name="pricetag-outline" size={19} color={PRIMARY} />
          </TouchableOpacity>
        </View> */}

        <View style={styles.btn}>
          <ButtonComponent
            label="Done"
            color="white"
            backgroundColor={PRIMARY}
            onPress={submit}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>By continuing you agree to our</Text>
          <TouchableOpacity>
            <Text style={styles.footerOtherLabel}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={ref => (rbSheet = ref)}
          height={200}
          openDuration={150}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}>
          <View style={styles.chooseTextStyle}>
            <Text style={styles.chooseContainer}>Choose Images from</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={styles.buttonChoose}
              onPress={takePhotoFromCamera}>
              <Image
                source={require('../../assets/images/camera.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: PRIMARY,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonChoose}
              onPress={choosePhotosFromGallery}>
              <Image
                source={require('../../assets/images/gallery.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: PRIMARY,
                }}
              />
            </TouchableOpacity>
          </View>
        </RBSheet>
        {addTags && (
          <View>
              <AddTagsBottomSheet handleClosePress={handleClosePress}/>
          </View>

        )}
        {addBreaks && (
         <View>
           <AddBreaksBottomSheet handleClosePress={handleClosePress}/>
         </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopTiming);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  imageTitle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 18,
    letterSpacing: 0.3,
    color: DARKBLACK,
  },
  btnViewContainer: {
    flexDirection: 'row',
    height: 190,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ECECEC',
    borderWidth: 0.4,
    borderRadius: 20,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 112,
    height: 160,
  },
  buttonChoose: {
    backgroundColor: '#ECECEC',
    borderWidth: 0.4,
    borderRadius: 20,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 100,
    height: 100,
    marginTop: 7,
  },
  imgView: {
    // width: 75,
    // marginHorizontal: 25
  },
  imgContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  chooseContainer: {
    color: '#282828',
    fontFamily: 'Gilroy-SemiBold',
    marginVertical: 7,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  chooseTextStyle: {
    padding: 10,
  },
  row: {
    width: 112,
    height: 190,
    justifyContent: 'center',
    marginHorizontal: 8,
    // marginTop: 10,
  },
  imageMainContainer: {
    flexDirection: 'row',
    width: 112,
    height: 160,
  },
  circleContainer: {
    width: 112,
    height: 160,
    borderWidth: 0.4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  removeIcon: {
    width: 30,
    height: 30,
    right: 20,
    bottom: 15,
    zIndex: 999,
  },
  globalTimeButton: {
    width: '30%',
    height: 30,
    borderRadius: 4,
    borderColor: 'rgba(77, 83, 91, 0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  timeButton: {
    width: '20%',
    height: 30,
    borderRadius: 4,
    borderColor: 'rgba(77, 83, 91, 0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  usualText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: '#4D535BCC',
    letterSpacing: 0.3,

  },
  timeTxt: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: 'black',
    letterSpacing: 0.3,

  },
  openTime: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: GREEN,
    letterSpacing: 0.3,

  },
  closeTime: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: 'red',
    letterSpacing: 0.3,

  },
  closeTxt: {
    marginLeft: 30,
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#383B3F',
    letterSpacing: 0.3,

  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 14,
    color: PRIMARY,
    marginRight: 10,
    letterSpacing: 0.3,

  },
  transparentButton: {
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: LIGHTBLUE,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  btn: {
    marginTop: 20,
    width: '85%',
    alignSelf: 'center',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footerLabel: {
    fontSize: 13,
    color: DARKGREY,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
  footerOtherLabel: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: '500',
    marginTop: 3,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
});
