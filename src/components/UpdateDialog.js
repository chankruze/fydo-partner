import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import LottieView from 'lottie-react-native'
import { Linking } from 'react-native'
import { PRIMARY } from '../assets/colors';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export default function UpdateDialog({ updateVisible }) {

    const navigateToPlayStore = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL("https://apps.apple.com/app/fydo/id1612594091")
        }
        else if (Platform.OS === 'android') {
            Linking.openURL("https://play.google.com/store/apps/details?id=com.letsdevelopit.lfydcustomer")
        }
    }

    return (
        <Dialog
            width={Dimensions.get('window').width - 60}
            visible={updateVisible}>
            <DialogContent
                style={{ alignItems: 'center' }}>
                <Text style={styles.title}>We are now available with new features, tap to update!</Text>
                {/* <LottieView
                    style={{
                        width: HEIGHT * .35,
                        height: WIDTH * .60,
                        alignSelf: 'center',
                    }}
                    source={require('../../assets/update.json')}
                    loop={true}
                    autoPlay={true}
                /> */}
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={navigateToPlayStore}>
                    <Text style={styles.updateButtonLabel}>Update</Text>
                </TouchableOpacity>
            </DialogContent>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    title: {
        width: '80%',
        fontSize: 16,
        fontFamily: 'Gilroy-Semibold',
        textAlign: 'center',
        marginTop: 20,
        alignSelf: 'center'
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
        fontFamily: 'Gilroy-Semibold',
        fontSize: 14,
    }
})