import Clipboard from '@react-native-clipboard/clipboard';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  BLACK,
  ERROR_MESSAGE,
  PRIMARY,
  SUCCESS_MESSAGE,
  WHITE,
} from '../../assets/colors';
import {
  moderateScale,
  textScale,
  verticalScale,
} from '../../utils/responsiveSize';
import ToastMessage from '../common/ToastComponent';

const TransactionCard = ({item}) => {
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
            name="wallet"
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
      <View style={styles.left}>
        <View style={styles.iconPaymentType}>
          {getImageType(item.transactionPurpose)}
        </View>
      </View>

      {/* mid */}
      <View style={styles.mid}>
        {/* <Text style={{ ...styles.secondaryText, color: BLACK }}>
              {item.transactionPurpose === 'SHOP_PAYMENT' ? 'Transaction Id:' : 'Referral Id:'}
            </Text> */}
        <Text style={styles.primaryText}>
          {item._id}{' '}
          <MaterialIcons name="content-copy" onPress={() => copyId(item._id)} />
        </Text>
        <Text
          style={{
            ...styles.primaryText,
            color: PRIMARY,
            marginVertical: verticalScale(4),
          }}>
          {item.customerPhone}
        </Text>
        {/* date */}
        <View>
          <Text style={styles.textTxnDate}>
            Paid on {moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}
          </Text>
          {/* settlement date */}
          {item.transactionPurpose === 'SHOP_PAYMENT' ? (
            <Text style={styles.textSettlementStatus}>
              {item.settlementDone
                ? `Settled: ${moment(item.directTransferSettlementTime).format(
                    'DD MMM YYYY, hh:mm A',
                  )}`
                : `To be settled: ${'\u20B9'}${
                    item.directTransferAmount ? item.directTransferAmount : 0
                  }`}
            </Text>
          ) : null}
        </View>
      </View>

      {/* right */}
      <View style={styles.right}>
        <Text style={{...styles.primaryText, color: BLACK, fontSize: 18}}>
          {'\u20B9'}
          {item.totalAmount}
        </Text>
        <View style={styles.status}>
          <MaterialIcons
            name="check"
            size={14}
            color={item.status === 'SUCCESS' ? SUCCESS_MESSAGE : ERROR_MESSAGE}
          />
          <Text
            style={{
              ...styles.statusText,

              color:
                item.status === 'SUCCESS' ? SUCCESS_MESSAGE : ERROR_MESSAGE,
            }}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;

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
  primaryText: {
    fontSize: textScale(12),
    fontFamily: 'Gilroy-Bold',
    color: PRIMARY,
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
  textSettlementStatus: {
    color: BLACK,
    fontSize: textScale(10),
  },
  textTxnDate: {
    color: BLACK,
    fontSize: textScale(10),
  },
  itemWrapper: {
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    padding: moderateScale(16),
    borderRadius: moderateScale(4),
    margin: 2,
    elevation: 3,
  },
  iconPaymentType: {
    borderRadius: moderateScale(1000),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    padding: moderateScale(16),
  },
});
