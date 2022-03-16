import React, { useState } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { PRIMARY } from '../../assets/colors';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsData = [
    {
        id: '1',
        label: 'English',
        value: 'english',
        color: PRIMARY,
        labelStyle: {
            color: PRIMARY
        }
    }, 
    {
        id: '2',
        label: 'Hindi/हिन्दी',
        value: 'hindi',
        color: PRIMARY,
        labelStyle: {
            color: PRIMARY
        }
    },
    {
        id: '3',
        label: 'Odia/ଓଡ଼ିଆ ଭାଷା',
        value: 'odia',
        color: PRIMARY,
        labelStyle: {
            color: PRIMARY
        }
    }
]

export default function ChooseLanguageComponent(){

    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    const onStartShouldSetResponder = () => {
        return true
    };

    return (
        <View 
            style={styles.container} 
            onStartShouldSetResponder={onStartShouldSetResponder}>
            <Image 
                source={BottomsheetIcon}
                style={styles.bottomSheetIcon}
            />
            <Text style={styles.title}>Choose language</Text>
            <RadioGroup
                containerStyle={styles.radioContainer} 
                radioButtons={radioButtons} 
                onPress={onPressRadioButton}
            />
            <TouchableOpacity
                activeOpacity={.7} 
                style={styles.continueButton}>
                <Text style={styles.continueButtonLabel}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.label}>By continuing you agree to our</Text>
            <TouchableOpacity style={styles.termsConditionButton}>
                <Text style={styles.termsLabel}>Terms & conditions</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 300,
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 10,
        padding: 10,
    },
    bottomSheetIcon: {
        height: 8,
        width: 32,
        marginBottom: 30,
        alignSelf: 'center',
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black'
    },
    radioContainer: {
        alignItems: 'flex-start',
        paddingVertical: 20
    },
    radioButtonLabel: {
        color: 'red'
    },
    continueButton: {
        height: 40,
        backgroundColor: PRIMARY,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    },
    continueButtonLabel: {
        color: 'white',
        fontWeight: '500',
        letterSpacing: 1
    },
    termsConditionButton: {
        alignItems: 'center',

    },
    termsLabel: {
        color: PRIMARY,
        fontWeight: '500',
        marginBottom: 10
    },
    label: {
        alignSelf: 'center',
        marginVertical: 15,
        color: 'gray',
        fontSize: 14
    },
})