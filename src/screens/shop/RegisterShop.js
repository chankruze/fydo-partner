import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity
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
  LIGHTBLUE,
  GREY_2,
  GREY_3,
} from '../../assets/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonComponent from '../../components/ButtonComponent';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontIsto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WithNetInfo from '../../components/hoc/withNetInfo';
import SelectDropdown from 'react-native-select-dropdown';
import {add, color} from 'react-native-reanimated';

const HEIGHT = Dimensions.get('screen').height;

const idCards = ['Pan Card', 'Aadhaar Card', 'Driving License', 'Voter ID'];
const shopTypes = [
  'Independent store owner',
  'Franchise store',
  'Mall representative',
];

const options = {
  mediaType: 'photo',
  quality: 0.5,
};

function RegisterShop({route, navigation}) {
  const [ownerName, setOwnerName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState(
    route.params ? route.params.address : null,
  );
  const [pincode, setPincode] = useState('');
  const [website, setWebsite] = useState('');
  const [shopType, setShopType] = useState('');
  const [error, setError] = useState({});
  const [idPicUrl, setIdPicUrl] = useState(null);
  const [idPicName, setIdPicName] = useState(null);

  useEffect(() => {
    if (route.params !== undefined) {
      const newAddress = route.params.address;
      setAddress(newAddress);
    } else {
      return;
    }
  }, [route]);

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

  const pickImage = () => {
    launchImageLibrary(options, ({assets, didCancel}) => {
      if (assets) {
        console.log(assets);
      }
    });
  };

  const next = () => {
    if (isValidate()) navigation.navigate('ShopDetails');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar  
        barStyle="light-content"
        backgroundColor={PRIMARY} 
      />
      <View style={styles.contentContainer}>
        <View style={styles.information}>
          <MaterialComunityIcons
            name="information-outline"
            size={25}
            color="red"
          />
          <Text style={styles.informationText}>
            Be at your shop while entering information so that we can get exact
            location of your shop.
          </Text>
        </View>
        <Text style={styles.title}>Add shop details</Text>

        <View style={styles.box}>
          <FontAwesome5 name="user-circle" size={25} color="black" />
          <TextInput
            value={ownerName}
            onChangeText={value => setOwnerName(value)}
            placeholder="Your Name"
            style={commonstyles.input}
          />
        </View>

        <View style={styles.box}>
          <FoundationIcon name="telephone" size={28} color="black" />
          <TextInput
            value={phoneNumber}
            onChangeText={value => setPhoneNumber(value)}
            placeholder="Phone Number"
            style={commonstyles.input}
          />
        </View>

        <View style={styles.box}>
          <FontIsto name="shopping-store" size={20} color="black" />
          <TextInput
            value={shopName}
            onChangeText={value => setShopName(value)}
            placeholder="Shop Name"
            style={commonstyles.input}
          />
        </View>

        <View style={styles.box}>
          <EntypoIcon name="location" size={25} color={DARKBLACK} />
          <TextInput
            value={address}
            disabled
            multiline
            style={[
              commonstyles.input,
              {width: '80%', },
            ]}
            placeholder="Shop Address"
          />
          <MaterialIcons
            name="my-location"
            size={25}
            color={DARKBLACK}
            onPress={() =>
              navigation.navigate('Maps', {
                address: address,
              })
            }
          />
        </View>

        <View style={styles.box}>
          <MaterialIcons name="location-pin" size={28} color={DARKBLACK} />
          <TextInput
            value={pincode}
            onChangeText={value => setPincode(value)}
            placeholder="Pincode"
            style={commonstyles.input}
          />
        </View>

        <View style={styles.dropdown}>
          <FontAwesome name="id-card-o" size={18} color={DARKBLACK} />
          <SelectDropdown
            data={idCards}
            defaultButtonText="Your ID Proof"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            renderDropdownIcon={() => (
              <EntypoIcon name="chevron-down" size={25} color={DARKBLACK} />
            )}
            buttonStyle={[commonstyles.input, {width: '91%', marginLeft: 0}]}
            buttonTextStyle={{
              textAlign: 'left',
              fontFamily: 'Gilroy-Medium',
              fontSize: 15,
            }}
            dropdownStyle={{borderRadius: 10}}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        <View style={styles.uploadImage}>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.transparentButton}>
            <MaterialIcons
              name="add-circle-outline"
              size={22}
              color={PRIMARY}
            />
            <Text style={styles.buttonText}>Add Front image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.transparentButton}>
            <MaterialIcons
              name="add-circle-outline"
              size={22}
              color={PRIMARY}
            />
            <Text style={styles.buttonText}>Add Back image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <MaterialComunityIcons name="web" size={22} color="#000" />
          <TextInput
            value={website}
            onChangeText={value => setWebsite(value)}
            placeholder="Website (if any)"
            style={commonstyles.input}
          />
        </View>
        
        <View style={styles.shoptype}>
          <SelectDropdown
            data={shopTypes}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultValueByIndex={0}
            renderDropdownIcon={() => (
              <EntypoIcon name="chevron-down" size={25} color="#000" />
            )}
            dropdownStyle={{borderRadius: 10}}
            buttonStyle={[commonstyles.input, {width: '100%', marginLeft: 0}]}
            buttonTextStyle={{
              color: DARKGREY,
              textAlign: 'left',
              fontFamily: 'Gilroy-Medium',
              fontSize: 16,
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>

        <ButtonComponent
          label="Next"
          color="white"
          backgroundColor={DARKBLUE}
          onPress={next}
        />
      </View>
      {/* <View style={styles.footer}>
        <Text style={styles.footerLabel}>By continuing you agree to our</Text>
        <TouchableOpacity>
          <Text style={styles.footerOtherLabel}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}

const commonstyles = {
  input: {
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: 'Gilroy-Medium',
    width: '90%',
  },
};

const styles = StyleSheet.create({
  container: {
    height: '150%',
    backgroundColor: 'white',
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  informationText: {
    paddingHorizontal: 10,
    fontFamily: 'Gilroy-Medium',
    color: 'black',
    fontSize: 14,
  },
  contentContainer: {
    minHeight: HEIGHT * 0.6,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    color: DARKBLACK,
    fontSize: 22,
    paddingLeft: 15,
    fontFamily: 'Gilroy-Bold',
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
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: DARKGREY,
    marginHorizontal: 10,
  },
  shoptype: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: DARKGREY,
    borderRadius: 10,
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
    marginTop: 3,
  },
  subLabel: {
    color: LIGHTBLACK,
    fontSize: 13,
  },
  optionalLabel: {
    marginLeft: 5,
    color: DARKGREY,
  },
  box: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: GREY_2,
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
    fontFamily: 'Gilroy-Medium',
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
    fontFamily: 'Gilroy-Bold',
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
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  imagePath: {
    marginVertical: 5,
    fontSize: 12,
  },
  transparentButton: {
    paddingVertical: 4,
    backgroundColor: LIGHTBLUE,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '45%',
  },
  buttonText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    color: DARKBLACK,
  },
});

export default WithNetInfo(RegisterShop);
