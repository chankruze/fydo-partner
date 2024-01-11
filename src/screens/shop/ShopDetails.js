import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import {
  BLACK,
  DARKBLACK,
  DARKBLUE,
  DARKGREY,
  GREY,
  GREY_3,
  PRIMARY,
  RED,
  WHITE,
  YELLOW,
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
import {moderateScale} from '../../utils/responsiveSize';
import {getValue} from '../../utils/sharedPreferences';

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
  const [loyaltyPercentage, setLoyaltyPercentage] = useState(
    shopDetails?.bankDetails?.loyaltyPercentage
      ? shopDetails?.bankDetails?.loyaltyPercentage
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
  const [upi, setUpi] = useState('');
  const [upiList, setUpiList] = useState(
    shopDetails?.bankDetails?.upiIds ? shopDetails?.bankDetails?.upiIds : [],
  );

  const [amenities, setAmenities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [newAmenities, setNewAmenities] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [isQrScanned, setIsQrScanned] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log('jl==>', shopDetails);

    const getUpiId = async () => {
      const upiId = await getValue('upiId');

      if (upiId) {
        setUpi(upiId);
        setIsQrScanned(prev => !prev);
        await AsyncStorage.removeItem('upiId');
      }
    };

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

  useEffect(() => {
    addUpis();
  }, [isQrScanned]);

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
      setNewAmenities(prev => [item?._id, ...prev]);
    } else {
      setNewAmenities(prev => [...prev.filter(a => a !== item?._id)]);
    }
  };

  const checkAmenities = id => {
    return newAmenities?.includes(id);
  };

  const renderAmenities = ({item, index}) => {
    return (
      <View style={styles.amenityCheckBoxView}>
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
            loyaltyPercentage: loyaltyPercentage,
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

    if (upi === null || upi?.trim() === null) {
      e.upi = 'Enter UPI ID';
    }

    setError(e);

    if (Object.keys(e).length === 0) {
      return true;
    }
    return false;
  };

  const addUpiToList = upi =>
    setUpiList(prev => [upi, ...prev.filter(p => p !== upi)]);

  const deleteUpiFromList = upi => {
    setUpiList(prev => [...prev.filter(u => u !== upi)]);
  };

  const addUpis = () => {
    const regx = /^[\w.-]+@[\w.-]+$/;

    if (regx.test(upi)) {
      addUpiToList(upi?.trim());
    } else {
      ToastMessage({message: 'Please enter valid UPI id'});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={Platform.OS === 'ios'}
        nestedScrollEnabled={true}>
        {/* premium service (partner programme checkbox) */}
        <View style={styles.premiumServiceContainer}>
          <Text style={styles.premiumServiceCheckBoxLabel}>
            Do you want to join our channel partner Programme?
            <Text style={[styles.premiumText]}> Premium Service</Text>
          </Text>
          <CheckBox
            style={styles.radioBtn}
            value={premiumService}
            tintColors={{true: PRIMARY, false: GREY}}
            // disabled={shopDetails?.isChannelPartner}
            onValueChange={() => {
              setPremiumService(!premiumService);
            }}
          />
        </View>

        {/* if premium service is checked then render the bank details */}
        {premiumService ? (
          <View style={styles.premiumDataContainer}>
            <TextInput
              editable={shopDetails?.isChannelPartner ? false : true}
              value={bankName}
              style={styles.input}
              selectionColor={YELLOW}
              onChangeText={val => setBankName(val)}
              activeUnderlineColor={PRIMARY}
              placeholder="Bank Account Holder Name"
            />
            <TextInput
              editable={shopDetails?.isChannelPartner ? false : true}
              value={accountNumber}
              style={styles.input}
              selectionColor={YELLOW}
              onChangeText={val => setAccountNumber(val?.trim())}
              activeUnderlineColor={PRIMARY}
              placeholder="Bank Account Number"
              keyboardType="number-pad"
            />
            {/* {error.accountNumber && (
                <Text style={styles.error}>{error.accountNumber}</Text>
              )} */}
            <TextInput
              editable={shopDetails?.isChannelPartner ? false : true}
              value={IFSC}
              style={styles.input}
              selectionColor={YELLOW}
              activeUnderlineColor={PRIMARY}
              onChangeText={val => setIFSC(val?.trim())}
              placeholder="Bank Account IFSC"
            />
            <TextInput
              editable={shopDetails?.isChannelPartner ? false : true}
              value={String(loyaltyPercentage)}
              style={styles.input}
              selectionColor={YELLOW}
              onChangeText={val => setLoyaltyPercentage(val?.trim())}
              activeUnderlineColor={PRIMARY}
              placeholder="Enter Loyalty Percentage"
              keyboardType="number-pad"
            />
            <TextInput
              editable={shopDetails?.isChannelPartner ? false : true}
              value={email}
              style={styles.input}
              selectionColor={YELLOW}
              onChangeText={val => setEmail(val.trim())}
              activeUnderlineColor={PRIMARY}
              placeholder="Email Address"
            />
            {/* {error.IFSC && (
                <Text style={styles.error}>{error.IFSC}</Text>
              )} */}
            <View style={styles.upiContainer}>
              <TextInput
                value={upi}
                style={[styles.input, styles.upiInput]}
                onChangeText={val => setUpi(val?.trim())}
                placeholder="UPI ID"
                placeholderTextColor="#383B3F80"
                activeUnderlineColor={PRIMARY}
              />
              <TouchableOpacity
                style={styles.upiScanButton}
                onPress={() => navigation.navigate('QrScan')}>
                <MaterialIcon name="qr-code-scanner" size={24} color={WHITE} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => addUpis()}
                style={styles.upiAddButton}>
                <MaterialIcon name="save" size={24} color={WHITE} />
                {/* <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        color: WHITE,
                        textTransform: 'uppercase',
                      }}>
                      Add
                    </Text> */}
              </TouchableOpacity>
            </View>
            <FlatList
              data={upiList}
              style={styles.upiList}
              ItemSeparatorComponent={() => (
                <View style={styles.upiListItemSeparator} />
              )}
              renderItem={({item, index}) => (
                <View
                  key={`${index}-${item}`}
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
                    onPress={() => {
                      deleteUpiFromList(item);
                    }}>
                    <MaterialIcon name="delete" size={24} color={RED} />
                  </TouchableOpacity>
                </View>
              )}
            />
            {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TextInput
                  editable={shopDetails?.isChannelPartner ? false : true}
                  value={upi}
                  style={styles.input}
                  selectionColor={YELLOW}
                  activeUnderlineColor={PRIMARY}
                  onChangeText={val => setUpi(val?.trim())}
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
                          size={24}
                          color={PRIMARY}
                        />
                      )}
                    />
                  }
                />
                <TouchableOpacity
                  disabled={shopDetails?.isChannelPartner}
                  onPress={() => addUpis()}
                  style={{
                    marginRight: 16,
                    padding: 8,
                    backgroundColor: PRIMARY,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 14,
                      color: WHITE,
                      textTransform: 'uppercase',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={upiList}
                style={{
                  padding: 16,
                }}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 0.4,
                      backgroundColor: GREY,
                      marginVertical: 4,
                    }}
                  />
                )}
                renderItem={({item, index}) => {
                  return (
                    <View
                      key={`${index}-${item}`}
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
                          deleteUpiFromList(item);
                        }}>
                        <MaterialIcon name="delete" size={24} color={RED} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              /> */}
            {/* {error.upi && (
                <Text style={styles.error}>{error.upi}</Text>
              )} */}
          </View>
        ) : null}

        {/* amenities */}
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
            flex: 1,
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
            mode="BADGE"
            placeholder="Select business type"
            style={{
              borderColor: 'lightgrey',
            }}
            dropDownContainerStyle={{
              flex: 1,
              minHeight: 600,
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

        {/* sales executive */}
        <View style={styles.divider} />
        {/*  */}
        <Text style={styles.note}>
          Note: This should be only be ticked by a fydo representative if he/she
          has visited the shop for onboarding.
        </Text>

        {/* sales executive checkbox */}
        <View style={styles.premiumServiceContainer}>
          <Text style={styles.premiumServiceCheckBoxLabel}>
            Have any sales executive visited your shop?{' '}
          </Text>
          <CheckBox
            style={styles.radioBtn}
            value={salesExecutive}
            tintColors={{true: PRIMARY, false: DARKGREY}}
            disabled={false}
            onValueChange={() => {
              setSalesExecutive(!salesExecutive);
            }}
          />
        </View>

        {salesExecutive ? (
          <TextInput
            value={phonenum}
            style={[styles.input, {paddingLeft: 10, marginBottom: 25}]}
            selectionColor={YELLOW}
            onChangeText={val => setPhoneNum(val)}
            activeUnderlineColor={PRIMARY}
            placeholder="Phone Number"
            keyboardType="numeric"
            left={
              <TextInput.Icon
                name={() => (
                  <MaterialIcon name="phone" size={24} color={PRIMARY} />
                )}
              />
            }
          />
        ) : null}

        {/* <View
          style={[
            salesExecutive && styles.premiumDataContainer,
            {marginTop: 16},
          ]}>
          <View
            style={
              salesExecutive ? styles.premiumCheckBox2 : styles.premiumCheckBox
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
                selectionColor={YELLOW}
                onChangeText={val => setPhoneNum(val)}
                activeUnderlineColor={PRIMARY}
                placeholder="Phone Number"
                keyboardType="numeric"
                left={
                  <TextInput.Icon
                    name={() => (
                      <MaterialIcon name="phone" size={24} color={PRIMARY} />
                    )}
                  />
                }
              />
            </View>
          )}
        </View> */}
      </KeyboardAwareScrollView>
      <View style={styles.next}>
        <ButtonComponent
          label="Next"
          color="white"
          backgroundColor={DARKBLUE}
          onPress={next}
        />
      </View>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ShopDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: GREY_3,
  },
  contentContainerStyle: {
    padding: 16,
    paddingBottom: 600,
  },
  premiumServiceContainer: {
    display: 'flex',
    paddingVertical: moderateScale(8),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premiumServiceCheckBoxLabel: {
    flex: 1,
    color: DARKBLACK,
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
  },
  premiumDataContainer: {
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 8,
  },
  input: {
    // width: '80%',
    flex: 1,
    height: 48,
    // alignSelf: 'center',
    borderBottomColor: PRIMARY,
    backgroundColor: 'white',
    fontSize: 14,
  },
  partnerProgramme: {
    fontSize: 16,
    color: BLACK,
    fontFamily: 'Gilroy-Medium',
  },
  premiumText: {
    color: PRIMARY,
    fontFamily: 'Gilroy-Medium',
    textDecorationLine: 'underline',
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
  next: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  upiContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upiScanButton: {
    padding: moderateScale(8),
    backgroundColor: PRIMARY,
    borderRadius: moderateScale(8),
    marginLeft: moderateScale(8),
  },
  upiAddButton: {
    marginVertical: moderateScale(8),
    // marginHorizontal: moderateScale(8),
    marginLeft: moderateScale(8),
    padding: moderateScale(8),
    backgroundColor: PRIMARY,
    borderRadius: moderateScale(8),
  },
  upiList: {
    padding: 8,
  },
  upiListItemSeparator: {
    height: 0.4,
    backgroundColor: GREY,
    marginVertical: 4,
  },
  note: {
    fontSize: 12,
    fontStyle: 'italic',
    color: BLACK,
  },
  divider: {
    height: 1,
    backgroundColor: GREY,
    marginVertical: moderateScale(8),
  },
  amenityCheckBoxView: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
});
