import Clipboard from '@react-native-clipboard/clipboard';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  BLACK,
  ERROR_MESSAGE,
  GREY_2,
  PRIMARY,
  SUCCESS_MESSAGE,
  WHITE,
} from '../../assets/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../utils/responsiveSize';
import ToastMessage from '../common/ToastComponent';

const SettlementCard = ({item}) => {
  const getImageType = transactionType => {
    switch (transactionType) {
      case 'REFERRAL': {
        return <FontAwesome name="bullhorn" style={styles.iconContent} />;
      }
      case 'SHOP_PAYMENT': {
        return <Fontisto name="shopping-store" style={styles.iconContent} />;
      }
      default: {
        return (
          <MaterialIcons
            style={styles.iconContent}
            name="account-balance-wallet"
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
                item?.status === 'SUCCESS' ? SUCCESS_MESSAGE : ERROR_MESSAGE,
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

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{...styles.icon, backgroundColor: PRIMARY}}>
          {getImageType(item?.transactionPurpose)}
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              ...styles.primaryText,
              fontFamily: 'Gilroy-Medium',
              fontSize: 14,
              color: BLACK,
            }}>
            {item?.settlementId}{' '}
            <MaterialIcons
              name="content-copy"
              onPress={() => copyId(item?.settlementId)}
            />
          </Text>

          <View>
            <Text
              style={{
                ...styles.secondaryText,
                marginTop: verticalScale(2),
                color: GREY_2,
              }}>
              UTR no:
            </Text>
            <Text
              style={{
                ...styles.primaryText,
                fontFamily: 'Gilroy-Medium',
                fontSize: 12,
                color: BLACK,
                marginTop: verticalScale(2),
              }}>
              {item?.utr}
            </Text>
          </View>
        </View>
        <Text style={{...styles.primaryText, color: BLACK}}>
          {'\u20B9'}
          {item?.amount}
        </Text>
      </View>
      {/* <View style={styles.cardWrapper}>
                <View style={styles.leftWrapper}>
                    <View style={{ ...styles.icon, backgroundColor: PRIMARY }}>
                        {getImageType(item?.transactionPurpose)}
                    </View>
                    <View style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        backgroundColor: 'red'
                    }}>
                        <Text style={{
                            ...styles.primaryText,
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 14,
                            color: BLACK
                        }}>
                            {item?.settlementId}{' '}
                            <MaterialIcons
                                name="content-copy"
                                onPress={() => copyId(item?.settlementId)}
                            />
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                ...styles.secondaryText,
                                marginTop: verticalScale(2),
                                color: GREY_2
                            }}>
                                UTR no:
                            </Text>
                            <Text style={{
                                ...styles.primaryText,
                                fontFamily: 'Gilroy-Medium',
                                fontSize: 12,
                                color: BLACK,
                                marginTop: verticalScale(2),
                                marginLeft: moderateScale(4)
                            }}>
                                {item?.utr}dfgdfjkldjdlkjdlkgjldfkgjldgjgldj
                            </Text>
                        </View>
                    </View>
                    <Text style={{ ...styles.primaryText, color: BLACK }}>
                        {'\u20B9'}
                        {item?.amount}
                    </Text>
                </View>
            </View> */}
    </View>
  );
};

export default SettlementCard;

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
    elevation: 3,
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
});
