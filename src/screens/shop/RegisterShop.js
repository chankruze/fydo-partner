import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ToastAndroid,
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
import ImagePicker from 'react-native-image-crop-picker';
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
import { add, color } from 'react-native-reanimated';
import { generatePresignUrl } from '../../services/presignUrlService';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { getUser } from '../../utils/defaultPreference';


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

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user
  }
}

function RegisterShop({ route, navigation, user }) {

  const [ownerName, setOwnerName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState(
    route.params ? route.params.address : null,
  );
  const [coordinates, setCoordinates] = useState(
    route.params ? route.params.coordinates : null,
  );
  const [pincode, setPincode] = useState('');
  const [website, setWebsite] = useState('');
  const [shopType, setShopType] = useState('');
  const [error, setError] = useState({});
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBacktImg] = useState(null);
  const [idType, setIdType] = useState('');
  // const [user, setUser] = useState('');

  useEffect(() => {
    console.log("add-->", route.params?.address);
    // if (route.params !== undefined) {
    //   const newAddress = route.params.address;
    //   setCoordinates(route.params?.coordinates)
    //   setAddress(newAddress);
    // } else {
    //   return;
    // }
  }, []);

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
    if (route.params?.address == null || route.params?.address?.trim() == '') {
      error.address = 'Enter the shop address';
    }
    setError(error);
    if (Object.keys(error).length == 0) return true;
    return false;
  };

  const pickImage = (type) => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      // multiple: true,
      waitAnimationEnd: false,
      cropping: true,
      // includeExif: true,
      forceJpg: true,
    })
      .then((assets) => {
        if (assets) {
          let imageData = [assets];
          const data = imageData.map((i, index) => {
            return {
              // uri: i.path,
              uri:
                Platform.OS === 'android'
                  ? i.path
                  : i.path.replace('file://', ''),
              fileName: i.filename
            };
          });
          setImages(data, type)
        }
      });
  };

  setImages = async (res, type) => {
    const shortUri = [res[0].fileName.split(".")[0]];
    const imageResponse = await generatePresignUrl(user?.accessToken, shortUri);
    const data = await imageResponse.json();
    const imageBody = await getBlob(res[0]?.uri);

    const final = await fetch(data[0], {
      method: 'PUT',
      body: imageBody
    });
    if (final.status == "200") {
      if (Platform.OS == 'android') {
        ToastAndroid.show('Image upload Successfully', ToastAndroid.SHORT);
      } else {
        Toast.show('Image upload Successfully', Toast.SHORT);
      }
      if (type == 'front') {
        const frontImage = data[0]?.split("?")[0];
        setFrontImg(frontImage)
      } else if (type == 'back') {
        const backImg = data[0]?.split("?")[0];
        setBacktImg(backImg)
      }
    } else {
      if (Platform.OS == 'android') {
        ToastAndroid.show('Unable To Upload Image', ToastAndroid.SHORT);
      } else {
        Toast.show('Unable To Upload Image', Toast.SHORT);
      }
    }
  }

  getBlob = async (fileUri) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const next = async () => {
    if (true) {
      let data = {
        name: shopName,
        mobile: phoneNumber,
        type: shopType,
        owner: {
          ownerName: ownerName,
          ownerMobile: phoneNumber
        },
        location: [
          route.params?.coordinates.longitude,
          route.params?.coordinates.latitude
        ],
        address: {
          addressLine1: route.params?.address,
          pin: pincode
        },
        documents: [
          {
            documentType: idType,
            documentBackUrl: backImg,
            documentFrontUrl: frontImg,
          }
        ]
      };
      navigation.navigate('ShopDetails', { data: data });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor={PRIMARY} translucent />
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={styles.information}>
            <MaterialComunityIcons
              name="information-outline"
              size={25}
              color="red"
            />
            <Text style={styles.informationText}>
              Be at your shop while entering information so that we can get
              exact location of your shop.
            </Text>
          </View>
          <Text style={styles.title}>Add shop details</Text>

          <View style={styles.box}>
            <FontAwesome5 name="user-circle" size={25} color="black" />
            <TextInput
              value={ownerName}
              onChangeText={value => setOwnerName(value)}
              placeholder="Your Name"
              style={styles.input}
            />
          </View>
          {error.ownerName && (
            <Text style={styles.error}>{error.ownerName}</Text>
          )}

          <View style={styles.box}>
            <FoundationIcon name="telephone" size={28} color="black" />
            <TextInput
              value={phoneNumber}
              onChangeText={value => setPhoneNumber(value)}
              placeholder="Phone Number"
              style={styles.input}
            />
          </View>
          {error.phoneNumber && (
            <Text style={styles.error}>{error.phoneNumber}</Text>
          )}

          <View style={styles.box}>
            <FontIsto name="shopping-store" size={20} color="black" />
            <TextInput
              value={shopName}
              onChangeText={value => setShopName(value)}
              placeholder="Shop Name"
              style={styles.input}
            />
          </View>
          {error.shopName && <Text style={styles.error}>{error.shopName}</Text>}

          <View style={styles.box}>
            <EntypoIcon name="location" size={25} color={DARKBLACK} />
            <TextInput
              value={route.params?.address}
              editable={false}
              multiline
              style={[styles.input, { width: '80%' }]}
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
          {error.address && <Text style={styles.error}>{error.address}</Text>}

          <View style={styles.box}>
            <MaterialIcons name="location-pin" size={28} color={DARKBLACK} />
            <TextInput
              value={pincode}
              onChangeText={value => setPincode(value)}
              placeholder="Pincode"
              style={styles.input}
            />
          </View>
          {error.pincode && <Text style={styles.error}>{error.pincode}</Text>}

          <View style={styles.dropdown}>
            <FontAwesome name="id-card-o" size={18} color={DARKBLACK} />
            <SelectDropdown
              data={idCards}
              defaultButtonText="Your ID Proof"
              onSelect={(selectedItem, index) => {
                setIdType(selectedItem)
              }}
              button
              renderDropdownIcon={() => (
                <EntypoIcon name="chevron-down" size={25} color={DARKBLACK} />
              )}
              buttonStyle={[styles.input, { width: '91%', marginLeft: 0 }]}
              buttonTextStyle={{
                textAlign: 'left',
                fontFamily: 'Gilroy-Medium',
                fontSize: 14,
              }}
              dropdownStyle={{ borderRadius: 10 }}
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
              onPress={() => pickImage('front')}
              style={styles.transparentButton}>
              <MaterialIcons
                name="add-circle-outline"
                size={22}
                color={PRIMARY}
              />
              <Text style={styles.buttonText}>Add Front image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImage('back')}
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
              style={styles.input}
            />
          </View>

          <View style={styles.shoptype}>
            <SelectDropdown
              data={shopTypes}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setShopType(selectedItem);
              }}
              defaultButtonText="Type of store"
              renderDropdownIcon={() => (
                <EntypoIcon name="chevron-down" size={25} color="#000" />
              )}
              dropdownStyle={{ borderRadius: 10 }}
              buttonStyle={[styles.input, { width: '100%', marginLeft: 0 }]}
              buttonTextStyle={{
                color: DARKGREY,
                textAlign: 'left',
                fontFamily: 'Gilroy-Medium',
                fontSize: 14,
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  informationText: {
    paddingHorizontal: 10,
    fontFamily: 'Gilroy-Medium',
    color: 'black',
    fontSize: 14,
    letterSpacing: 0.3
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  title: {
    color: DARKBLACK,
    fontSize: 18,
    paddingLeft: 10,
    marginVertical: 5,
    fontFamily: 'Gilroy-Bold',
  },
  uploadImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  error: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Gilroy-Regular',
    paddingLeft: 15,
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
    paddingBottom: 8,
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
    backgroundColor: 'transparent',
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: 'Gilroy-Medium',
    width: '90%',
    color: 'black',
    letterSpacing: 0.3
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
    fontSize: 12,
    color: DARKBLACK,
  },
});

export default connect(mapStateToProps)(WithNetInfo(RegisterShop));
