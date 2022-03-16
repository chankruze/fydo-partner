import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import {DARKBLACK, DARKBLUE} from '../../assets/colors';
import SelectDropdown from 'react-native-select-dropdown';

const ShopDetails = () => {
  const [checked, setChecked] = React.useState(false);
  const [radio, setRadio] = React.useState('');
  const [parking, setParking] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [foodCourt, setFoodCourt] = useState(false);
  const [instoreShopping, setInstoreShopping] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.premiumCheckbox}>
        <View>
        <Text style={styles.premiumText}>
          Do you want to join our channel partner Programme?
        </Text>
        <Text style={{color: DARKBLUE, textDecorationLine: 'underline'}}>
          Premium Service
        </Text>
        </View>
       
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <View style={styles.radioContainer}>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>Parking availability</Text>
            <RadioButton
              value={true}
              status={parking === true ? 'checked' : 'unchecked'}
              onPress={() => setParking(true)}
            />
          </View>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>Wheelchair friendly</Text>
            <RadioButton
              value={true}
              status={wheelchair === true ? 'checked' : 'unchecked'}
              onPress={() => setWheelchair(true)}
            />
          </View>
        </View>

        <View style={styles.radioContainer}>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>Food courts</Text>
            <RadioButton
              value={true}
              status={foodCourt === true ? 'checked' : 'unchecked'}
              onPress={() => setFoodCourt(true)}
            />
          </View>
          <View style={styles.radioButton}>
            <Text style={styles.radioText}>Instore shopping</Text>
            <RadioButton
              value={true}
              status={instoreShopping === true ? 'checked' : 'unchecked'}
              onPress={() => setInstoreShopping(true)}
            />
          </View>
        </View>
      </View>

      <View style={[styles.radioButton, {width: '100%'}]}>
        <View>
          <Text style={styles.radioText}>
            Do you provide home delivery/service?
          </Text>
          <Text style={styles.learnMore}>
            Learn more about home services
          </Text>
        </View>

        <RadioButton
          value={true}
          status={parking === true ? 'checked' : 'unchecked'}
          onPress={() => setParking(true)}
        />
      </View>

      <View style={[styles.premiumCheckbox, {marginTop: 30}]}>
        <View>
        <Text style={styles.premiumText}>
          Have any sales executive visited your shop?
        </Text>
        <Text style={styles.learnMore}>
          Learn more about Sales executive
        </Text>
        </View>
       
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
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
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  premiumCheckbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premiumText: {
    fontSize: 14,
    color: DARKBLACK,
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
  },
});
