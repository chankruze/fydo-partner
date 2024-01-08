import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {PRIMARY} from '../assets/colors';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export default function UpdateDialog({updateVisible}) {
  const navigateToPlayStore = () => {
    const url =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/app/fydo/id1612594091'
        : 'https://play.google.com/store/apps/details?id=com.letsdevelopit.lfydcustomer';

    Linking.openURL(url);
  };

  return (
    <Dialog width={Dimensions.get('window').width - 60} visible={updateVisible}>
      <DialogContent style={{alignItems: 'center'}}>
        <Text style={styles.title}>
          We are now available with new features, tap to update!
        </Text>
        <LottieView
          style={{
            width: HEIGHT * 0.35,
            height: WIDTH * 0.6,
            alignSelf: 'center',
          }}
          source={require('../assets/update.json')}
          loop={true}
          autoPlay={true}
        />
        <TouchableOpacity
          style={styles.updateButton}
          onPress={navigateToPlayStore}>
          <Text style={styles.updateButtonLabel}>Update</Text>
        </TouchableOpacity>
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '80%',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
    marginTop: 20,
    alignSelf: 'center',
    color: 'black',
  },
  updateButton: {
    width: '90%',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY,
    height: 40,
    borderRadius: 6,
  },
  updateButtonLabel: {
    color: 'white',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
  },
});
