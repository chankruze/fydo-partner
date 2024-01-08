import { StyleSheet, Text, View,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical, textScale } from '../../utils/responsiveSize'
import { SECONDARY, WHITE } from '../../assets/colors'

const CardIconButton = (props) => {
    const {
        title,
        buttonTitle,
        icons,
        cardLabelStyle,
        cardButtonStyle,
        onPress
    } = props
  return (
    <View style={styles.CardContainer}>
            <TouchableOpacity style={styles.Card} onPress={onPress}>
              {icons}
              <View style={styles.cardLabelContainer}>
                <Text  style={{...styles.cardLabel,...cardLabelStyle}}>
                  {title}
                </Text>
                <Text style={{...styles.cardButtonLabel,...cardButtonStyle}}>{buttonTitle}</Text>
              </View>
            </TouchableOpacity>
          </View>
  )
}

export default CardIconButton

const styles = StyleSheet.create({
    CardContainer: {
        padding: moderateScale(12),
        paddingVertical: moderateScaleVertical(10),
      },
      Card: {
        height: moderateScale(60),
        borderRadius: moderateScale(10),
        backgroundColor: SECONDARY,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
      },
      cardLabelContainer: {
        marginLeft: moderateScale(15),
      },
      cardLabel: {
        color: WHITE,
        fontSize: textScale(12),
        fontWeight:'500',
        fontFamily: 'Gilroy-Medium'
      },
      cardButtonLabel: {
        fontFamily: 'Gilroy-Medium',
        letterSpacing: 0.3,
        color: WHITE,
        fontSize: textScale(8),
        marginTop:moderateScaleVertical(5)
      },

})