import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSize'
import { LIGHTBLUE, PRIMARY } from '../../assets/colors'

const SquareIconButton = ({onPress,icon,label}) => {
  return (
    <TouchableOpacity
              onPress={onPress}
              style={styles.buttonContainer}>
              {icon}
              <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SquareIconButton

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        flex: 1,
        marginRight: moderateScale(5),
        height: moderateScale(70),
        justifyContent: 'center',
        elevation: 3,
        borderRadius: moderateScale(5),
        backgroundColor: LIGHTBLUE,
        shadowColor: 'rgba(227, 242, 253, 1)',
      },
      label: {
        color: PRIMARY,
        fontSize: textScale(13),
        marginTop:moderateScaleVertical(5),
        fontFamily: 'Gilroy-Medium',
        letterSpacing: 0.3,
      },
})