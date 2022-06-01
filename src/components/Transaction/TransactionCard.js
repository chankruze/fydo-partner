import { StyleSheet, Text, View,ToastAndroid } from 'react-native'
import React from 'react'
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    moderateScaleVertical,
    textScale,
    moderateScale,
  } from '../../utils/responsiveSize';
import {
    BLACK,
    ERROR_MESSAGE,
    GREY_2,
    PRIMARY,
    SUCCESS_MESSAGE,
    WHITE
  } from '../../assets/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const TransactionCard = ({item}) => {

    const getImageType = (transactionType) => {
      switch (transactionType) {
        case 'REFERRAL': {
            return <FontAwesome name='bullhorn' style={styles.iconContent}/>;
        }
        case 'SHOP_PAYMENT': {
            return <Fontisto name='shopping-store' style={styles.iconContent}/>;
        }
        default: { 
            return <MaterialIcons style={styles.iconContent} name="account-balance-wallet" />;
        }
      }
    }
    const copyId = (id) => {
        Clipboard.setString(id);
        if (Platform.OS == 'android') {
            ToastAndroid.show('Copied', ToastAndroid.SHORT);
        } else {
            Toast.show('Copied', Toast.SHORT);
        }
    }
  return (
    <View style={styles.itemWrapper} key={item._id}>
    <View
      style={{
        ...styles.cardWrapper,
        marginBottom: moderateScaleVertical(5),
      }}>
      <View style={styles.leftWrapper}>
        <Text
          style={{
            ...styles.primaryText,
            color:
              item?.status === 'SUCCESS'
                ? SUCCESS_MESSAGE
                : ERROR_MESSAGE,
          }}>
          {item?.status}
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={{...styles.secondaryText, color: GREY_2}}>
          {moment(item?.createdAt).format('DD MMMM YYYY hh:mm A')}
        </Text>
      </View>
    </View>
    <View style={styles.cardWrapper}>
      <View style={styles.leftWrapper}>
        <View style={{...styles.icon, backgroundColor: PRIMARY}}>
            {getImageType(item?.transactionPurpose)}
        </View>
        <View>
              <Text style={{...styles.secondaryText, color: BLACK}}>
              {item?.transactionPurpose === 'SHOP_PAYMENT' ? 'Transaction Id:' : 'Referral Id:'}
              </Text>
              <Text style={{...styles.primaryText, color: BLACK}}>
                {item?._id}{' '}
                <MaterialIcons 
                  name="content-copy"
                  onPress={() => copyId(item?.linkedTransaction)}
              />
              </Text>
        </View>
      </View>
      <View style={styles.rightWrapper}>
        <Text style={{...styles.primaryText, color: BLACK}}>
          {'\u20B9'}
          {item?.totalAmount}
        </Text>
      </View>
    </View>
    {item?.transactionPurpose === 'SHOP_PAYMENT' && (
      <Text
        style={{
          ...styles.secondaryText,
          color: GREY_2,
          alignSelf: 'flex-end',
        }}>
        {item?.settlementDone
          ? `Settled: ${moment(item?.directTransferSettlementTime).format(
              'DD MMMM YYYY hh:mm A',
            )}`
          : `To be settled: ${'\u20B9'}${
              item?.directTransferAmount ? item?.directTransferAmount : 0
            }`}
      </Text>
    )}
  </View>
  )
}

export default TransactionCard

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      rightWrapper: {
        alignItems: 'flex-end',
      },
      primaryText: {
        fontSize: textScale(12),
        fontFamily: 'Gilroy-Bold',
      },
      secondaryText: {
        fontSize: textScale(12),
        fontFamily: 'Gilroy-Medium',
      },
      itemWrapper: {
        backgroundColor: WHITE,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        padding: moderateScale(16),
        borderRadius: moderateScale(4),
        margin: 2,
      },
      iconContent: {
        flex: 1,
        fontSize: textScale(20),
        fontFamily: 'Gilroy-Bold',
        color: WHITE,
        justifyContent: 'center',
      },
      icon: {
        borderRadius: moderateScale(25),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(15),
        padding: moderateScale(12),
      },
})