import React from 'react';
import { View, StyleSheet } from 'react-native';
// import LottieView from 'lottie-react-native'

export default function Footer({ size, isLast }) {
    return (
        <>
            {!isLast &&
                (
                    <View style={styles.loaderView}>
                        {/* <LottieView
                            style={{
                                width: 55,
                                height: 55,
                            }}
                            source={require('../../assets/loader.json')}
                            autoPlay={true}
                        /> */}
                    </View>
                )}
            <View
                style={{
                    width: size,
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    loaderView: {
        width: 70,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
})