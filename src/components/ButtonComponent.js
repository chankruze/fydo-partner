import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const WIDTH = Dimensions.get('screen').width;

export default function ButtonComponent({label, color, backgroundColor = 'white', onPress, loading = false}){
    let labelStyle = Object.assign({...styles.label}, {color: color});
    let buttonStyle = Object.assign({...styles.button}, {backgroundColor: backgroundColor});
    return (
        <TouchableOpacity 
            style={buttonStyle} 
            activeOpacity={.6}
            onPress={onPress}>
            {!loading && (
                <Text style={labelStyle}>{label}</Text>
            )}
            {loading && (
                <ActivityIndicator 
                    color="white"
                    size="large"/>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: WIDTH * 0.9,
        height: 48,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontWeight: '600',
        fontSize: 13
    },
})