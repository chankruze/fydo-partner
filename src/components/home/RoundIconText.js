import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PRIMARY } from '../../assets/colors'
import { moderateScale, moderateScaleVertical } from '../../utils/responsiveSize'

const RoundIconText = ({label,onPress,icon}) => {
  return (
    <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onPress}>
              <View style={styles.button}>
                {icon}
              </View>
              <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default RoundIconText

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
      },
      button: {
        backgroundColor: PRIMARY,
        borderRadius: moderateScale(25),
        height: moderateScale(50),
        width: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center',
      },
      label: {
        marginTop: moderateScaleVertical(7),
        fontFamily: 'Gilroy-Bold',
        color: PRIMARY,
        letterSpacing: 0.3,
      },
})