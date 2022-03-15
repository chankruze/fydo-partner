import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import { PRIMARY } from '../../assets/colors';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';

export default function MyOffersBottomSheet(){

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
            <Text style={styles.title}>Add Offer</Text>
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
        padding: 10
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
        color: PRIMARY
    }
})