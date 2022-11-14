import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  moderateScaleVertical,
  textScale,
  moderateScale,
  verticalScale,
} from '../utils/responsiveSize';
import { BLACK, GREY, GREY_2, PRIMARY, WHITE } from '../assets/colors';
import { connect } from 'react-redux';
import {
  getTransactionAmount,
} from '../services/transactionService';
import WithNetInfo from '../components/hoc/withNetInfo';
import PagerView from 'react-native-pager-view';
import { TransactionList } from './transaction/TransactionList';
import { SettlementList } from './transaction/SettlementList';

const TransactionScreen = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [types, setTypes] = useState(['payments', 'settlements']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewPagerRef = useRef();

  useEffect(() => {
    apiTransactionAmonut();
  }, []);

  const apiTransactionAmonut = async () => {
    try {
      const response = await getTransactionAmount(user?.accessToken);
      const json = await response.json();
      console.log('json amount-->', json);
      setTotal(json?.totalUnsettledAmount);
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
      return <View style={[styles.dot, {
        backgroundColor: currentIndex == index ?
          '#F1F2F6' : 'rgba(255,255,255,0.5)'
      }]} key={index} />
    })
  }

  const handleIndicator = ({ nativeEvent }) => {
    setCurrentIndex(nativeEvent.position);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <View>
          {console.log("kl==>", currentIndex, types)}
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
                    backgroundColor: 'white'
                  }}
                >
                  <View style={styles.headerContainer}>
                    {currentIndex === 0 ? (
                      <>
                        <Text style={styles.headerTitle}>Amount to Settled</Text>
                        <Text style={styles.headerTotal}>
                          {'\u20B9'} {total ? total : 0}
                        </Text>
                        <Text style={{
                          fontSize: textScale(12),
                          color: WHITE,
                          fontFamily: 'Gilroy-Medium',
                          marginTop: verticalScale(8)
                        }}>Total Number of Payments 23</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.headerTitle}>Recent Settlements</Text>
                        <View style={styles.row}>
                          <View>
                            <Text style={[styles.headerTotal, {
                              fontSize: textScale(28)
                            }]}>
                              {'\u20B9'} {total ? total : 0}
                            </Text>
                            <Text style={[styles.headerTotal, {
                              fontSize: textScale(12)
                            }]}>Settled on 27th oct</Text>
                          </View>
                          <View style={{
                            borderRightWidth: 1,
                            borderRightColor: WHITE,
                            height: verticalScale(50),
                            marginHorizontal: moderateScale(15)
                          }} />
                          <View>
                            <Text style={[styles.headerTotal, {
                              fontSize: textScale(28)
                            }]}>
                              {'\u20B9'} {total ? total : 0}
                            </Text>
                            <Text style={[styles.headerTotal, {
                              fontSize: textScale(12)
                            }]}>Settled on 26th oct</Text>
                          </View>
                        </View>
                      </>
                    )}
                  </View>
                </ImageBackground>
              )
            })}
          </PagerView>

          <View style={styles.indicators}>
            {renderIndicators()}
          </View>
        </View>

        {currentIndex === 0 ? (
          <TransactionList
            user={user}
          />
        ) : (
          <SettlementList
            user={user}
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
    paddingVertical: 10
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    justifyContent: 'center'
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#505050',
    marginHorizontal: 3,
    borderWidth: .4,
    borderColor: 'grey'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
});
