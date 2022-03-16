import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonComponent from '../components/ButtonComponent';
import {TextInput, Button} from 'react-native-paper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontIsto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WithNetInfo from '../components/hoc/withNetInfo';
import SelectDropdown from 'react-native-select-dropdown';

const HEIGHT = Dimensions.get('screen').height;

const idCards = ['Pan Card', 'Aadhaar Card', 'Driving License', 'Voter ID'];

function RegisterShop({route, navigation}) {
  const [ownerName, setOwnerName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
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
    if (
      phoneNumber == null ||
      phoneNumber?.trim() == '' ||
      phoneNumber.length !== 10
    ) {
      error.phoneNumber = 'Enter valid phone number';
    }
    if (shopName == null || shopName?.trim() == '') {
      error.shopName = 'Enter shop name';
    }
    setError(error);
    if (Object.keys(error).length == 0) return true;
    return false;
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Shop details</Text>

        <View style={styles.box}>
          <TextInput
            value={ownerName}
            onChangeText={value => setOwnerName(value)}
            style={commonstyles.input}
            placeholder="Shop Owner's name"
            placeholderTextColor={DARKGREY}
            left={<TextInput.Icon name="account" />}
            required
          />
          {error.ownerName && (
            <Text style={styles.error}>{error.ownerName}</Text>
          )}
        </View>

        <View style={styles.box}>
          <TextInput
            value={phoneNumber}
            onChangeText={value => setPhoneNumber(value)}
            style={commonstyles.input}
            placeholder="Phone number"
            placeholderTextColor={DARKGREY}
            left={<TextInput.Icon name="phone" />}
            keyboardType="phone-pad"
          />
          {error.phoneNumber && (
            <Text style={styles.error}>{error.phoneNumber}</Text>
          )}
        </View>

        <View style={styles.box}>
          <TextInput
            value={shopName}
            onChangeText={value => setShopName(value)}
            style={commonstyles.input}
            placeholder="Shop name"
            placeholderTextColor={DARKGREY}
            left={
              <TextInput.Icon
                name={() => (
                  <FontIsto name="shopping-store" size={17} color="#000" />
                )}
              />
            }
          />
          {error.shopName && <Text style={styles.error}>{error.shopName}</Text>}
        </View>

        <View style={styles.box}>
          <TextInput
            value={location}
            style={commonstyles.input}
            placeholder="Shop address"
            placeholderTextColor={DARKGREY}
            left={
              <TextInput.Icon
                name={() => (
                  <EntypoIcon name="location" size={25} color="#000" />
                )}
              />
            }
            right={
              <TextInput.Icon
                name={() => (
                  <MaterialIcons
                    name="my-location"
                    size={25}
                    color="#000"
                    onPress={() => navigation.navigate('Maps', {
                      setLocation: setLocation
                    })}
                  />
                )}
              />
            }
          />
        </View>

        <View style={styles.box}>
          <TextInput
            value={pincode}
            onChangeText={value => setPincode(value)}
            style={commonstyles.input}
            placeholder="Pincode"
            placeholderTextColor={DARKGREY}
            left={
              <TextInput.Icon
                name={() => (
                  <MaterialIcons name="edit-location" size={28} color="#000" />
                )}
              />
            }
          />
          {error.pincode && <Text style={styles.error}>{error.pincode}</Text>}
        </View>

        <View style={styles.dropdown}>
          <FontAwesome name="id-card-o" size={18} color="#000" />
          <SelectDropdown
            data={idCards}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultValueByIndex={0}
            renderDropdownIcon={() => (
              <EntypoIcon name="chevron-down" size={25} color="#000" />
            )}
            buttonStyle={[commonstyles.input, {width: '90%', marginLeft: 0}]}
            buttonTextStyle={{color: DARKGREY, textAlign: 'left'}}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
        <View style={styles.uploadImage}>
          <Button
            onPress={() => console.log('image button pressed')}
            style={{backgroundColor: GREY}}
            icon="camera">
            Front Image
          </Button>
          <Button style={{backgroundColor: GREY}} icon="camera">
            Back Image
          </Button>
        </View>
        <View style={styles.box}>
          <TextInput
            value={website}
            onChangeText={value => setWebsite(value)}
            style={commonstyles.input}
            placeholder="Website (if any)"
            placeholderTextColor={DARKGREY}
            left={
              <TextInput.Icon
                name={() => (
                  <MaterialComunityIcons name="web" size={25} color="#000" />
                )}
              />
            }
          />
        </View>

        <ButtonComponent
          label="Next"
          color="white"
          backgroundColor={DARKBLUE}
        />
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

const commonstyles = {
  input: {
    backgroundColor: 'transparent',
    fontSize: 18,
    paddingLeft: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    height: '130%',
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    minHeight: HEIGHT * 0.6,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    color: LIGHTBLACK,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  uploadImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  error: {
    marginVertical: 5,
    fontSize: 12,
    color: 'red',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'flex-end',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: DARKGREY,
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

export default WithNetInfo(RegisterShop);
