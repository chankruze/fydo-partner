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
  Platform,
  ToastAndroid,
} from 'react-native';
import React, { createRef, useEffect, useRef, useState } from 'react';
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
import ImagePicker, { openPicker } from 'react-native-image-crop-picker';
import Cross from '../../assets/icons/cross.svg';
import { CommonActions } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
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
import { setShop, setUser } from '../../store/actions/user.action';
import { getUser, saveUserData } from '../../utils/defaultPreference';
import Toast from 'react-native-simple-toast';

const HEIGHT = Dimensions.get('screen').height;

const snapPoints = [HEIGHT < 872 ? '60%' : '60', HEIGHT < 872 ? '70%' : '70'];
const bottomSheetRef = createRef();

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    // setShop: myshop => dispatch(setShop(myshop))
  };
};

const ShopTiming = props => {
  let rbSheet = useRef();
  const shopDetails = props.route?.params?.data;

  const [images, setImages] = useState(
    shopDetails?.images ? shopDetails?.images : []
  );
  const [timePicker, setTimePicker] = useState(false);
  const [opentimePicker, setOpenTimePicker] = useState(false);
  const [closetimePicker, setCloseTimePicker] = useState(false);
  const [usualOpen, setUsualOpen] = useState(null);
  const [usualClose, setUsualClose] = useState(null);
  const [addTags, setAddTags] = useState(false);
  const [addBreaks, setAddBreaks] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [checked, setChecked] = useState(new Array(7).fill(false));
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [individualTimings, setIndividualTimings] = useState(
    shopDetails?.timing ? shopDetails?.timing :
      [
        {
          timings: {
            startTime: null,
            endTime: null,
          },
          dayOfWeek: 'SUN',
          _id: '62137c449c5674a6e62aed14',
        },
        {
          timings: {
            startTime: null,
            endTime: null,
          },
          dayOfWeek: 'MON',
          _id: '62137c449c5674a6e62aed15',
        },
        {
          timings: {
            startTime: null,
            endTime: null,
          },
          dayOfWeek: 'TUE',
          _id: '62137c449c5674a6e62aed16',
        },
        {
          timings: {
            startTime: null,
            endTime: null,
          },
          dayOfWeek: 'WED',
          _id: '62137c449c5674a6e62aed17',
        },
        {
          timings: {
            startTime: null,
            endTime: null,
          },
          dayOfWeek: 'THU',
          _id: '62137c449c5674a6e62aed18',
        },
        {
          timings: {
            startTime: null,
            endTime: null,
          },
          dayOfWeek: 'FRI',
          _id: '62137c449c5674a6e62aed19',
        },
        {
          timings: {
            startTime: null,
            endTime: null,
          },
          dayOfWeek: 'SAT',
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
            url:
              Platform.OS === 'android'
                ? i.path
                : i.path.replace('file://', ''),
            fileName: Platform.OS == 'ios' ? i.filename
              : i.path.substring(i.path.lastIndexOf('/') + 1)
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

        const data = imageData.map((i, index) => {
          return {
            // uri: i.path,
            url:
              Platform.OS === 'android'
                ? i.path
                : i.path.replace('file://', ''),
            fileName: Platform.OS == 'ios' ? i.filename
              : i.path.substring(i.path.lastIndexOf('/') + 1)
          };
        });
        const newImages = [...images, ...data];
        setImages(newImages);
      })
      .catch(err => {
        console.log(' Error fetching images from gallery ', err);
      });
  };

  const getBlob = async (fileUri) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const renderImages = async () => {
    let { user } = props;
    let fileNames = [], finalImages = [], oldImages = [];
    if (images.length > 0) {
      images.map((i) => {
        if (i.fileName) {
          fileNames.push(uuid.v4(i?.fileName.split(".")[0]))
        } else {
          oldImages.push(i);
        }
      })
      if (fileNames.length > 0) {
        const imageResponse = await generatePresignUrl(user?.accessToken, fileNames);

        imageResponse.map(async (i) => {
          images.map(async (j) => {
            const imageBody = await getBlob(j.url);

            await fetch(i, {
              method: 'PUT',
              body: imageBody
            });
          })
        })

        await imageResponse.map((i) => {
          finalImages.push({ url: i?.split("?")[0] })
        })
        const newAr = [...oldImages, ...finalImages]
        return newAr;
      } else {
        return oldImages;
      }
    } else {
      if (Platform.OS == 'android') {
        ToastAndroid.show('Please select at least one image', ToastAndroid.SHORT);
      } else {
        Toast.show('Please select at least one image', Toast.SHORT);
      }
      // return [];
    }
  };

  const submit = async () => {
    let pics = [];
    const finalImages = await renderImages();
    finalImages.map((i) => {
      pics.push(i.url)
    })
    const prevParams = props?.route?.params?.data;

    try {
      const params = {
        ...prevParams,
        timing: individualTimings,
        images: finalImages,
        pics: pics
      }

      console.log('====================================');
      console.log("params==>", params);
      console.log('====================================');

      let { navigation, user } = props;
      const response = await updateShop(user?.accessToken, params);

      let { setUser } = props;
      if (response) {
        let object = {
          ...user,
          profileComplete: response?.profileComplete
        };
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
      console.log(error);
    }
  };

  const renderImage = image => {
    return (
      <View style={styles.row}>
        <View style={styles.imageMainContainer}>
          <Image
            style={styles.circleContainer}
            source={{
              uri: image.url,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              removeImage(image.url);
            }}
            style={styles.removeIcon}>
            <Cross />
          </TouchableOpacity>
        </View>
      </View>
    );
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
    setOpenTimePicker(!opentimePicker);
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
        } else {
          return item;
        }
      });
    }
    setIndividualTimings(list);
  };

  const setGlobalCloseTime = item => {
    setCloseTimePicker(!closetimePicker);
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
        } else {
          return item;
        }
      });
    }
    setIndividualTimings(list);
  };


  const handleClosedCheckbox = id => {
    const tempArray = checked.map((item, index) => {
      if (index == id) {
        let bool = !item;
        return bool;
      } else {
        return item;
      }
    });
    setChecked(tempArray);

    let list = [];
    list = individualTimings.map((item, index) => {
      if (index == id) {
        let object = item;
        object.timings.startTime = null;
        object.timings.endTime = null;
        return object;
      } else {
        return item;
      }
    });
    setIndividualTimings(list);
  };

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
            width: '12%',
            marginLeft: 5,
            fontFamily: 'Gilroy-Regular',
            fontSize: 14,
            color: '#383B3F',
          }}>
          {item.dayOfWeek.slice(0, 3).toUpperCase()}
        </Text>
        <TouchableOpacity
          style={
            checked[index]
              ? [styles.timeButton, { opacity: 0.5 }]
              : styles.timeButton
          }
          disabled={checked[index]}
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
          style={
            checked[index]
              ? [styles.timeButton, { opacity: 0.5 }]
              : styles.timeButton
          }
          disabled={checked[index]}
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
            right: 5,
          }}>
          <Text style={styles.closeTxt}>Closed</Text>
          <CheckBox
            style={[styles.radioBtn, { marginLeft: 8 }]}
            value={checked[index]}
            tintColors={{ true: PRIMARY, false: DARKGREY }}
            disabled={false}
            onValueChange={handleClosedCheckbox.bind(this, index)}
          />
        </View>
      </View>
    );
  };

  const removeImage = url => {
    var c = images.filter(i => {
      return i.url !== url;
    });
    setImages(c);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <AddTagsBottomSheet handleClosePress={handleClosePress} />
            </View>

          )}
          {addBreaks && (
            <View>
              <AddBreaksBottomSheet handleClosePress={handleClosePress} />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopTiming);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    // paddingTop: 30,
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
  radioBtn: {
    width: 20,
    height: 20,
  }
});

