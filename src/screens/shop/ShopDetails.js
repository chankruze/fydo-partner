import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {RadioButton, TextInput} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
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

const ShopDetails = ({navigation, route}) => {
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
    if (isValidate() || !premiumService)
      navigation.navigate('ShopTiming', {data: route?.params?.data});
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
      <ScrollView>
        <View style={premiumService && styles.subContainer}>
          <View
            style={
              premiumService ? styles.premiumCheckbox2 : styles.premiumCheckbox
            }>
            <View style={{width: '80%'}}>
              <Text style={styles.partnerProgramme}>
                Do you want to join our channel partner Programme?
                <Text style={[styles.premiumText, {paddingLeft: 10}]}>
                  {' '}
                  Premium Service{' '}
                </Text>
              </Text>
            </View>

            <Checkbox
              color={PRIMARY}
              status={premiumService ? 'checked' : 'unchecked'}
              onPress={() => {
                setPremiumService(!premiumService);
              }}
            />
          </View>
          {premiumService && (
            <View style={{width: '100%'}}>
              <TextInput
                value={accountNumber}
                style={styles.input}
                selectionColor={DARKBLUE}
                onChangeText={value => setAccountNumber(value)}
                activeUnderlineColor={GREY_2}
                placeholder="Bank Account Number"
              />
              {/* {error.accountNumber && (
                <Text style={styles.error}>{error.accountNumber}</Text>
              )} */}
              <TextInput
                style={styles.input}
                selectionColor={DARKBLUE}
                activeUnderlineColor={GREY_2}
                placeholder="Bank Account IFSC"
              />
              {/* {error.IFSC && (
                <Text style={styles.error}>{error.IFSC}</Text>
              )} */}
              <TextInput
                style={styles.input}
                selectionColor={DARKBLUE}
                activeUnderlineColor={GREY_2}
                placeholder="GST ID (optional)"
              />
              <TextInput
                style={styles.input}
                selectionColor={DARKBLUE}
                activeUnderlineColor={GREY_2}
                placeholder="UPI ID"
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
        <View style={{marginVertical: 20}}>
          <View style={styles.radioContainer}>
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Parking availability</Text>
              <RadioButton
                color={PRIMARY}
                value={parking}
                status={parking === true ? 'checked' : 'unchecked'}
                onPress={() => setParking(!parking)}
              />
            </View>
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Wheelchair friendly</Text>
              <RadioButton
                color={PRIMARY}
                value={wheelchair}
                status={wheelchair === true ? 'checked' : 'unchecked'}
                onPress={() => setWheelchair(!wheelchair)}
              />
            </View>
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

        <View style={[styles.radioButton, {width: '100%'}]}>
          <View>
            <Text style={styles.radioText}>
              Do you provide home delivery/service?
            </Text>
            <Text style={styles.learnMore}>Learn more about home services</Text>
          </View>

          <RadioButton
            color={PRIMARY}
            value={homeDelivery}
            status={homeDelivery === true ? 'checked' : 'unchecked'}
            onPress={() => setHomeDelivery(!homeDelivery)}
          />
        </View>

        <View style={[salesExecutive && styles.subContainer, {marginTop: 30}]}>
          <View
            style={
              salesExecutive ? styles.premiumCheckbox2 : styles.premiumCheckbox
            }>
            <View style={{width: '80%'}}>
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
            <View style={{width: '100%', marginTop: 15}}>
              <TextInput
                style={[
                  styles.input,
                  {paddingLeft: 10, marginBottom: 25,},
                ]}
                selectionColor={DARKBLUE}
                activeUnderlineColor={GREY_2}
                placeholder="Phone Number"
                keyboardType="numeric"
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
    </SafeAreaView>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 30,
    backgroundColor: GREY_3,
  },
  premiumCheckbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premiumCheckbox2: {
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
    alignSelf: 'center',
    height: 30,
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
  },
  premiumText: {
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',
    textDecorationLine: 'underline',
  },
  upi: {
    color: DARKBLUE,
    textDecorationLine: 'underline',
    fontSize: 12,
    marginVertical: 25,
    width: '80%',
    alignSelf: 'center',
    fontFamily: 'Gilroy-Medium',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioText: {
    fontSize: 14,
    color: DARKBLACK,
    fontFamily: 'Gilroy-Medium',
  },
  learnMore: {
    fontSize: 10,
    textDecorationLine: 'underline',
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',
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
  },
});
