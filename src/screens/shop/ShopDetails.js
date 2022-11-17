import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';

import {
  DARKBLACK,
  DARKBLUE,
  PRIMARY,
  DARKGREY,
  GREY_3,
  GREY,
  GREY_2,
} from '../../assets/colors';

import ButtonComponent from '../../components/ButtonComponent';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { getAmenities, getCategories } from '../../services/shopService';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';

const WIDTH = Dimensions.get('screen').width;

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

const ShopDetails = ({ navigation, route, user }) => {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  const shopDetails = route?.params?.data;

  const [premiumService, setPremiumService] = useState(
    shopDetails?.bankDetails ? true : false
  );
  const [salesExecutive, setSalesExecutive] = useState(
    shopDetails?.onboardedThroughExecutive ? true : false
  );
  const [phonenum, setPhoneNum] = useState(
    shopDetails?.onboardedThroughExecutive ? shopDetails?.onboardedThroughExecutive
      : ''
  );
  const [error, setError] = useState(null);
  const [accountNumber, setAccountNumber] = useState(
    shopDetails?.bankDetails?.accNumber ? shopDetails?.bankDetails?.accNumber : ''
  );
  const [bankName, setBankName] = useState(
    shopDetails?.bankDetails?.name ? shopDetails?.bankDetails?.name : ''
  );
  const [IFSC, setIFSC] = useState(
    shopDetails?.bankDetails?.ifsc ? shopDetails?.bankDetails?.ifsc : ''
  );
  const [UPI, setUPI] = useState(
    shopDetails?.bankDetails?.upiIds ? shopDetails?.bankDetails?.upiIds[0] : ''
  );
  const [amenities, setAmenities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [newAmenities, setNewAmenities] = useState([]);
  const [key, setKey] = useState(0);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  useEffect(() => {
    fetchAllAmenities();
    fetchAllCategories();
    setValue(shopDetails?.categories)
  }, []);

  useEffect(() => {
    fetchOldAmenities();
  }, [amenities])

  const fetchOldAmenities = () => {
    if (shopDetails?.amenities?.length > 0) {
      var newAme = amenities.filter(function (o1) {
        return shopDetails?.amenities.some(function (o2) {
          return o1._id == o2
        })
      });
      let newA = [];
      newAme.forEach((i) => {
        // let data = {
        //   _id: i._id,
        //   name: i.name,
        //   iconUrl: i.iconUrl
        // }
        newA.push(i?._id);
      })
      setNewAmenities(newA)
    }
  }

  const fetchAllAmenities = async () => {
    try {
      const response = await getAmenities(user?.accessToken);
      setAmenities(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await getCategories(user?.accessToken);
      console.log('====================================');
      console.log("cat==>", response);
      console.log('====================================');
      let newArr = response.map((i) => {
        return {
          label: i?.name,
          value: i?._id
        }
      })
      setCategories(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAmenityCheckbox = (checked, item) => {
    if (checked) {
      newAmenities.push(item?._id);
      setKey(Math.random())
      setNewAmenities(newAmenities);
      return;
    } else {
      const remove = newAmenities.filter(i => {
        return i != item?._id;
      });
      setKey(Math.random())
      setNewAmenities(remove);
    }
  };

  const checkAmenities = (id) => {
    return newAmenities?.includes(id)
  };

  const renderAmenities = ({ item, index }) => {
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
          tintColors={{ true: PRIMARY, false: DARKGREY }}
          disabled={false}
          onValueChange={(e) => handleAmenityCheckbox(e, item)}
        />
      </View>
    );
  };

  const next = () => {
    let newData = {
      ...route?.params?.data,
      bankDetails: {
        accNumber: accountNumber,
        ifsc: IFSC,
        name: bankName,
        upiIds: [UPI],
      },
      onboardedThroughExecutive: phonenum,
      amenities: newAmenities,
      categories: selectedCat
    };
    navigation.navigate('ShopTiming', { data: newData });
  };

  const isValidate = () => {
    const error = {};
    if (accountNumber == null || accountNumber?.trim() == '') {
      error.accountNumber = 'Enter account number';
    }
    if (IFSC == null || IFSC?.trim() == '') {
      error.IFSC = 'Enter IFSC code';
    }
    if (UPI == null || UPI?.trim() == null) {
      error.UPI = 'Enter UPI ID';
    }

    setError(error);
    if (Object.keys(error).length == 0) return true;
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          enableAutomaticScroll={Platform.OS == 'ios'}
        >
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View style={premiumService && styles.subContainer}>
            <View
              style={
                premiumService
                  ? styles.premiumCheckBox2
                  : styles.premiumCheckBox
              }>
              <View style={{ width: '80%', marginLeft: premiumService ? 20 : 0 }}>
                <Text style={styles.partnerProgramme}>
                  Do you want to join our channel partner Programme?
                  <Text style={[styles.premiumText, { paddingLeft: 10 }]}>
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
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setPremiumService(!premiumService);
                  }}
                />
              </View>
            </View>
            {premiumService && (
              <View style={{ width: '100%' }}>
                <TextInput
                  value={bankName}
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  onChangeText={value => setBankName(value)}
                  activeUnderlineColor={GREY_2}
                  placeholder="Bank Name"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                />
                <TextInput
                  value={accountNumber}
                  style={[styles.input]}
                  selectionColor={DARKBLUE}
                  onChangeText={value => setAccountNumber(value)}
                  activeUnderlineColor={GREY_2}
                  placeholder="Bank Account Number"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Gilroy-Medium',
                      },
                    },
                  }}
                />
                {/* {error.accountNumber && (
                <Text style={styles.error}>{error.accountNumber}</Text>
              )} */}
                <TextInput
                  value={IFSC}
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  activeUnderlineColor={GREY_2}
                  onChangeText={value => setIFSC(value)}
                  placeholder="Bank Account IFSC"
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
                <TextInput
                  value={UPI}
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  activeUnderlineColor={GREY_2}
                  onChangeText={value => setUPI(value)}
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
                          name="qr-code-scanner"
                          size={25}
                          color="#000"
                        />
                      )}
                    />
                  }
                />
                {/* {error.UPI && (
                <Text style={styles.error}>{error.UPI}</Text>
              )} */}
                {/* <Text style={styles.upi}>Add More UPI IDs</Text> */}
              </View>
            )}
          </View>
          <View style={{ marginVertical: 20 }}>
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

          <View style={{
            marginBottom: 10,
          }}>
            <DropDownPicker
              listMode='SCROLLVIEW'
              placeholder='Select business type'
              style={{
                borderColor: 'lightgrey'
              }}
              dropDownContainerStyle={{
                borderColor: 'lightgrey',
              }}
              searchTextInputStyle={{
                borderWidth: 0,
                fontSize: 16
              }}
              placeholderStyle={{
                fontFamily: 'Gilroy-Medium'
              }}
              listItemLabelStyle={{
                fontFamily: 'Gilroy-Medium'
              }}
              searchPlaceholder='Search category...'
              searchPlaceholderTextColor='grey'
              searchable
              multiple
              open={open}
              value={value}
              items={categories}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(val) => {
                setSelectedCat(val);
                console.log('====================================');
                console.log("val==>", val);
                console.log('====================================');
              }}
            />
          </View>

          <View
            style={[salesExecutive && styles.subContainer, { marginTop: 10 }]}>
            <View
              style={
                salesExecutive
                  ? styles.premiumCheckBox2
                  : styles.premiumCheckBox
              }>
              <View style={{ width: '80%', marginLeft: salesExecutive ? 20 : 0 }}>
                <Text style={styles.partnerProgramme}>
                  Have any sales executive visited your shop?
                </Text>
                <Text style={styles.learnMore}>
                  Learn more about Sales executive
                </Text>
              </View>

              <CheckBox
                style={[styles.radioBtn, { right: 5 }]}
                value={salesExecutive}
                tintColors={{ true: PRIMARY, false: DARKGREY }}
                disabled={false}
                onValueChange={() => {
                  setSalesExecutive(!salesExecutive);
                }}
              />
            </View>
            {salesExecutive && (
              <View style={{ width: '100%', marginTop: 15 }}>
                <TextInput
                  value={phonenum}
                  style={[styles.input, { paddingLeft: 10, marginBottom: 25 }]}
                  selectionColor={DARKBLUE}
                  onChangeText={value => setPhoneNum(value)}
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
    backgroundColor: 'white',
    paddingHorizontal: 15,
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
