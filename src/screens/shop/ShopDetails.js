import {StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {DARKBLACK, DARKBLUE, PRIMARY} from '../../assets/colors';
import SelectDropdown from 'react-native-select-dropdown';
import ButtonComponent from '../../components/ButtonComponent';

const ShopDetails = () => {
  const [parking, setParking] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [foodCourt, setFoodCourt] = useState(false);
  const [instoreShopping, setInstoreShopping] = useState(false);

  const [premiumService, setPremiumService] = useState(false);
  const [salesExecutive, setSalesExecutive] = useState(false);
  const [homeDelivery, setHomeDelivery] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={premiumService && styles.subContainer}>
        <View style={premiumService ? styles.premiumCheckbox2: styles.premiumCheckbox}>
          <View style={{width: '80%'}}>
            <Text style={styles.partnerProgramme}>
              Do you want to join our channel partner Programme?
              <Text style={[styles.premiumText, {paddingLeft: 10}]}> Premium Service </Text>
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
          <View style={{width: "100%"}}>
            <TextInput style={styles.input} placeholder='Back Account Number'/>
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

      <View style={[styles.premiumCheckbox, {marginTop: 30}]}>
        <View>
          <Text style={styles.partnerProgramme}>
            Have any sales executive visited your shop?
          </Text>
          <Text style={styles.learnMore}>Learn more about Sales executive</Text>
        </View>

        <Checkbox
          color={PRIMARY}
          status={salesExecutive ? 'checked' : 'unchecked'}
          onPress={() => {
            setSalesExecutive(!salesExecutive);
          }}
        />
      </View>
      <View style={styles.next}>
        <ButtonComponent
          label="Next"
          color="white"
          backgroundColor={DARKBLUE}
          //   onPress={()=> navigation.navigate('ShopDetails')}
        />
      </View>
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
    // padding: 15,
  },
  subContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    alignSelf: 'center',
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
    position: 'absolute',
    bottom: 40,
    right: 15,
    left: 15,
  },
});
