import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
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
import { getAmenities } from '../../services/shopService';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('screen').width;

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user
  }
}

const ShopDetails = ({ navigation, route, user }) => {
  const [parking, setParking] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [foodCourt, setFoodCourt] = useState(false);
  const [instoreShopping, setInstoreShopping] = useState(false);

  const [premiumService, setPremiumService] = useState(false);
  const [salesExecutive, setSalesExecutive] = useState(false);
  const [phonenum, setPhoneNum] = useState(false);
  const [error, setError] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [IFSC, setIFSC] = useState(null);
  const [UPI, setUPI] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [newAmenities, setNewAmenities] = useState([]);

  useEffect(() => {
    fetchAllAmenities();
    // setNewAmenities([])
  }, [])

  fetchAllAmenities = async () => {
    try {
      const response = await getAmenities(user?.accessToken)
      const data = await response.json();
      console.log("jj-->", data);
      setAmenities(data);
    } catch (error) {
      console.log(error);
    }
  }

  const renderAmenities = ({ item, index }) => {
    return (
      <View style={{
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5
      }}>
        <Text style={styles.radioText}>{item.name}</Text>
        <CheckBox
          style={styles.radioBtn}
          value={parking}
          tintColors={{ true: PRIMARY, false: DARKGREY }}
          disabled={false}
          onValueChange={(e) => {
            console.log("ffds-->", e);
            checkAmenities(e, item);
            // setParking(!parking);
          }}
        />
      </View>
    )
  }

  const checkAmenities = (checked, item) => {
    if (checked) {
      newAmenities.push({
        _id: item._id,
        name: item.name,
        iconUrl: item.iconUrl
      })
      return;
    }
    const remove = newAmenities.filter((i) => {
      return i._id != item._id
    })
    setNewAmenities(remove)
  }

  const next = () => {
    let newData = {
      ...route?.params?.data,
      bankDetails: {
        accNumber: accountNumber,
        ifsc: IFSC,
        name: bankName,
        upiIds: [UPI]
      },
      onboardedThroughExecutive: phonenum,
      amenities: [
        ...newAmenities
      ]
    }
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={premiumService && styles.subContainer}>
            <View
              style={
                premiumService ? styles.premiumCheckBox2 : styles.premiumCheckBox
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
              <View style={[styles.radioBtnView,
              {
                right: premiumService ? 20 : 5,
              }]}>
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
                  theme={
                    {
                      fonts: {
                        regular: {
                          fontFamily: 'Gilroy-Medium'
                        }
                      }
                    }
                  }
                />
                <TextInput
                  value={accountNumber}
                  style={[styles.input]}
                  selectionColor={DARKBLUE}
                  onChangeText={value => setAccountNumber(value)}
                  activeUnderlineColor={GREY_2}
                  placeholder="Bank Account Number"
                  theme={
                    {
                      fonts: {
                        regular: {
                          fontFamily: 'Gilroy-Medium'
                        }
                      }
                    }
                  }
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
                  theme={
                    {
                      fonts: {
                        regular: {
                          fontFamily: 'Gilroy-Medium'
                        }
                      }
                    }
                  }
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
                  theme={
                    {
                      fonts: {
                        regular: {
                          fontFamily: 'Gilroy-Medium'
                        }
                      }
                    }
                  }
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
                key={(item) => item.toString()}
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

          <View style={[salesExecutive && styles.subContainer, { marginTop: 10 }]}>
            <View
              style={
                salesExecutive ? styles.premiumCheckBox2 : styles.premiumCheckBox
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
                  style={[
                    styles.input,
                    { paddingLeft: 10, marginBottom: 25, },
                  ]}
                  selectionColor={DARKBLUE}
                  onChangeText={value => setPhoneNum(value)}
                  activeUnderlineColor={GREY_2}
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  theme={
                    {
                      fonts: {
                        regular: {
                          fontFamily: 'Gilroy-Medium'
                        }
                      }
                    }
                  }
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
        </ScrollView>
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
    // justifyContent: 'space-between',
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
    position: 'absolute'
  },
  radioBtn: {
    width: 20,
    height: 20,
  }
});