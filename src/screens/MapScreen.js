import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { DARKBLUE, GREY, PRIMARY } from '../assets/colors/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import locationPin from '../assets/images/location-pin.png';
import pinIcon from '../assets/images/pin.png';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchLocation, GetPostalAddress } from '../services/mapService';
import { isNotchDevice } from '../utils/deviceInfo';
import Permissions, {
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API } from '../config/endpoints';
import { hasNotch } from 'react-native-device-info';

const MapScreen = ({ navigation, route }) => {
  const [region, setRegion] = useState({
    latitude: 27.2046,
    longitude: 77.4977,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 27.2046,
    longitude: 77.4977,
  });
  const [locationChange, setLocationChange] = useState(false);
  const [text, onChangeText] = useState('');
  const [address, setAddress] = useState(route.params?.address);
  // const [address, setAddress] = useState('Sikar');

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    try {
      let granted;
      if (Platform.OS == 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      } else {
        granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
          result => {
            return result;
          },
        );
      }
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async ({ coords }) => {
            let { latitude, longitude } = coords;
            let location = { latitude: latitude, longitude: longitude };
            const address = await GetPostalAddress(latitude, longitude);

            if (address?.status === 'OK') {
              setAddress(address?.results[0]?.formatted_address);
            }

            // GetPostalAddress(latitude, longitude)
            //   .then(res => {
            //     setAddress(res.formatted_address);
            //   })
            //   .catch(err => console.log(err));
            setSelectedLocation(location);
            setRegion(Object.assign({ ...region }, { ...location }));
            setLocationChange(true);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            forceLocationManager: true,
            forceRequestLocation: true,
          },
        );
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const setLocation = () => {
    Geolocation.getCurrentPosition(
      async ({ coords }) => {
        let { latitude, longitude } = coords;
        let location = { latitude: latitude, longitude: longitude };
        const address = await GetPostalAddress(latitude, longitude);

        if (address?.status === 'OK') {
          setAddress(address?.results[0]?.formatted_address);
        }
        setSelectedLocation(location);
        setRegion(Object.assign({ ...region }, { ...location }));
        setLocationChange(true);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, //Solve the error....................
        maximumAge: 10000,
        forceLocationManager: true,
        forceRequestLocation: true,
      },
    );
  };

  const onDragEnd = async e => {
    let coordinate = e.nativeEvent.coordinate;
    let { latitude, longitude } = coordinate;
    const address = await GetPostalAddress(latitude, longitude);

    console.log("add==>", address, coordinate)

    if (address?.status === 'OK') {
      setAddress(address?.results[0]?.formatted_address);
    }
    setSelectedLocation(coordinate);
    setRegion(Object.assign({ ...region }, { ...coordinate }));
    setLocationChange(true);
  };

  const confirmAddress = () => {
    let data = {
      address: address,
      coordinates: [
        region.latitude,
        region.longitude
      ]
    }
    navigation.navigate('RegisterShop', { map: data })
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} region={region}>
        <Marker
          draggable={true}
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          onDragEnd={onDragEnd}
          // image={locationPin}
          title="You'll need to long press the marker to drag it.."
        />
      </MapView>
      <View style={styles.searchView}>
        {/* <TextInput
          placeholder="Enter the city"
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          returnKeyType="search"
          onSubmitEditing={e => onSubmit(e.nativeEvent.text)}
        /> */}
        <Icon name="search-outline" size={22} color="black" style={styles.iconView} />
        <GooglePlacesAutocomplete
          placeholder='Search City'
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={'search'} // Can be left out for default return key 
          listViewDisplayed={true}    // true/false/undefined
          fetchDetails={true}
          onPress={async (data, details = null) => { // 'details' is provided when fetchDetails = true
            let lat = details.geometry.location?.lat;
            let lng = details.geometry.location?.lng;
            let location = {
              latitude: lat,
              longitude: lng
            };
            setRegion(Object.assign({ ...region }, { ...location }));
            setSelectedLocation(location);
            setLocationChange(true);
            const address = await GetPostalAddress(lat, lng);

            if (address?.status === 'OK') {
              setAddress(address?.results[0]?.formatted_address);
            }
          }
          }
          query={{
            key: GOOGLE_MAP_API,
            language: 'en'
          }}
          textInputProps={{
            zIndex: 1,
            selectTextOnFocus: true,
            placeholderTextColor: 'gray'
          }}
          styles={{
            textInput: styles.searchInput,
            listView: { color: 'black', zIndex: 1 },
            description: { color: 'black' }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={300}
        />
      </View>
      <View
        style={Object.assign(
          { ...styles.confirmButton },
          { opacity: locationChange ? 1 : 0.8 },
        )}>
        <TextInput
          style={styles.selectedLocation}
          disabled
          value={address}
          multiline
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.check}
          disabled={!locationChange}
          onPress={confirmAddress}>
          <MaterialIcons name="check" size={25} color={DARKBLUE} />
        </TouchableOpacity>
      </View>

      <FAB
        onClickAction={setLocation}
        buttonColor="white"
        iconTextColor={DARKBLUE}
        snackOffset={80}
        iconTextComponent={
          <MaterialIcons name="my-location" color="red" size={20} />
        }
        visible={true}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: -1,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  searchView: {
    // backgroundColor: 'white',
    // flexDirection: 'row-reverse',
    // width: '95%',
    // alignSelf: 'center',
    // position: 'absolute',
    // top: isNotchDevice ? 50 : 10,
    // height: 45,
    // borderRadius: 10,
    // paddingHorizontal: 25,
    // alignItems: 'center',
    // zIndex: 10,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: '95%',
    top: hasNotch ? 50 : 30
  },
  confirmButton: {
    borderRadius: 5,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: isNotchDevice ? 20 : 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: GREY,
  },
  check: {
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  confirmLocationLabel: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.4,
    fontWeight: '500',
  },
  input: {
    fontSize: 18,
    color: 'black',
    width: '95%',
    paddingHorizontal: 20,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.2,
  },
  pinIcon: {
    width: 20,
    height: 20,
    resizeMode: 'center',
  },
  selectedLocation: {
    fontFamily: 'Gilroy-Medium',
    width: '90%',
    letterSpacing: 0.3,
  },
  searchInput: {
    paddingLeft: 40,
    color: 'black',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3
  },
  iconView: {
    color: PRIMARY,
    left: 30,
    top: 12,
    zIndex: 2
  },
});
