import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import {
  PRIMARY,
  DARKGREY,
  GREY,
  LIGHTB,
  PRIMARYLACK,
  LIGHTBLACK,
  DARKBLACK,
  DARKBLUE,
} from '../assets/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonComponent from '../components/ButtonComponent';

const HEIGHT = Dimensions.get('screen').height;

export default function RegisterShop({route, navigation}) {
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [shopName, setShopName] = useState('');
  const [pincode, setPincode] = useState('');
  const [website, setWebsite] = useState('');
  const [shopType, setShopType] = useState('');
  const [error, setError] = useState({});

  const isValidate = () => {
    const error = {};
    if (ownerName == null || ownerName?.trim() == '') {
      error.ownerName = 'Enter owner name';
    }
    if (pincode == null || pincode?.trim() == '') {
      error.pincode = 'Enter pin code';
    }
    setError(error);
    if (Object.keys(error).length == 0) return true;
    return false;
  };

  const handleOwnerName = value => {
    setOwnerName(value);
  };
  const handlePhoneNumber = value => {
    setPhoneNumber(value);
  };
  const handlePincode = value => {
    setPincode(value);
  };

  const handleShopName = value => {
    setShopName(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Shop details</Text>

        <View style={styles.box}>
          <TextInput
            value={ownerName}
            onChangeText={handleOwnerName}
            style={styles.input}
            placeholder="Shop Owner's name"
            placeholderTextColor={DARKGREY}
          />
          {error.ownerName && (
            <Text style={styles.error}>{error.ownerName}</Text>
          )}
        </View>

        <View style={styles.box}>
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneNumber}
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor={DARKGREY}
          />
        </View>

        <View style={styles.box}>
          <TextInput
            value={shopName}
            onChangeText={handleShopName}
            style={styles.input}
            placeholder="Shop name"
            placeholderTextColor={DARKGREY}
          />
        </View>

        <View style={styles.box}>
          <TextInput
            value={pincode}
            onChangeText={handlePincode}
            style={styles.input}
            placeholder="Pincode"
            placeholderTextColor={DARKGREY}
          />
        </View>

        <ButtonComponent
          label="Next"
          color="white"
          backgroundColor={DARKBLUE}
        />

        {/* <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonLabel}>Next</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerLabel}>By continuing you agree to our</Text>
        <TouchableOpacity>
          <Text style={styles.footerOtherLabel}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  contentContainer: {
    minHeight: HEIGHT * 0.6,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    color: LIGHTBLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    marginVertical: 5,
    fontSize: 12,
    color: 'red',
  },
  label: {
    marginVertical: 15,
    color: DARKGREY,
    lineHeight: 20,
    fontSize: 13,
  },
  footer: {
    // position: 'absolute',
    // bottom: 30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footerLabel: {
    fontSize: 12,
    color: DARKGREY,
  },
  footerOtherLabel: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: '500',
    marginTop: 3,
  },
  subLabel: {
    color: LIGHTBLACK,
    fontSize: 13,
    fontWeight: '500',
  },
  optionalLabel: {
    marginLeft: 5,
    color: DARKGREY,
  },
  box: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    marginTop: 10,
    borderWidth: 0.8,
    borderColor: 'rgba(0, 53, 121, 0.2)',
    borderRadius: 8,
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButtonLabel: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: '600',
  },
  uploadIcon: {
    marginHorizontal: 20,
  },
  input: {
    height: 48,
    backgroundColor: '#F4F5F5',
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 13,
    color: DARKGREY,
  },
  nextButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: 'rgba(0, 53, 121, 0.2)',
    borderRadius: 8,
  },
  nextButtonLabel: {
    color: LIGHTBLACK,
    fontWeight: '600',
  },
  dobContainer: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  box2: {
    height: 48,
    borderWidth: 0.8,
    width: '27%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 53, 121, 0.2)',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  box3: {
    height: 48,
    borderWidth: 0.8,
    width: '35%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 53, 121, 0.2)',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  boxLabel: {
    color: DARKGREY,
    fontWeight: '500',
    fontSize: 13,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  imagePath: {
    marginVertical: 5,
    fontSize: 12,
  },
});
