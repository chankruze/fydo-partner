import CheckBox from '@react-native-community/checkbox';
import {CommonActions} from '@react-navigation/native';
import moment from 'moment';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import {connect} from 'react-redux';
import {DARKGREY, GREEN, LIGHTBLUE, PRIMARY} from '../../assets/colors';
import Cross from '../../assets/icons/cross.svg';
import ButtonComponent from '../../components/ButtonComponent';
import AddTagsBottomSheet from '../../components/home/AddTagsBottomSheet';
import {generatePresignUrl} from '../../services/presignUrlService';
import {updateShop} from '../../services/shopService';
import {setUser} from '../../store/actions/user.action';
import {saveUserData} from '../../utils/defaultPreference';
import AddBreaksBottomSheet from './AddBreaksBottomSheet';

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
    shopDetails?.images ? shopDetails?.images : [],
  );
  const [timePicker, setTimePicker] = useState(false);
  const [opentimePicker, setOpenTimePicker] = useState(false);
  const [closetimePicker, setCloseTimePicker] = useState(false);
  const [usualOpen, setUsualOpen] = useState(null);
  const [usualClose, setUsualClose] = useState(null);
  const [usualBreakStart, setUsualBreakStart] = useState(null);
  const [usualBreakClose, setUsualBreakClose] = useState(null);
  const [addTags, setAddTags] = useState(false);
  const [addBreaks, setAddBreaks] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [checked, setChecked] = useState(new Array(7).fill(false));
  const [breakChecked, setBreakChecked] = useState(new Array(7).fill(false));
  const [pickerType, setPickerType] = useState();
  const [individualTimings, setIndividualTimings] = useState(
    shopDetails?.timing
      ? shopDetails?.timing
      : [
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
        ],
  );
  const [individualBreaks, setIndividualBreaks] = useState(
    shopDetails?.break
      ? shopDetails?.break
      : [
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
        ],
  );
  const [isIndividualTimingChecked, setIsIndividualTimingChecked] =
    useState(false);
  const [isIndividualBreakChecked, setIsIndividualBreakChecked] =
    useState(false);

  useEffect(() => {
    let newBreaks = individualBreaks?.map(i => {
      return {
        ...i,
        break:
          i?.timings?.startTime !== null && i?.timings?.endTime !== null
            ? true
            : false,
      };
    });

    setIndividualBreaks(newBreaks);
  }, []);

  const selectImages = () => {
    rbSheet.open();
  };

  const handleClosePress = () => {
    setAddTags(false);
    setAddBreaks(false);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 1,
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
            fileName:
              Platform.OS === 'ios'
                ? i.filename
                : i.path.substring(i.path.lastIndexOf('/') + 1),
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
      // multiple: true,
      waitAnimationEnd: false,
      cropping: true,
      // includeExif: true,
      forceJpg: true,
      compressImageQuality: 1,
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
            fileName:
              Platform.OS === 'ios'
                ? i.filename
                : i.path.substring(i.path.lastIndexOf('/') + 1),
          };
        });
        const newImages = [...images, ...data];
        setImages(newImages);
      })
      .catch(err => {
        console.log(' Error fetching images from gallery ', err);
      });
  };

  const getBlob = async fileUri => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const renderImages = async () => {
    let {user} = props;
    let fileNames = [],
      finalImages = [],
      oldImages = [];
    if (images?.length > 0) {
      images.map(i => {
        if (i.fileName) {
          fileNames.push(uuid.v4(i?.fileName.split('.')[0]));
        } else {
          oldImages.push(i);
        }
      });
      if (fileNames.length > 0) {
        const imageResponse = await generatePresignUrl(
          user?.accessToken,
          fileNames,
        );

        imageResponse.map(async i => {
          images.map(async j => {
            if (j?.fileName) {
              const imageBody = await getBlob(j.url);

              const data = await fetch(i, {
                method: 'PUT',
                body: imageBody,
              });
            }
          });
        });

        await imageResponse.map(i => {
          finalImages.push({url: i?.split('?')[0]});
        });
        const newAr = [...oldImages, ...finalImages];
        return newAr;
      } else {
        return oldImages;
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Please select at least one image',
          ToastAndroid.SHORT,
        );
      } else {
        Toast.show('Please select at least one image', Toast.SHORT);
      }
      // return [];
    }
  };

  const submit = async () => {
    const selectedBreaks = individualBreaks?.map((item, index) => {
      let object;
      if (item?.break) {
        object = item;
        object.timings.startTime = item?.timings.startTime;
        object.timings.endTime = item?.timings.endTime;
        object.break = true;
      } else {
        object = item;
        object.timings.startTime = null;
        object.timings.endTime = null;
        object.break = false;
      }

      return object;
    });

    let pics = [];
    const finalImages = await renderImages();
    finalImages.map(i => {
      pics.push(i.url);
    });
    const prevParams = props?.route?.params?.data;

    console.log('images==>', finalImages);

    try {
      const params = {
        ...prevParams,
        timing: individualTimings,
        break: selectedBreaks,
        images: finalImages,
        pics: pics,
      };

      let {navigation, user} = props;
      const response = await updateShop(user?.accessToken, params);

      let {setUser} = props;
      if (response) {
        let object = {
          ...user,
          profileComplete: response?.profileComplete,
        };
        setUser(object);
        saveUserData(object);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Main'}],
          }),
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

  const handleOpenTimePicker = (id, type) => {
    setOpenTimePicker(!opentimePicker);
    setSelectedDay(id);
    setPickerType(type);
  };

  const handleCloseTimePicker = (id, type) => {
    setCloseTimePicker(!closetimePicker);
    setSelectedDay(id);
    setPickerType(type);
  };

  const setGlobalOpenTime = item => {
    setOpenTimePicker(!opentimePicker);
    const d = moment(item).format('hh:mm A');
    let list = [];

    if (selectedDay === 'all') {
      if (pickerType === 'break') {
        setUsualBreakStart(d);

        list = individualBreaks.map(i => {
          i.timings.startTime = d;
          return i;
        });
      } else {
        setUsualOpen(d);

        list = individualTimings.map(i => {
          i.timings.startTime = d;
          return i;
        });
      }
    } else {
      if (pickerType === 'break') {
        list = individualBreaks.map(i => {
          if (i._id === selectedDay) {
            let object = i;
            object.timings.startTime = d;
            return object;
          } else {
            return i;
          }
        });
      } else {
        list = individualTimings.map(i => {
          if (i._id === selectedDay) {
            let object = i;
            object.timings.startTime = d;
            return object;
          } else {
            return i;
          }
        });
      }
    }
    if (pickerType === 'break') {
      setIndividualBreaks(list);
    } else {
      setIndividualTimings(list);
    }
  };

  const setGlobalCloseTime = item => {
    setCloseTimePicker(!closetimePicker);
    const d = moment(item).format('hh:mm A');
    let list = [];
    if (selectedDay === 'all') {
      if (pickerType === 'break') {
        setUsualBreakClose(d);

        list = individualBreaks.map(i => {
          i.timings.endTime = d;
          return i;
        });
      } else {
        setUsualClose(d);

        list = individualTimings.map(i => {
          i.timings.endTime = d;
          return i;
        });
      }
    } else {
      if (pickerType === 'break') {
        list = individualBreaks.map(i => {
          if (i._id === selectedDay) {
            let object = i;
            object.timings.endTime = d;
            return object;
          } else {
            return i;
          }
        });
      } else {
        list = individualTimings.map(i => {
          if (i._id === selectedDay) {
            let object = i;
            object.timings.endTime = d;
            return object;
          } else {
            return i;
          }
        });
      }
    }
    if (pickerType === 'break') {
      setIndividualBreaks(list);
    } else {
      setIndividualTimings(list);
    }
  };

  const handleClosedCheckbox = id => {
    const tempArray = checked.map((item, index) => {
      if (index === id) {
        let bool = !item;
        return bool;
      } else {
        return item;
      }
    });
    setChecked(tempArray);

    let list = [];
    list = individualTimings.map((item, index) => {
      if (index === id) {
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

  const handleBreakCheckBox = id => {
    let list = [];
    list = individualBreaks.map((item, index) => {
      if (index === id) {
        let object;
        if (item?.break) {
          object = item;
          object.timings.startTime = null;
          object.timings.endTime = null;
          object.break = false;
        } else {
          object = item;
          object.timings.startTime = individualBreaks[index]?.timings.startTime;
          object.timings.endTime = individualBreaks[index]?.timings.endTime;
          object.break = true;
        }
        return object;
      } else {
        return item;
      }
    });

    setIndividualBreaks(list);
  };

  const renderTimings = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {/* day */}
        <Text
          style={{
            width: '12%',
            fontFamily: 'Gilroy-Bold',
            fontSize: 14,
            color: '#383B3F',
          }}>
          {item.dayOfWeek.slice(0, 3).toUpperCase()}
        </Text>
        {/* open time */}
        <TouchableOpacity
          style={
            checked[index]
              ? [styles.timeButton, {opacity: 0.5}]
              : styles.timeButton
          }
          disabled={checked[index]}
          onPress={handleOpenTimePicker.bind(this, item._id, 'timing')}>
          {individualTimings[index].timings.startTime ? (
            <Text style={styles.openTime}>
              {individualTimings[index].timings.startTime}
            </Text>
          ) : (
            <Text style={styles.timeTxt}>Open Time</Text>
          )}
        </TouchableOpacity>
        {/* close time */}
        <TouchableOpacity
          style={
            checked[index]
              ? [styles.timeButton, {opacity: 0.5}]
              : styles.timeButton
          }
          disabled={checked[index]}
          onPress={handleCloseTimePicker.bind(this, item._id, 'timing')}>
          {individualTimings[index].timings.endTime ? (
            <Text style={styles.closeTime}>
              {individualTimings[index].timings.endTime}
            </Text>
          ) : (
            <Text style={styles.timeTxt}>Close Time</Text>
          )}
        </TouchableOpacity>
        {/* check box */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            right: 5,
          }}>
          <Text style={styles.closeTxt}>Closed</Text>
          <CheckBox
            style={[styles.radioBtn]}
            value={checked[index]}
            tintColors={{true: PRIMARY, false: DARKGREY}}
            disabled={false}
            onValueChange={handleClosedCheckbox.bind(this, index)}
          />
        </View>
      </View>
    );
  };

  const renderBreaks = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <Text
          style={{
            width: '12%',
            fontFamily: 'Gilroy-Bold',
            fontSize: 14,
            color: '#383B3F',
          }}>
          {item.dayOfWeek.slice(0, 3).toUpperCase()}
        </Text>
        <TouchableOpacity
          style={
            checked[index]
              ? [styles.timeButton, {opacity: 0.5}]
              : styles.timeButton
          }
          disabled={checked[index]}
          onPress={handleOpenTimePicker.bind(this, item._id, 'break')}>
          {individualBreaks[index].timings.startTime ? (
            <Text style={styles.openTime}>
              {individualBreaks[index].timings.startTime}
            </Text>
          ) : (
            <Text style={styles.timeTxt}>Open Time</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={
            checked[index]
              ? [styles.timeButton, {opacity: 0.5}]
              : styles.timeButton
          }
          disabled={checked[index]}
          onPress={handleCloseTimePicker.bind(this, item._id, 'break')}>
          {individualBreaks[index].timings.endTime ? (
            <Text style={styles.closeTime}>
              {individualBreaks[index].timings.endTime}
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
          <Text style={styles.closeTxt}>Break</Text>
          {console.log('index123==>', breakChecked[index])}
          <CheckBox
            style={[styles.radioBtn, {marginLeft: 8}]}
            value={item?.break}
            tintColors={{true: PRIMARY, false: DARKGREY}}
            disabled={false}
            onValueChange={handleBreakCheckBox.bind(this, index)}
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* images section */}
        <Text style={styles.title}>Add Shop Images</Text>
        <View style={styles.btnViewContainer}>
          <TouchableOpacity style={styles.button} onPress={selectImages}>
            <Image
              source={require('../../assets/images/add_image.png')}
              style={{
                width: 24,
                height: 24,
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

        {/* timing section */}
        <View
          style={{
            marginTop: 20,
          }}>
          <Text style={styles.title}>Add Timing</Text>
          {/* usual timing */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}>
            <Text style={styles.usualText}>Usual Timing</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={handleOpenTimePicker.bind(this, 'all', 'timing')}>
              {usualOpen ? (
                <Text style={styles.timeTxt}>{usualOpen}</Text>
              ) : (
                <Text style={styles.timeTxt}>Open Time</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={handleCloseTimePicker.bind(this, 'all', 'timing')}>
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
          <View style={styles.individualTimingsCheckBoxContainer}>
            <Text>Add timing on a daily basis?</Text>
            <CheckBox
              value={isIndividualTimingChecked}
              tintColors={{true: PRIMARY, false: DARKGREY}}
              onValueChange={() => {
                setIsIndividualTimingChecked(prev => !prev);
              }}
            />
          </View>
          {isIndividualTimingChecked ? (
            <View
              style={{
                marginTop: 16,
              }}>
              <FlatList data={individualTimings} renderItem={renderTimings} />
            </View>
          ) : null}
        </View>

        {/* break section */}
        <View
          style={{
            marginTop: 20,
          }}>
          <Text style={styles.title}>Add Breaks</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <Text style={styles.usualText}>Break Timing</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={handleOpenTimePicker.bind(this, 'all', 'break')}>
              {usualBreakStart ? (
                <Text style={styles.timeTxt}>{usualBreakStart}</Text>
              ) : (
                <Text style={styles.timeTxt}>Start Time</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={handleCloseTimePicker.bind(this, 'all', 'break')}>
              {usualBreakClose ? (
                <Text style={styles.timeTxt}>{usualBreakClose}</Text>
              ) : (
                <Text style={styles.timeTxt}>End Time</Text>
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
          {/* breaks - daily basis */}
          <View style={styles.individualTimingsCheckBoxContainer}>
            <Text>Add different break timing on different days?</Text>
            <CheckBox
              value={isIndividualBreakChecked}
              tintColors={{true: PRIMARY, false: DARKGREY}}
              onValueChange={() => {
                setIsIndividualBreakChecked(prev => !prev);
              }}
            />
          </View>
          {/* if break customization is checked */}
          {isIndividualBreakChecked ? (
            <View
              style={{
                marginTop: 16,
              }}>
              <FlatList data={individualBreaks} renderItem={renderBreaks} />
            </View>
          ) : null}
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
        {addTags ? (
          <View>
            <AddTagsBottomSheet handleClosePress={handleClosePress} />
          </View>
        ) : null}
        {addBreaks ? (
          <View>
            <AddBreaksBottomSheet handleClosePress={handleClosePress} />
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.next}>
        <ButtonComponent
          label="Done"
          color="white"
          backgroundColor={PRIMARY}
          onPress={submit}
        />
      </View>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopTiming);

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  title: {
    color: PRIMARY,
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
    // borderRadius: 20,
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
    // borderRadius: 20,
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
  },
  timeTxt: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: 'black',
  },
  openTime: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: GREEN,
  },
  closeTime: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: 'red',
  },
  closeTxt: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#383B3F',
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
  },
  footerOtherLabel: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: '500',
    marginTop: 3,
    fontFamily: 'Gilroy-Medium',
  },
  radioBtn: {
    width: 24,
    height: 24,
  },
  next: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  individualTimingsCheckBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Dimensions,
//   Platform,
//   ToastAndroid,
// } from 'react-native';
// import React, { createRef, useEffect, useRef, useState } from 'react';
// import {
//   DARKBLACK,
//   DARKBLUE,
//   DARKGREY,
//   GREEN,
//   GREY,
//   GREY_2,
//   LIGHTBLUE,
//   PRIMARY,
// } from '../../assets/colors';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import ImagePicker, { openPicker } from 'react-native-image-crop-picker';
// import Cross from '../../assets/icons/cross.svg';
// import { CommonActions } from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import CheckBox from '@react-native-community/checkbox';
// import moment from 'moment';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import ButtonComponent from '../../components/ButtonComponent';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import AddTags from './AddTags';
// import AddBreaks from './AddBreaksBottomSheet';
// import AddTagsBottomSheet from '../../components/home/AddTagsBottomSheet';
// import AddBreaksBottomSheet from './AddBreaksBottomSheet';
// import { updateShop } from '../../services/shopService';
// import { connect } from 'react-redux';
// import { generatePresignUrl } from '../../services/presignUrlService';
// import uuid from 'react-native-uuid';
// import { setShop, setUser } from '../../store/actions/user.action';
// import { getUser, saveUserData } from '../../utils/defaultPreference';
// import Toast from 'react-native-simple-toast';

// const HEIGHT = Dimensions.get('screen').height;

// const snapPoints = [HEIGHT < 872 ? '60%' : '60', HEIGHT < 872 ? '70%' : '70'];
// const bottomSheetRef = createRef();

// const mapStateToProps = state => {
//   return {
//     user: state?.userReducer?.user,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     setUser: user => dispatch(setUser(user)),
//     // setShop: myshop => dispatch(setShop(myshop))
//   };
// };

// const ShopTiming = props => {
//   let rbSheet = useRef();
//   const shopDetails = props.route?.params?.data;

//   const [images, setImages] = useState(
//     shopDetails?.images ? shopDetails?.images : []
//   );
//   const [timePicker, setTimePicker] = useState(false);
//   const [opentimePicker, setOpenTimePicker] = useState(false);
//   const [closetimePicker, setCloseTimePicker] = useState(false);
//   const [usualOpen, setUsualOpen] = useState(null);
//   const [usualClose, setUsualClose] = useState(null);
//   const [addTags, setAddTags] = useState(false);
//   const [addBreaks, setAddBreaks] = useState(false);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [checked, setChecked] = useState(new Array(7).fill(false));
//   const days = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//   const [individualTimings, setIndividualTimings] = useState(
//     shopDetails?.timing ? shopDetails?.timing :
//       [
//         {
//           timings: {
//             startTime: null,
//             endTime: null,
//           },
//           dayOfWeek: 'SUN',
//           _id: '62137c449c5674a6e62aed14',
//         },
//         {
//           timings: {
//             startTime: null,
//             endTime: null,
//           },
//           dayOfWeek: 'MON',
//           _id: '62137c449c5674a6e62aed15',
//         },
//         {
//           timings: {
//             startTime: null,
//             endTime: null,
//           },
//           dayOfWeek: 'TUE',
//           _id: '62137c449c5674a6e62aed16',
//         },
//         {
//           timings: {
//             startTime: null,
//             endTime: null,
//           },
//           dayOfWeek: 'WED',
//           _id: '62137c449c5674a6e62aed17',
//         },
//         {
//           timings: {
//             startTime: null,
//             endTime: null,
//           },
//           dayOfWeek: 'THU',
//           _id: '62137c449c5674a6e62aed18',
//         },
//         {
//           timings: {
//             startTime: null,
//             endTime: null,
//           },
//           dayOfWeek: 'FRI',
//           _id: '62137c449c5674a6e62aed19',
//         },
//         {
//           timings: {
//             startTime: null,
//             endTime: null,
//           },
//           dayOfWeek: 'SAT',
//           _id: '62137c449c5674a6e62aed1a',
//         },
//       ]);

//   const selectImages = () => {
//     rbSheet.open();
//   };

//   const handleClosePress = () => {
//     setAddTags(false);
//     setAddBreaks(false);
//   };

//   const takePhotoFromCamera = () => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     })
//       .then(image => {
//         let imageData = [image];

//         const data = imageData.map(i => {
//           return {
//             // uri: i.path,
//             url:
//               Platform.OS === 'android'
//                 ? i.path
//                 : i.path.replace('file://', ''),
//             fileName: Platform.OS==='ios' ? i.filename
//               : i.path.substring(i.path.lastIndexOf('/') + 1)
//           };
//         });

//         const newImages = [...images, ...data];

//         setImages(newImages);
//       })
//       .catch(err => {
//         console.log(' Error fetching image from Camera roll ', err);
//       });
//   };

//   const choosePhotosFromGallery = () => {
//     ImagePicker.openPicker({
//       // width: 300,
//       // height: 400,
//       // multiple: true,
//       waitAnimationEnd: false,
//       cropping: true,
//       // includeExif: true,
//       forceJpg: true,
//     })
//       .then(res => {
//         let imageData = [res];

//         const data = imageData.map((i, index) => {
//           return {
//             // uri: i.path,
//             url:
//               Platform.OS === 'android'
//                 ? i.path
//                 : i.path.replace('file://', ''),
//             fileName: Platform.OS==='ios' ? i.filename
//               : i.path.substring(i.path.lastIndexOf('/') + 1)
//           };
//         });
//         const newImages = [...images, ...data];
//         setImages(newImages);
//       })
//       .catch(err => {
//         console.log(' Error fetching images from gallery ', err);
//       });
//   };

//   const getBlob = async (fileUri) => {
//     const resp = await fetch(fileUri);
//     const imageBody = await resp.blob();
//     return imageBody;
//   };

//   const renderImages = async () => {
//     let { user } = props;
//     let fileNames = [], finalImages = [], oldImages = [];
//     if (images.length > 0) {
//       images.map((i) => {
//         if (i.fileName) {
//           fileNames.push(uuid.v4(i?.fileName.split(".")[0]))
//         } else {
//           oldImages.push(i);
//         }
//       })
//       if (fileNames.length > 0) {
//         const imageResponse = await generatePresignUrl(user?.accessToken, fileNames);

//         imageResponse.map(async (i) => {
//           images.map(async (j) => {
//             const imageBody = await getBlob(j.url);

//             await fetch(i, {
//               method: 'PUT',
//               body: imageBody
//             });
//           })
//         })

//         await imageResponse.map((i) => {
//           finalImages.push({ url: i?.split("?")[0] })
//         })
//         const newAr = [...oldImages, ...finalImages]
//         return newAr;
//       } else {
//         return oldImages;
//       }
//     } else {
//       if (Platform.OS==='android') {
//         ToastAndroid.show('Please select at least one image', ToastAndroid.SHORT);
//       } else {
//         Toast.show('Please select at least one image', Toast.SHORT);
//       }
//       // return [];
//     }
//   };

//   const submit = async () => {
//     let pics = [];
//     const finalImages = await renderImages();
//     finalImages.map((i) => {
//       pics.push(i.url)
//     })
//     const prevParams = props?.route?.params?.data;

//     try {
//       const params = {
//         ...prevParams,
//         timing: individualTimings,
//         images: finalImages,
//         pics: pics
//       }

//       console.log('====================================');
//       console.log("params==>", params);
//       console.log('====================================');

//       let { navigation, user } = props;
//       const response = await updateShop(user?.accessToken, params);

//       let { setUser } = props;
//       if (response) {
//         let object = {
//           ...user,
//           profileComplete: response?.profileComplete
//         };
//         setUser(object);
//         saveUserData(object);
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [
//               { name: 'Main' },
//             ],
//           })
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderImage = image => {
//     return (
//       <View style={styles.row}>
//         <View style={styles.imageMainContainer}>
//           <Image
//             style={styles.circleContainer}
//             source={{
//               uri: image.url,
//             }}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               removeImage(image.url);
//             }}
//             style={styles.removeIcon}>
//             <Cross />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const handleOpenTimePicker = id => {
//     setOpenTimePicker(!opentimePicker);
//     setSelectedDay(id);
//   };

//   const handleCloseTimePicker = id => {
//     setCloseTimePicker(!closetimePicker);
//     setSelectedDay(id);
//   };

//   const setGlobalOpenTime = item => {
//     setOpenTimePicker(!opentimePicker);
//     const d = moment(item).format('hh:mm A');
//     let list = [];
//     if (selectedDay==='all') {
//       setUsualOpen(d);

//       list = individualTimings.map(item => {
//         item.timings.startTime = d;
//         return item;
//       });
//     } else {
//       list = individualTimings.map(item => {
//         if (item._id===selectedDay) {
//           let object = item;
//           object.timings.startTime = d;
//           return object;
//         } else {
//           return item;
//         }
//       });
//     }
//     setIndividualTimings(list);
//   };

//   const setGlobalCloseTime = item => {
//     setCloseTimePicker(!closetimePicker);
//     const d = moment(item).format('hh:mm A');
//     let list = [];
//     if (selectedDay==='all') {
//       setUsualClose(d);

//       list = individualTimings.map(item => {
//         item.timings.endTime = d;
//         return item;
//       });
//     } else {
//       list = individualTimings.map(item => {
//         if (item._id===selectedDay) {
//           let object = item;
//           object.timings.endTime = d;
//           return object;
//         } else {
//           return item;
//         }
//       });
//     }
//     setIndividualTimings(list);
//   };

//   const handleClosedCheckbox = id => {
//     const tempArray = checked.map((item, index) => {
//       if (index===id) {
//         let bool = !item;
//         return bool;
//       } else {
//         return item;
//       }
//     });
//     setChecked(tempArray);

//     let list = [];
//     list = individualTimings.map((item, index) => {
//       if (index===id) {
//         let object = item;
//         object.timings.startTime = null;
//         object.timings.endTime = null;
//         return object;
//       } else {
//         return item;
//       }
//     });
//     setIndividualTimings(list);
//   };

//   const renderTimings = ({ item, index }) => {
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginVertical: 5,
//         }}>
//         <Text
//           style={{
//             width: '12%',
//             marginLeft: 5,
//             fontFamily: 'Gilroy-Regular',
//             fontSize: 14,
//             color: '#383B3F',
//           }}>
//           {item.dayOfWeek.slice(0, 3).toUpperCase()}
//         </Text>
//         <TouchableOpacity
//           style={
//             checked[index]
//               ? [styles.timeButton, { opacity: 0.5 }]
//               : styles.timeButton
//           }
//           disabled={checked[index]}
//           onPress={handleOpenTimePicker.bind(this, item._id)}>
//           {individualTimings[index].timings.startTime ? (
//             <Text style={styles.openTime}>
//               {individualTimings[index].timings.startTime}
//             </Text>
//           ) : (
//             <Text style={styles.timeTxt}>Open Time</Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={
//             checked[index]
//               ? [styles.timeButton, { opacity: 0.5 }]
//               : styles.timeButton
//           }
//           disabled={checked[index]}
//           onPress={handleCloseTimePicker.bind(this, item._id)}>
//           {individualTimings[index].timings.endTime ? (
//             <Text style={styles.closeTime}>
//               {individualTimings[index].timings.endTime}
//             </Text>
//           ) : (
//             <Text style={styles.timeTxt}>Close Time</Text>
//           )}
//         </TouchableOpacity>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             right: 5,
//           }}>
//           <Text style={styles.closeTxt}>Closed</Text>
//           <CheckBox
//             style={[styles.radioBtn, { marginLeft: 8 }]}
//             value={checked[index]}
//             tintColors={{ true: PRIMARY, false: DARKGREY }}
//             disabled={false}
//             onValueChange={handleClosedCheckbox.bind(this, index)}
//           />
//         </View>
//       </View>
//     );
//   };

//   const removeImage = url => {
//     var c = images.filter(i => {
//       return i.url !== url;
//     });
//     setImages(c);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//       <View style={styles.container}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View>
//             <Text style={styles.title}>Add Shop Images</Text>
//             <View style={styles.btnViewContainer}>
//               <TouchableOpacity style={styles.button} onPress={selectImages}>
//                 <Image
//                   source={require('../../assets/images/add_image.png')}
//                   style={{
//                     width: 29,
//                     height: 29,
//                   }}
//                 />
//               </TouchableOpacity>

//               <ScrollView
//                 style={styles.imgContainer}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}>
//                 {images
//                   ? images.map(i => (
//                     <View style={styles.imgView} key={i.uri}>
//                       {renderImage(i)}
//                     </View>
//                   ))
//                   : null}
//               </ScrollView>
//             </View>
//           </View>
//           <View
//             style={{
//               marginTop: 20,
//             }}>
//             <Text style={styles.title}>Add Timing</Text>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: 10,
//               }}>
//               <Text style={styles.usualText}>Usual Timing</Text>
//               <TouchableOpacity
//                 style={styles.timeButton}
//                 onPress={handleOpenTimePicker.bind(this, 'all')}>
//                 {usualOpen ? (
//                   <Text style={styles.timeTxt}>{usualOpen}</Text>
//                 ) : (
//                   <Text style={styles.timeTxt}>Open Time</Text>
//                 )}
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.timeButton}
//                 onPress={handleCloseTimePicker.bind(this, 'all')}>
//                 {usualClose ? (
//                   <Text style={styles.timeTxt}>{usualClose}</Text>
//                 ) : (
//                   <Text style={styles.timeTxt}>Close Time</Text>
//                 )}
//               </TouchableOpacity>
//               <DateTimePickerModal
//                 isVisible={opentimePicker}
//                 mode="time"
//                 onConfirm={setGlobalOpenTime}
//                 onCancel={setOpenTimePicker}
//               />
//               <DateTimePickerModal
//                 isVisible={closetimePicker}
//                 mode="time"
//                 onConfirm={setGlobalCloseTime}
//                 onCancel={setCloseTimePicker}
//               />
//             </View>
//             <View
//               style={{
//                 marginTop: 15,
//               }}>
//               <FlatList data={individualTimings} renderItem={renderTimings} />
//             </View>
//           </View>
//           {/* <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={handleAddBreaks}
//             style={styles.transparentButton}>
//             <Text style={styles.buttonText}>Add Break</Text>
//             <MaterialIcons
//               name="add-circle-outline"
//               size={20}
//               color={PRIMARY}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleAddTags}
//             style={styles.transparentButton}>
//             <Text style={styles.buttonText}>Add Tags</Text>
//             <Ionicons name="pricetag-outline" size={19} color={PRIMARY} />
//           </TouchableOpacity>
//         </View> */}

//           <View style={styles.btn}>
//             <ButtonComponent
//               label="Done"
//               color="white"
//               backgroundColor={PRIMARY}
//               onPress={submit}
//             />
//           </View>
//           <View style={styles.footer}>
//             <Text style={styles.footerLabel}>By continuing you agree to our</Text>
//             <TouchableOpacity>
//               <Text style={styles.footerOtherLabel}>Terms & Conditions</Text>
//             </TouchableOpacity>
//           </View>
//           <RBSheet
//             ref={ref => (rbSheet = ref)}
//             height={200}
//             openDuration={150}
//             customStyles={{
//               container: {
//                 borderTopLeftRadius: 10,
//                 borderTopRightRadius: 10,
//               },
//             }}>
//             <View style={styles.chooseTextStyle}>
//               <Text style={styles.chooseContainer}>Choose Images from</Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-evenly',
//               }}>
//               <TouchableOpacity
//                 style={styles.buttonChoose}
//                 onPress={takePhotoFromCamera}>
//                 <Image
//                   source={require('../../assets/images/camera.png')}
//                   style={{
//                     width: 30,
//                     height: 30,
//                     tintColor: PRIMARY,
//                   }}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.buttonChoose}
//                 onPress={choosePhotosFromGallery}>
//                 <Image
//                   source={require('../../assets/images/gallery.png')}
//                   style={{
//                     width: 30,
//                     height: 30,
//                     tintColor: PRIMARY,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </RBSheet>
//           {addTags && (
//             <View>
//               <AddTagsBottomSheet handleClosePress={handleClosePress} />
//             </View>

//           )}
//           {addBreaks && (
//             <View>
//               <AddBreaksBottomSheet handleClosePress={handleClosePress} />
//             </View>
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopTiming);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: 15,
//     // paddingTop: 30,
//   },
//   title: {
//     fontFamily: 'Gilroy-SemiBold',
//     fontSize: 18,
//
//     color: DARKBLACK,
//   },
//   btnViewContainer: {
//     flexDirection: 'row',
//     height: 190,
//     paddingHorizontal: 5,
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#ECECEC',
//     borderWidth: 0.4,
//     borderRadius: 20,
//     borderColor: 'grey',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     width: 112,
//     height: 160,
//   },
//   buttonChoose: {
//     backgroundColor: '#ECECEC',
//     borderWidth: 0.4,
//     borderRadius: 20,
//     borderColor: 'grey',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     width: 100,
//     height: 100,
//     marginTop: 7,
//   },
//   imgView: {
//     // width: 75,
//     // marginHorizontal: 25
//   },
//   imgContainer: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
//   chooseContainer: {
//     color: '#282828',
//     fontFamily: 'Gilroy-SemiBold',
//     marginVertical: 7,
//     fontSize: 16,
//
//   },
//   chooseTextStyle: {
//     padding: 10,
//   },
//   row: {
//     width: 112,
//     height: 190,
//     justifyContent: 'center',
//     marginHorizontal: 8,
//     // marginTop: 10,
//   },
//   imageMainContainer: {
//     flexDirection: 'row',
//     width: 112,
//     height: 160,
//   },
//   circleContainer: {
//     width: 112,
//     height: 160,
//     borderWidth: 0.4,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   removeIcon: {
//     width: 30,
//     height: 30,
//     right: 20,
//     bottom: 15,
//     zIndex: 999,
//   },
//   globalTimeButton: {
//     width: '30%',
//     height: 30,
//     borderRadius: 4,
//     borderColor: 'rgba(77, 83, 91, 0.2)',
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 15,
//   },
//   timeButton: {
//     width: '20%',
//     height: 30,
//     borderRadius: 4,
//     borderColor: 'rgba(77, 83, 91, 0.2)',
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 15,
//   },
//   usualText: {
//     fontFamily: 'Gilroy-Medium',
//     fontSize: 15,
//     color: '#4D535BCC',
//
//   },
//   timeTxt: {
//     fontFamily: 'Gilroy-Medium',
//     fontSize: 12,
//     color: 'black',
//
//   },
//   openTime: {
//     fontFamily: 'Gilroy-Medium',
//     fontSize: 12,
//     color: GREEN,
//
//   },
//   closeTime: {
//     fontFamily: 'Gilroy-Medium',
//     fontSize: 12,
//     color: 'red',
//
//   },
//   closeTxt: {
//     marginLeft: 30,
//     fontFamily: 'Gilroy-Regular',
//     fontSize: 14,
//     color: '#383B3F',
//
//   },
//   buttonContainer: {
//     marginTop: 20,
//     flexDirection: 'row',
//     width: '95%',
//     justifyContent: 'space-between',
//     alignSelf: 'center',
//   },
//   buttonText: {
//     fontFamily: 'Gilroy-Bold',
//     fontSize: 14,
//     color: PRIMARY,
//     marginRight: 10,
//
//   },
//   transparentButton: {
//     paddingVertical: 4,
//     borderWidth: 1,
//     borderColor: LIGHTBLUE,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '48%',
//   },
//   btn: {
//     marginTop: 20,
//     width: '85%',
//     alignSelf: 'center',
//   },
//   footer: {
//     padding: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   footerLabel: {
//     fontSize: 13,
//     color: DARKGREY,
//     fontFamily: 'Gilroy-Medium',
//
//   },
//   footerOtherLabel: {
//     fontSize: 13,
//     color: PRIMARY,
//     fontWeight: '500',
//     marginTop: 3,
//     fontFamily: 'Gilroy-Medium',
//
//   },
//   radioBtn: {
//     width: 20,
//     height: 20,
//   }
// });
