import Clipboard from '@react-native-clipboard/clipboard';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BLACK, GREY_2, PRIMARY, WHITE} from '../../assets/colors';
import {
  moderateScale,
  textScale,
  verticalScale,
} from '../../utils/responsiveSize';
import ToastMessage from '../common/ToastComponent';

const SettlementCard = ({item}) => {
  if (!item) {
    return null;
  }

  const getImageType = transactionType => {
    switch (transactionType) {
      case 'REFERRAL': {
        return (
          <FontAwesome5
            name="bullhorn"
            size={20}
            style={styles.icon}
            color={WHITE}
          />
        );
      }
      case 'SHOP_PAYMENT': {
        return (
          <FontAwesome5
            size={20}
            style={styles.icon}
            name="store"
            color={WHITE}
          />
        );
      }
      default: {
        return (
          <FontAwesome5
            size={20}
            style={styles.icon}
            name="wallet"
            color={WHITE}
          />
        );
      }
    }
  };

  const copyId = id => {
    Clipboard.setString(id);
    ToastMessage({message: 'Copied'});
  };

  return (
    <View style={styles.card} key={item._id}>
      {/* left */}
      <View style={styles.left}>
        <View style={styles.iconPaymentType}>
          {getImageType(item.transactionPurpose)}
        </View>
      </View>

      {/* mid */}
      <View style={styles.mid}>
        <Text style={styles.primaryText}>
          {item.settlementId}{' '}
          <MaterialIcons
            name="content-copy"
            onPress={() => copyId(item.settlementId)}
          />
        </Text>
        <Text
          style={{
            ...styles.secondaryText,
            marginVertical: verticalScale(4),
          }}>
          <Text style={styles.secondaryText}>UTR No: </Text>
          {item.utr}
        </Text>
        {/* date */}
        <View>
          <Text style={styles.textSettlementDate}>
            Settled on {moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}
          </Text>
        </View>
      </View>

      {/* right */}
      <View style={styles.right}>
        <Text style={{...styles.primaryText, color: BLACK, fontSize: 18}}>
          {'\u20B9'}
          {item.amount}
        </Text>
        {/* <View style={styles.status}>
          {item.status === 'SUCCESS' ? (
            <MaterialIcons name="check" size={14} color={SUCCESS_MESSAGE} />
          ) : (
            <MaterialIcons name="check" size={14} color={ERROR_MESSAGE} />
          )}
          <Text
            style={{
              ...styles.statusText,
              color:
                item.status === 'SUCCESS' ? SUCCESS_MESSAGE : ERROR_MESSAGE,
            }}>
            {item.status}
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default SettlementCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: moderateScale(4),
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    paddingVertical: moderateScale(16),
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  mid: {
    flex: 1,
    marginHorizontal: moderateScale(12),
  },
  right: {
    alignItems: 'flex-end',
  },
  textSettlementDate: {
    color: GREY_2,
    fontSize: textScale(10),
  },
  primaryText: {
    fontSize: textScale(14),
    fontFamily: 'Gilroy-Bold',
    color: PRIMARY,
  },
  secondaryText: {
    fontSize: textScale(12),
    fontFamily: 'Gilroy-Medium',
    color: BLACK,
  },
  iconPaymentType: {
    borderRadius: moderateScale(1000),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    padding: moderateScale(16),
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: textScale(10),
    fontFamily: 'Gilroy-Bold',
    textTransform: 'capitalize',
    marginStart: moderateScale(4),
  },
});
