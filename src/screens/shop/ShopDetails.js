import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import {
  DARKBLACK,
  DARKBLUE,
  DARKGREY,
  GREY,
  GREY_2,
  GREY_3,
  PRIMARY,
} from '../../assets/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import ToastMessage from '../../components/common/ToastComponent';
import {getAmenities, getCategories} from '../../services/shopService';
import {getValue} from '../../utils/sharedPreferences';

const WIDTH = Dimensions.get('screen').width;

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

const ShopDetails = ({navigation, route, user}) => {
  const shopDetails = route?.params?.data;
  const [learnMore, setLearnMore] = useState(false);
  const [premiumService, setPremiumService] = useState(
    shopDetails?.isChannelPartner ? true : false,
  );
  const [salesExecutive, setSalesExecutive] = useState(
    shopDetails?.onboardedThroughExecutive ? true : false,
  );
  const [phonenum, setPhoneNum] = useState(
    shopDetails?.onboardedThroughExecutive
      ? shopDetails?.onboardedThroughExecutive
      : '',
  );
  const [error, setError] = useState(null);
  const [accountNumber, setAccountNumber] = useState(
    shopDetails?.bankDetails?.accNumber
      ? shopDetails?.bankDetails?.accNumber
      : '',
  );
  const [commissionPercentage, setCommissionPercentage] = useState(
    shopDetails?.bankDetails?.commissionPercentage
      ? shopDetails?.bankDetails?.commissionPercentage
      : '',
  );
  const [bankName, setBankName] = useState(
    shopDetails?.bankDetails?.name ? shopDetails?.bankDetails?.name : '',
  );
  const [IFSC, setIFSC] = useState(
    shopDetails?.bankDetails?.ifsc ? shopDetails?.bankDetails?.ifsc : '',
  );
  const [email, setEmail] = useState(
    shopDetails?.bankDetails?.emailId ? shopDetails?.bankDetails?.emailId : '',
  );
  const [UPI, setUPI] = useState('');
  const [upiList, setUpiList] = useState(
    shopDetails?.bankDetails?.upiIds ? shopDetails?.bankDetails?.upiIds : [],
  );
  const [amenities, setAmenities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [newAmenities, setNewAmenities] = useState([]);
  const [key, setKey] = useState(0);
  const [upiKey, setUpiKey] = useState(0);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [qrScan, setQrScan] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('jl==>', shopDetails);
    async function getUpiId() {
      const upiId = await getValue('upiId');
      if (upiId) {
        setUPI(upiId);
        await AsyncStorage.removeItem('upiId');
      }
    }

    getUpiId();
    fetchAllAmenities();
    fetchAllCategories();
  }, [isFocused]);

  useEffect(() => {
    fetchOldAmenities();
  }, [amenities]);

  useEffect(() => {
    setValue(shopDetails?.categories);
  }, []);

  const fetchOldAmenities = () => {
    if (shopDetails?.amenities?.length > 0) {
      var newAme = amenities?.filter(function (o1) {
        return shopDetails?.amenities.some(function (o2) {
          return o1._id === o2;
        });
      });
      let newA = [];
      newAme.forEach(i => {
        // let data = {
        //   _id: i._id,
        //   name: i.name,
        //   iconUrl: i.iconUrl
        // }
        newA.push(i?._id);
      });
      setNewAmenities(newA);
    }
  };

  const fetchAllAmenities = async () => {
    try {
      const response = await getAmenities(user?.accessToken);
      setAmenities(response);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await getCategories(user?.accessToken);
      let newArr = response.map(i => {
        return {
          label: i?.name,
          value: i?._id,
        };
      });
      setCategories(newArr);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAmenityCheckbox = (checked, item) => {
    if (checked) {
      newAmenities.push(item?._id);
      setKey(Math.random());
      setNewAmenities(newAmenities);
      return;
    } else {
      const remove = newAmenities?.filter(i => {
        return i !== item?._id;
      });
      setKey(Math.random());
      setNewAmenities(remove);
    }
  };

  const checkAmenities = id => {
    return newAmenities?.includes(id);
  };

  const renderAmenities = ({item, index}) => {
    return (
      <View
        key={key}
        style={{
          flexDirection: 'row',
          width: '50%',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 5,
        }}>
        <Text style={styles.radioText}>{item.name}</Text>
        <CheckBox
          key={item._id}
          style={styles.radioBtn}
          value={checkAmenities(item._id)}
          tintColors={{true: PRIMARY, false: DARKGREY}}
          disabled={false}
          onValueChange={e => handleAmenityCheckbox(e, item)}
        />
      </View>
    );
  };

  const next = () => {
    if (premiumService) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (bankName === '') {
        ToastMessage({message: 'Please enter bank name'});
      } else if (email === '') {
        ToastMessage({message: 'Please enter email'});
      } else if (!reg.test(email?.trim())) {
        ToastMessage({message: 'Please enter valid email'});
      } else if (accountNumber === '') {
        ToastMessage({message: 'Please enter account number'});
      } else if (IFSC === '') {
        ToastMessage({message: 'Please enter ifsc number'});
      } else if (upiList?.length === 0) {
        ToastMessage({message: 'Please enter at least one upi id'});
      } else if (selectedCat?.length === 0) {
        ToastMessage({message: 'Please select at least one category'});
      } else {
        let newData = {
          ...route?.params?.data,
          bankDetails: {
            accNumber: accountNumber,
            ifsc: IFSC,
            name: bankName,
            emailId: email,
            // upiIds: [UPI],
            commissionPercentage: commissionPercentage,
            upiIds: upiList,
          },
          isChannelPartner: premiumService,
          onboardedThroughExecutive: phonenum,
          amenities: newAmenities,
          categories: selectedCat,
        };

        navigation.navigate('ShopTiming', {data: newData});
      }
    } else {
      if (selectedCat?.length === 0) {
        ToastMessage({message: 'Please select at least one category'});
      } else {
        let newData = {
          ...route?.params?.data,
          isChannelPartner: premiumService,
          onboardedThroughExecutive: phonenum,
          amenities: newAmenities,
          categories: selectedCat,
        };
        navigation.navigate('ShopTiming', {data: newData});
      }
    }
  };

  const isValidate = () => {
    const e = {};

    if (accountNumber === null || accountNumber?.trim() === '') {
      e.accountNumber = 'Enter account number';
    }

    if (IFSC === null || IFSC?.trim() === '') {
      e.IFSC = 'Enter IFSC code';
    }

    if (UPI === null || UPI?.trim() === null) {
      e.UPI = 'Enter UPI ID';
    }

    setError(e);

    if (Object.keys(e).length === 0) {
      return true;
    }
    return false;
  };

  const addUpis = () => {
    const regx = /^[\w.-]+@[\w.-]+$/;
    if (regx.test(UPI)) {
      upiList.push(UPI?.trim());
      setUpiKey(Math.random());
    } else {
      ToastMessage({message: 'Please enter valid upi id'});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={Platform.OS === 'ios'}
          nestedScrollEnabled={true}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View style={premiumService && styles.subContainer}>
            <View
              style={
                premiumService
                  ? styles.premiumCheckBox2
                  : styles.premiumCheckBox
              }>
              <View style={{width: '80%', marginLeft: premiumService ? 20 : 0}}>
                <Text style={styles.partnerProgramme}>
                  Do you want to join our channel partner Programme?
                  <Text style={[styles.premiumText, {paddingLeft: 10}]}>
                    {' '}
                    Premium Service{' '}
                  </Text>
                </Text>
              </View>
              <View
                style={[
                  styles.radioBtnView,
                  {
                    right: premiumService ? 20 : 5,
                  },
                ]}>
                <CheckBox
                  style={styles.radioBtn}
                  value={premiumService}
                  tintColors={{true: PRIMARY, false: DARKGREY}}
                  disabled={shopDetails?.isChannelPartner}
                  onValueChange={() => {
                    setPremiumService(!premiumService);
                  }}
                />
              </View>
            </View>
            {premiumService && (
              <View style={{width: '100%'}}>
                <TextInput
                  editable={shopDetails?.isChannelPartner ? false : true}
                  value={bankName}
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  onChangeText={val => setBankName(val)}
                  activeUnderlineColor={GREY_2}
                  placeholder="Bank account holder name"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                />
                <TextInput
                  editable={shopDetails?.isChannelPartner ? false : true}
                  value={accountNumber}
                  style={[styles.input]}
                  selectionColor={DARKBLUE}
                  onChangeText={val => setAccountNumber(val?.trim())}
                  activeUnderlineColor={GREY_2}
                  placeholder="Bank Account Number"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                  keyboardType="number-pad"
                />
                {/* {error.accountNumber && (
                <Text style={styles.error}>{error.accountNumber}</Text>
              )} */}
                <TextInput
                  editable={shopDetails?.isChannelPartner ? false : true}
                  value={IFSC}
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  activeUnderlineColor={GREY_2}
                  onChangeText={val => setIFSC(val?.trim())}
                  placeholder="Bank Account IFSC"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                />
                <TextInput
                  editable={shopDetails?.isChannelPartner ? false : true}
                  value={String(commissionPercentage)}
                  style={[styles.input]}
                  selectionColor={DARKBLUE}
                  onChangeText={val => setCommissionPercentage(val?.trim())}
                  activeUnderlineColor={GREY_2}
                  placeholder="Commission Percentage"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                  keyboardType="number-pad"
                />
                <TextInput
                  editable={shopDetails?.isChannelPartner ? false : true}
                  value={email}
                  style={[styles.input]}
                  selectionColor={DARKBLUE}
                  onChangeText={val => setEmail(val.trim())}
                  activeUnderlineColor={GREY_2}
                  placeholder="Email Address"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                />
                {/* {error.IFSC && (
                <Text style={styles.error}>{error.IFSC}</Text>
              )} */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    editable={shopDetails?.isChannelPartner ? false : true}
                    value={UPI}
                    style={styles.input}
                    selectionColor={DARKBLUE}
                    activeUnderlineColor={GREY_2}
                    onChangeText={val => setUPI(val?.trim())}
                    placeholder="UPI ID"
                    theme={{
                      fonts: {
                        regular: {
                          fontFamily: 'Gilroy-Medium',
                        },
                      },
                    }}
                    right={
                      <TextInput.Icon
                        name={() => (
                          <MaterialIcon
                            disabled={shopDetails?.isChannelPartner}
                            onPress={() => navigation.navigate('QrScan')}
                            name="qr-code-scanner"
                            size={25}
                            color="#000"
                          />
                        )}
                      />
                    }
                  />
                  <TouchableOpacity
                    disabled={shopDetails?.isChannelPartner}
                    onPress={() => addUpis()}
                    style={{}}>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        color: PRIMARY,
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  key={upiKey}
                  data={upiList}
                  style={{
                    marginHorizontal: 30,
                  }}
                  contentContainerStyle={{
                    paddingBottom: 6,
                  }}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        borderColor: GREY,
                        borderWidth: 0.4,
                        marginVertical: 5,
                      }}
                    />
                  )}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 14,
                            flex: 1,
                          }}>
                          {item}
                        </Text>
                        <TouchableOpacity
                          disabled={shopDetails?.isChannelPartner}
                          onPress={() => {
                            upiList.splice(index, 1);
                            setUpiKey(Math.random());
                          }}>
                          <MaterialIcon
                            name="delete"
                            size={20}
                            color={PRIMARY}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {/* {error.UPI && (
                <Text style={styles.error}>{error.UPI}</Text>
              )} */}
                {/* <Text style={styles.upi}>Add More UPI IDs</Text> */}
              </View>
            )}
          </View>
          <View style={{marginVertical: 20}}>
            <View style={styles.radioContainer}>
              <FlatList
                data={amenities}
                renderItem={renderAmenities}
                numColumns={2}
                key={item => item.toString()}
              />
              {/* <View style={styles.radioButton}>
                <Text style={styles.radioText}>Parking availability</Text>
                <CheckBox
                  style={styles.radioBtn}
                  value={parking}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setParking(!parking);
                  }}
                />
              </View>
              <View style={[styles.radioButton, { right: 5, position: 'absolute' }]}>
                <Text style={styles.radioText}>Wheelchair friendly</Text>
                <CheckBox
                  style={[styles.radioBtn]}
                  value={wheelchair}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setWheelchair(!wheelchair);
                  }}
                />
              </View>
            </View>

            <View style={[styles.radioContainer, { marginTop: 8 }]}>
              <View style={styles.radioButton}>
                <Text style={styles.radioText}>Food courts</Text>
                <CheckBox
                  style={styles.radioBtn}
                  value={foodCourt}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setFoodCourt(!foodCourt);
                  }}
                />
              </View>
              <View style={[styles.radioButton, { right: 5, position: 'absolute' }]}>
                <Text style={styles.radioText}>Instore shopping</Text>
                <CheckBox
                  style={styles.radioBtn}
                  value={instoreShopping}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setInstoreShopping(!instoreShopping);
                  }}
                />
              </View> */}
            </View>
          </View>

          {/* <View style={[styles.radioButton, { width: '100%' }]}>
            <View>
              <Text style={styles.radioText}>
                Do you provide home delivery/service?
              </Text>
              <Text style={styles.learnMore}>Learn more about home services</Text>
            </View>

            <CheckBox
              style={[styles.radioBtn, { marginRight: 5 }]}
              value={homeDelivery}
              tintColors={{ true: PRIMARY, false: DARKGREY }}
              disabled={false}
              onValueChange={() => {
                setHomeDelivery(!homeDelivery);
              }}
            />
          </View> */}

          <View
            style={{
              marginBottom: 10,
              ...Platform.select({
                ios: {
                  zIndex: 2000,
                },
                android: {},
              }),
            }}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              placeholder="Select business type"
              style={{
                borderColor: 'lightgrey',
              }}
              dropDownContainerStyle={{
                height: 180,
                // paddingBottom: 5,
                borderColor: 'lightgrey',
              }}
              searchTextInputStyle={{
                borderWidth: 0,
                fontSize: 16,
              }}
              placeholderStyle={{
                fontFamily: 'Gilroy-Medium',
              }}
              listItemLabelStyle={{
                fontFamily: 'Gilroy-Medium',
              }}
              searchPlaceholder="Search category..."
              searchPlaceholderTextColor="grey"
              searchable
              multiple
              open={open}
              value={value}
              items={categories}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={val => {
                setSelectedCat(val);
              }}
            />
          </View>

          <View
            style={[salesExecutive && styles.subContainer, {marginTop: 30}]}>
            <View
              style={
                salesExecutive
                  ? styles.premiumCheckBox2
                  : styles.premiumCheckBox
              }>
              <View style={{width: '80%', marginLeft: salesExecutive ? 20 : 0}}>
                <Text style={styles.partnerProgramme}>
                  Have any sales executive visited your shop?
                </Text>
                <TouchableOpacity onPress={() => setLearnMore(!learnMore)}>
                  <Text style={styles.learnMore}>
                    Learn more about Sales executive
                  </Text>
                </TouchableOpacity>
              </View>
              <CheckBox
                style={[styles.radioBtn, {right: 5}]}
                value={salesExecutive}
                tintColors={{true: PRIMARY, false: DARKGREY}}
                disabled={false}
                onValueChange={() => {
                  setSalesExecutive(!salesExecutive);
                }}
              />
            </View>
            {learnMore ? (
              <Text
                style={{
                  paddingHorizontal: salesExecutive ? 15 : 0,
                  ...styles.partnerProgramme,
                  fontSize: 12,
                  marginTop: 10,
                }}>
                This should be only be ticked by a fydo representative if he/she
                has visited the shop for onboarding.
              </Text>
            ) : null}
            {salesExecutive && (
              <View style={{width: '100%', marginTop: 15}}>
                <TextInput
                  value={phonenum}
                  style={[styles.input, {paddingLeft: 10, marginBottom: 25}]}
                  selectionColor={DARKBLUE}
                  onChangeText={val => setPhoneNum(val)}
                  activeUnderlineColor={GREY_2}
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <MaterialIcon name="phone" size={25} color="#000" />
                      )}
                    />
                  }
                />
              </View>
            )}
          </View>
          <View style={styles.next}>
            <ButtonComponent
              label="Next"
              color="white"
              backgroundColor={DARKBLUE}
              onPress={next}
            />
          </View>
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ShopDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
    paddingTop: 30,
    backgroundColor: GREY_3,
  },
  premiumCheckBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premiumCheckBox2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  subContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 30,
    alignSelf: 'center',
    fontFamily: 'Gilroy-Medium',
    borderBottomColor: DARKGREY,
    backgroundColor: 'white',
    marginVertical: 10,
    fontSize: 14,
  },
  partnerProgramme: {
    fontSize: 14,
    color: DARKBLACK,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
  },
  premiumText: {
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',
    textDecorationLine: 'underline',
    letterSpacing: 0.3,
  },
  upi: {
    color: DARKBLUE,
    textDecorationLine: 'underline',
    fontSize: 12,
    marginVertical: 25,
    width: '80%',
    alignSelf: 'center',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
  },
  radioContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: WIDTH * .93,
  },
  radioButton: {
    flexDirection: 'row',
    width: '47%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioText: {
    fontSize: 14,
    width: '60%',
    color: DARKBLACK,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
  },
  learnMore: {
    fontSize: 10,
    textDecorationLine: 'underline',
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,
  },
  next: {
    width: '100%',
    marginVertical: 20,
  },
  error: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Gilroy-Regular',
    paddingLeft: 15,
    width: '80%',
    alignSelf: 'center',
    letterSpacing: 0.3,
  },
  radioBtnView: {
    // right: 10,
    position: 'absolute',
  },
  radioBtn: {
    width: 20,
    height: 20,
  },
});
