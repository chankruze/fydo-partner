import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  BLACK,
  DARKBLUE,
  DARKGREY,
  GREY,
  LIGHTBLACK,
  LIGHTBLUE,
  PRIMARY,
  WHITE,
} from '../../assets/colors';
import ButtonComponent from '../../components/ButtonComponent';
import WithNetInfo from '../../components/hoc/withNetInfo';
import {generatePresignUrl} from '../../services/presignUrlService';

const idCards = ['Aadhaar Card', 'Driving License', 'Pan Card', 'Voter ID'];
const shopTypes = [
  'Independent store owner',
  'Franchise store',
  'Mall representative',
];

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
    myshop: state?.userReducer?.myshop,
  };
};

function RegisterShop({route, navigation, user, myshop}) {
  const isFocused = useIsFocused();
  // const edit = route.params?.edit;

  const [ownerName, setOwnerName] = useState(
    myshop ? myshop.owner?.ownerName : '',
  );
  const [phoneNumber, setPhoneNumber] = useState(myshop ? myshop.mobile : '');
  const [shopName, setShopName] = useState(myshop ? myshop.name : '');
  const [address, setAddress] = useState(
    myshop ? myshop?.address?.addressLine1 : '',
  );
  const [coordinates, setCoordinates] = useState([]);
  const [pincode, setPincode] = useState(myshop ? myshop?.address?.pin : '');
  const [website, setWebsite] = useState(myshop ? myshop.website : '');
  const [shopType, setShopType] = useState(myshop ? myshop.type : '');
  const [error, setError] = useState({});
  const [idType, setIdType] = useState(
    myshop ? myshop.documents[0].documentType : '',
  );
  const [frontImg, setFrontImg] = useState(
    myshop ? myshop.documents[0].documentFrontUrl : '',
  );
  const [backImg, setBacktImg] = useState(
    myshop ? myshop.documents[0].documentBackUrl : '',
  );

  useEffect(() => {
    if (isFocused) {
      getAddress();
    }
  }, [isFocused]);

  const getAddress = () => {
    const map = route.params?.map;
    // const edit = route.params?.edit;
    if (map) {
      setAddress(map?.address);
      setCoordinates(map?.coordinates);
      setPincode(map?.pincode);
    } else if (myshop) {
      setAddress(myshop?.address?.addressLine1);
      setCoordinates(myshop?.location);
    } else {
      setAddress('');
      setCoordinates([]);
    }
  };

  const isValidate = () => {
    const map = route.params?.map;
    const e = {};

    if (ownerName === null || ownerName?.trim() === '') {
      e.ownerName = 'Enter owner name';
    }

    if (pincode === null || pincode?.trim() === '') {
      e.pincode = 'Enter pin code';
    }

    if (
      phoneNumber === null ||
      phoneNumber?.trim() === '' ||
      phoneNumber.length !== 10
    ) {
      e.phoneNumber = 'Enter valid phone number';
    }

    if (shopName === null || shopName?.trim() === '') {
      e.shopName = 'Enter shop name';
    }

    if (!address) {
      e.address = 'Enter the shop address';
    }

    setError(e);

    if (Object.keys(e).length === 0) {
      return true;
    }

    return false;
  };

  const pickImage = type => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      // multiple: true,
      waitAnimationEnd: false,
      cropping: true,
      compressImageQuality: 1,
      // includeExif: true,
      forceJpg: true,
    }).then(assets => {
      if (assets) {
        let imageData = [assets];
        const data = imageData.map((i, index) => {
          return {
            // uri: i.path,
            uri:
              Platform.OS === 'android'
                ? i.path
                : i.path.replace('file://', ''),
            fileName:
              Platform.OS === 'ios'
                ? i.filename
                : i.path.substring(i.path.lastIndexOf('/') + 1),
          };
        });
        setImages(data, type);
      }
    });
  };

  const setImages = async (res, type) => {
    const shortUri = [res[0].fileName.split('.')[0]];
    const imageResponse = await generatePresignUrl(user?.accessToken, shortUri);
    const imageBody = await getBlob(res[0]?.uri);

    const final = await fetch(imageResponse[0], {
      method: 'PUT',
      body: imageBody,
    });

    if (final.status === 200) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Image upload Successfully', ToastAndroid.SHORT);
      } else {
        Toast.show('Image upload Successfully', Toast.SHORT);
      }

      if (type === 'front') {
        const _frontImage = imageResponse[0]?.split('?')[0];
        setFrontImg(_frontImage);
      } else if (type === 'back') {
        const _backImage = imageResponse[0]?.split('?')[0];
        setBacktImg(_backImage);
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Unable To Upload Image', ToastAndroid.SHORT);
      } else {
        Toast.show('Unable To Upload Image', Toast.SHORT);
      }
    }
  };

  const getBlob = async fileUri => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const next = async () => {
    if (isValidate()) {
      // const user = await getUser();

      let data = {
        ...myshop,
        name: shopName,
        mobile: phoneNumber,
        type: shopType,
        owner: {
          ownerName: ownerName,
          ownerMobile: phoneNumber,
        },
        location: coordinates,
        address: {
          addressLine1: address,
          pin: pincode,
        },
        documents: [
          {
            documentType: idType,
            documentBackUrl: backImg,
            documentFrontUrl: frontImg,
          },
        ],
        website,
      };
      navigation.navigate('ShopDetails', {data: data});
    }
  };

  const ownerNameChangeHandler = name => {
    error.ownerName = '';
    setOwnerName(name);
  };

  const phoneNumberChangeHandler = number => {
    error.phoneNumber = '';
    setPhoneNumber(number?.trim());
  };

  const shopNameChangeHandler = name => {
    error.shopName = '';
    setShopName(name);
  };

  const locationUpdateHandler = () =>
    navigation.navigate('Maps', {
      address: address,
    });

  const pincodeChangeHandler = number => {
    error.pincode = '';
    setPincode(number?.trim());
  };

  const storeTypeSelectionHandler = (selectedItem, index) => {
    setShopType(selectedItem);
  };

  const idSelectionHandler = (selectedItem, index) => {
    setIdType(selectedItem);
  };

  console.log({
    frontImg,
    backImg,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" backgroundColor={PRIMARY} translucent />

      <Text style={styles.informationText}>
        Be at your shop while entering information so that we can get exact
        location of your shop
      </Text>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={Platform.OS === 'ios'}>
        {/* title */}
        <Text style={styles.title}>Add shop details</Text>

        {/* owner name */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="user-alt" size={24} color={LIGHTBLACK} />
          <TextInput
            value={ownerName}
            onChangeText={ownerNameChangeHandler}
            placeholder="Owner Name (Required)"
            style={styles.input}
          />
          {error.ownerName ? (
            <Text style={styles.error}>{error.ownerName}</Text>
          ) : null}
        </View>

        {/* phone number */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="phone-alt" size={24} color={LIGHTBLACK} />
          <TextInput
            value={phoneNumber}
            onChangeText={phoneNumberChangeHandler}
            placeholder="Phone Number (Required)"
            style={styles.input}
            maxLength={10}
          />
          {error.phoneNumber ? (
            <Text style={styles.error}>{error.phoneNumber}</Text>
          ) : null}
        </View>

        {/* shop name */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="store-alt" size={24} color={LIGHTBLACK} />
          <TextInput
            value={shopName}
            onChangeText={shopNameChangeHandler}
            placeholder="Shop Name (Required)"
            style={styles.input}
          />
          {error.shopName ? (
            <Text style={styles.error}>{error.shopName}</Text>
          ) : null}
        </View>

        {/* address */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="map-marked-alt" size={24} color={LIGHTBLACK} />
          {address ? (
            <>
              <TextInput
                value={address}
                editable={false}
                multiline
                style={styles.input}
                placeholder="Shop Address (Required)"
              />
              <TouchableOpacity onPress={locationUpdateHandler}>
                <Text style={styles.updateButton}>Update</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={locationUpdateHandler} style={{flex: 1}}>
              <Text style={{padding: 12, color: DARKGREY}}>
                Click to Fetch Location
              </Text>
            </TouchableOpacity>
          )}

          {error.address ? (
            <Text style={styles.error}>{error.address}</Text>
          ) : null}
        </View>

        {/* pincode */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="map-marker-alt" size={24} color={LIGHTBLACK} />
          <TextInput
            value={pincode}
            onChangeText={pincodeChangeHandler}
            placeholder="Pincode (Required)"
            style={styles.input}
          />
          {error.pincode ? (
            <Text style={styles.error}>{error.pincode}</Text>
          ) : null}
        </View>

        {/* website */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="globe" size={24} color={LIGHTBLACK} />
          <TextInput
            value={website}
            onChangeText={value => setWebsite(value)}
            placeholder="Website (if any)"
            style={styles.input}
          />
        </View>

        {/* id card */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="id-card-alt" size={24} color={LIGHTBLACK} />
          <SelectDropdown
            data={idCards}
            defaultButtonText={idType ? idType : 'Your ID Proof'}
            onSelect={idSelectionHandler}
            renderDropdownIcon={() => (
              <FontAwesome5 name="chevron-down" size={16} color={LIGHTBLACK} />
            )}
            dropdownStyle={{borderRadius: 16}}
            buttonStyle={{backgroundColor: 'transparent', flex: 1}}
            buttonTextStyle={{
              color: BLACK,
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

        {/* upload id card */}
        <View style={styles.uploadImage}>
          {/* front image */}
          {frontImg ? (
            <View style={styles.idImageWrapper}>
              <Image
                style={styles.idImage}
                source={{
                  uri: frontImg,
                }}
              />
              <View style={styles.gutter} />
              <TouchableOpacity onPress={() => pickImage('front')}>
                <Text style={styles.updateButton}>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => pickImage('front')}
              style={styles.transparentButton}>
              <FontAwesome5 name="plus-circle" size={22} color={LIGHTBLACK} />
              <Text style={styles.buttonText}>Add Front Image</Text>
            </TouchableOpacity>
          )}

          {/* back image */}
          {backImg ? (
            <View style={styles.idImageWrapper}>
              <Image
                style={styles.idImage}
                source={{
                  uri: backImg,
                }}
              />
              <View style={styles.gutter} />
              <TouchableOpacity onPress={() => pickImage('back')}>
                <Text style={styles.updateButton}>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => pickImage('back')}
              style={styles.transparentButton}>
              <FontAwesome5 name="plus-circle" size={22} color={LIGHTBLACK} />
              <Text style={styles.buttonText}>Add Back Image</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* shop type */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="briefcase" size={24} color={LIGHTBLACK} />
          <SelectDropdown
            data={shopTypes}
            onSelect={storeTypeSelectionHandler}
            defaultButtonText={shopType ? shopType : 'Type of Store'}
            renderDropdownIcon={() => (
              <FontAwesome5 name="chevron-down" size={16} color={LIGHTBLACK} />
            )}
            dropdownStyle={{borderRadius: 16}}
            buttonStyle={{backgroundColor: 'transparent', flex: 1}}
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
      </KeyboardAwareScrollView>
      <View style={styles.next}>
        <ButtonComponent
          label="Next"
          color="white"
          backgroundColor={DARKBLUE}
          onPress={next}
        />
      </View>
      {/* next button */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    paddingHorizontal: 12,
    paddingBottom: 200,
  },
  informationText: {
    backgroundColor: LIGHTBLACK,
    fontFamily: 'Gilroy-Medium',
    color: WHITE,
    fontSize: 14,
    textAlign: 'center',
    padding: 12,
  },
  title: {
    color: PRIMARY,
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  updateButton: {
    backgroundColor: LIGHTBLACK,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  uploadImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  error: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Gilroy-Regular',
  },
  inputGroup: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: GREY,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 14,
    marginLeft: 12,
    fontFamily: 'Gilroy-Medium',
    color: 'black',
    flex: 1,
  },
  transparentButton: {
    backgroundColor: LIGHTBLUE,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '45%',
  },
  buttonText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: PRIMARY,
  },
  gutter: {
    height: 4,
  },
  idImageWrapper: {
    flexDirection: 'column',
  },
  idImage: {
    width: 140,
    height: 140,
    borderRadius: 16,
  },
  next: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default connect(mapStateToProps)(WithNetInfo(RegisterShop));
