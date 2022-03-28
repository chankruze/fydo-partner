import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
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

const WIDTH = Dimensions.get('screen').width;


const ShopDetails = ({ navigation, route }) => {
  const [parking, setParking] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [foodCourt, setFoodCourt] = useState(false);
  const [instoreShopping, setInstoreShopping] = useState(false);

  const [premiumService, setPremiumService] = useState(false);
  const [salesExecutive, setSalesExecutive] = useState(false);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [error, setError] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const [IFSC, setIFSC] = useState(null);
  const [UPI, setUPI] = useState(null);

  const next = () => {
    // if (isValidate() || !premiumService)
    navigation.navigate('ShopTiming', { data: route?.params?.data });
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
    <SafeAreaView style={{ flex: 1, backgroundColor: premiumService ? GREY_3 : 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor={PRIMARY} />
      <View style={[styles.container,
      { backgroundColor: premiumService ? GREY_3 : 'white' }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={premiumService && styles.subContainer}>
            <View
              style={
                premiumService ? styles.premiumCheckbox2 : styles.premiumCheckbox
              }>
              <View style={{ width: '80%' }}>
                <Text style={styles.partnerProgramme}>
                  Do you want to join our channel partner Programme?
                  <Text style={[styles.premiumText, { paddingLeft: 10 }]}>
                    {' '}
                    Premium Service{' '}
                  </Text>
                </Text>
              </View>

              <CheckBox
                value={premiumService}
                tintColors={{ true: PRIMARY, false: DARKGREY }}
                disabled={false}
                onValueChange={() => {
                  setPremiumService(!premiumService);
                }}
              />
            </View>
            {premiumService && (
              <View style={{ width: '100%' }}>
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
                <TextInput
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  activeUnderlineColor={GREY_2}
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
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  activeUnderlineColor={GREY_2}
                  placeholder="GST ID (optional)"
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
                  style={styles.input}
                  selectionColor={DARKBLUE}
                  activeUnderlineColor={GREY_2}
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
                <Text style={styles.upi}>Add More UPI IDs</Text>
              </View>
            )}
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={styles.radioContainer}>
              <View style={styles.radioButton}>
                <Text style={styles.radioText}>Parking availability</Text>
                <CheckBox
                  value={parking}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setParking(!parking);
                  }}
                />
              </View>
              <View style={styles.radioButton}>
                <Text style={styles.radioText}>Wheelchair friendly</Text>
                <CheckBox
                  value={wheelchair}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setWheelchair(!wheelchair);
                  }}
                />
              </View>
            </View>

            <View style={styles.radioContainer}>
              <View style={styles.radioButton}>
                <Text style={styles.radioText}>Food courts</Text>
                <CheckBox
                  value={foodCourt}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setFoodCourt(!foodCourt);
                  }}
                />
              </View>
              <View style={styles.radioButton}>
                <Text style={styles.radioText}>Instore shopping</Text>
                <CheckBox
                  value={instoreShopping}
                  tintColors={{ true: PRIMARY, false: DARKGREY }}
                  disabled={false}
                  onValueChange={() => {
                    setInstoreShopping(!instoreShopping);
                  }}
                />
              </View>

              <View style={styles.radioContainer}>
                <View style={styles.radioButton}>
                  <Text style={styles.radioText}>Food courts</Text>
                  <RadioButton
                    color={PRIMARY}
                    value={foodCourt}
                    status={foodCourt === true ? 'checked' : 'unchecked'}
                    onPress={() => setFoodCourt(!foodCourt)}
                  />
                </View>
                <View style={styles.radioButton}>
                  <Text style={styles.radioText}>Instore shopping</Text>
                  <RadioButton
                    color={PRIMARY}
                    value={instoreShopping}
                    status={instoreShopping === true ? 'checked' : 'unchecked'}
                    onPress={() => setInstoreShopping(!instoreShopping)}
                  />
                </View>
              </View>
            </View>

            <CheckBox
              value={homeDelivery}
              tintColors={{ true: PRIMARY, false: DARKGREY }}
              disabled={false}
              onValueChange={() => {
                setHomeDelivery(!homeDelivery);
              }}
            />
          </View>

          <View style={[salesExecutive && styles.subContainer, { marginTop: 30 }]}>
            <View
              style={
                salesExecutive ? styles.premiumCheckBox2 : styles.premiumCheckBox
              }>
              <View style={{ width: '80%' }}>
                <Text style={styles.partnerProgramme}>
                  Have any sales executive visited your shop?
                </Text>
                <Text style={styles.learnMore}>
                  Learn more about Sales executive
                </Text>
                <Text style={styles.learnMore}>Learn more about home services</Text>
              </View>

              <CheckBox
                value={salesExecutive}
                tintColors={{ true: PRIMARY, false: DARKGREY }}
                disabled={false}
                onValueChange={() => {
                  setSalesExecutive(!salesExecutive);
                }}
              />
            </View>

            <View style={[salesExecutive && styles.subContainer, { marginTop: 30 }]}>
              <View
                style={
                  salesExecutive ? styles.premiumCheckbox2 : styles.premiumCheckbox
                }>
                <View style={{ width: '80%' }}>
                  <Text style={styles.partnerProgramme}>
                    Have any sales executive visited your shop?
                  </Text>
                  <Text style={styles.learnMore}>
                    Learn more about Sales executive
                  </Text>
                </View>

                <Checkbox
                  color={PRIMARY}
                  status={salesExecutive ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setSalesExecutive(!salesExecutive);
                  }}
                />
              </View>
              {salesExecutive && (
                <View style={{ width: '100%', marginTop: 15 }}>
                  <TextInput
                    style={[
                      styles.input,
                      { paddingLeft: 10, marginBottom: 25, },
                    ]}
                    selectionColor={DARKBLUE}
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    // paddingTop: 30,
    // backgroundColor: GREY_3,
  },
  premiumCheckBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premiumCheckBox2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
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
    marginTop: 15,
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
    justifyContent: 'space-between',
    width: WIDTH * .93,
  },
  radioButton: {
    flexDirection: 'row',
    width: '47%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioText: {
    fontSize: 14,
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
});
