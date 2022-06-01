import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WHITE,BLACK,GREY_1,PRIMARY } from '../../assets/colors'
import { moderateScale,moderateScaleVertical,textScale } from '../../utils/responsiveSize'
import moment from 'moment';
const ReferralCard = ({item}) => {
    const  shortName = (str1) => {
        if (str1) {
            var split_names = str1.trim().split(" ");
            if (split_names.length > 1) {
                return (split_names[0].charAt(0) + split_names[split_names.length - 1].charAt(0));
            }
            return split_names[0].charAt(0);
        }
      };
  return (
    <View style={styles.itemWrapper}>
         <View style={styles.cardWrapper}>
            <View style={styles.leftWrapper}>
                  <View style={{...styles.icon, backgroundColor: PRIMARY}}>
                      <Text style={styles.iconContent}>{item?.referredUser?.name && shortName(item?.referredUser?.name && item?.referredUser?.name)}{item?.referredShop?.name && shortName(item?.referredShop?.name && item?.referredShop?.name)}</Text>
                  </View>
                  <View>
                          <Text style={{...styles.titleText,marginBottom:moderateScaleVertical(5)}}>Referred {item?.referredUser?.name && 'User'} {item?.referredShop?.name && 'Shop'}</Text>
                          <Text style={styles.primaryText}>{item?.referredUser?.name && item?.referredUser?.name} {item?.referredShop?.name && item?.ActivityIndicatorreferredShop?.name}</Text>
                  </View>
            </View>
         <View style={styles.rightWrapper}>
            <View>
              <Text style={{...styles.titleText,marginBottom:moderateScaleVertical(5)}}>Referred on</Text>
              <Text style={styles.primaryText}>{moment(item?.createdAt).format('DD-MMMM-YYYY')}</Text>
            </View>
         </View>
         </View>
      </View>
  )
}

export default ReferralCard

const styles = StyleSheet.create({
    primaryText: {
        fontSize: textScale(14),
        fontFamily:'Gilroy-Medium',
        color:BLACK
    },
    titleText: {
        fontSize:textScale(12),
        color:GREY_1
    },
    iconContent: {
        flex: 1,
        paddingVertical: moderateScaleVertical(5),
        paddingHorizontal:moderateScale(2),
        fontSize: textScale(22),
        fontFamily:'Gilroy-Bold',
        color: WHITE,
        justifyContent:'center',
    },
    icon:{
        borderRadius: 25,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        padding: moderateScale(5)
    },
    itemWrapper:{
        backgroundColor: WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        padding:moderateScale(10),
        borderRadius:moderateScale(4),
        margin:moderateScale(2)
      },
      cardWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
      leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      rightWrapper:{
          alignItems:'flex-end'
      },
})