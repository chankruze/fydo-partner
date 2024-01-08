import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {connect} from 'react-redux';
import {BLACK, PRIMARY, WHITE} from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';
import {
  getSettlement,
  getTransactionAmount,
} from '../services/transactionService';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../utils/responsiveSize';
import {SettlementList} from './transaction/SettlementList';
import {TransactionList} from './transaction/TransactionList';

const TransactionScreen = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [types, setTypes] = useState(['payments', 'settlements']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalKey, setTotalKey] = useState(0);
  const [recentKey, setRecentKey] = useState(0);

  const [recentSettlements, setRecentSettlements] = useState([]);

  const viewPagerRef = useRef();

  useEffect(() => {
    apiTransactionAmonut();
  }, []);

  useEffect(() => {
    apiRecentSettlements();
  }, []);

  const apiRecentSettlements = async () => {
    try {
      let params = {
        startDate: 0,
        endDate: 1761611872252,
      };

      const response = await getSettlement(2, 0, params);
      setRecentSettlements(response);
    } catch (error) {
      console.log('error-->', error);
    }
  };

  const apiTransactionAmonut = async () => {
    try {
      const response = await getTransactionAmount(user?.accessToken);
      setTotal(response?.totalUnsettledAmount);
    } catch (error) {
      console.log('error-->', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <SafeAreaView>
          <ActivityIndicator size="large" color={PRIMARY} />
        </SafeAreaView>
      </View>
    );
  }

  const renderIndicators = () => {
    return types.map((item, index) => {
      return (
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                currentIndex == index ? '#F1F2F6' : 'rgba(255,255,255,0.5)',
            },
          ]}
          key={index}
        />
      );
    });
  };

  const handleIndicator = ({nativeEvent}) => {
    setCurrentIndex(nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <View>
          <PagerView
            ref={viewPagerRef}
            style={styles.pagerView}
            onPageSelected={handleIndicator}
            showPageIndicator={false}>
            {types.map((i, index) => {
              return (
                <ImageBackground
                  source={require('../assets/images/bgTransaction.png')}
                  style={{
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <View style={styles.headerContainer}>
                    {currentIndex === 0 ? (
                      <View key={totalKey}>
                        <Text style={styles.headerTitle}>
                          Amount to Settled
                        </Text>
                        <Text style={styles.headerTotal}>
                          {'\u20B9'} {total ? total : 0}
                        </Text>
                        {/* <Text style={{
                          fontSize: textScale(12),
                          color: WHITE,
                          fontFamily: 'Gilroy-Medium',
                          marginTop: verticalScale(8)
                        }}>Total Number of Payments 23</Text> */}
                      </View>
                    ) : (
                      <View key={recentKey}>
                        <Text style={styles.headerTitle}>
                          Recent Settlements
                        </Text>
                        <View style={styles.row}>
                          <View>
                            <Text
                              style={[
                                styles.headerTotal,
                                {
                                  fontSize: textScale(28),
                                },
                              ]}>
                              {'\u20B9'} {recentSettlements[0]?.amount || 0}
                            </Text>
                            <Text
                              style={[
                                styles.headerTotal,
                                {
                                  fontSize: textScale(12),
                                },
                              ]}>{`Settled on ${moment(
                              recentSettlements[0]?.createdAt,
                            ).format('DD MMM')}`}</Text>
                          </View>
                          <View
                            style={{
                              borderRightWidth: 1,
                              borderRightColor: WHITE,
                              height: verticalScale(50),
                              marginHorizontal: moderateScale(15),
                            }}
                          />
                          <View>
                            <Text
                              style={[
                                styles.headerTotal,
                                {
                                  fontSize: textScale(28),
                                },
                              ]}>
                              {'\u20B9'} {recentSettlements[1]?.amount || 0}
                            </Text>
                            <Text
                              style={[
                                styles.headerTotal,
                                {
                                  fontSize: textScale(12),
                                },
                              ]}>{`Settled on ${moment(
                              recentSettlements[1]?.createdAt,
                            ).format('DD MMM')}`}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </ImageBackground>
              );
            })}
          </PagerView>

          <View style={styles.indicators}>{renderIndicators()}</View>
        </View>

        {currentIndex === 0 ? (
          <TransactionList
            user={user}
            refreshBalance={() => {
              apiTransactionAmonut();
              setTotalKey(Math.random());
            }}
          />
        ) : (
          <SettlementList
            user={user}
            refreshBalance={() => {
              apiRecentSettlements();
              setRecentKey(Math.random());
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};
export default connect(mapStateToProps)(WithNetInfo(TransactionScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
    backgroundColor: WHITE,
  },
  linearGradientStyle: {
    width: '100%',
    paddingVertical: moderateScaleVertical(25),
    position: 'relative',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // marginBottom: verticalScale(20)
  },
  headerTitle: {
    fontSize: textScale(18),
    color: WHITE,
    fontFamily: 'Gilroy-Regular',
    marginVertical: moderateScaleVertical(5),
  },
  headerTotal: {
    fontSize: textScale(50),
    fontFamily: 'Gilroy-Medium',
    color: WHITE,
    // marginBottom: moderateScaleVertical(15),
  },
  notFoundText: {
    marginTop: moderateScaleVertical(15),
    alignSelf: 'center',
    fontFamily: 'Gilroy-Medium',
    color: BLACK,
    fontSize: textScale(18),
  },
  lineStyle: {
    marginVertical: moderateScaleVertical(5),
  },
  pagerView: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: 8,
    paddingVertical: 10,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#505050',
    marginHorizontal: 3,
    borderWidth: 0.4,
    borderColor: 'grey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
});
