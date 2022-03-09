import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY } from '../../assets/colors';

export default function HomeFab(){
    return (
        <TouchableOpacity style={styles.container}>
            <MaterialIcons 
                name='add-circle-outline'
                size={26}
                color={'white'}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: PRIMARY,
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})