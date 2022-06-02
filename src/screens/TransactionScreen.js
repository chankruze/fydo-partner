import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  moderateScaleVertical,
  textScale,
  moderateScale,
} from '../utils/responsiveSize';
import {BLACK, PRIMARY, WHITE} from '../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {
  getTransaction,
  getTransactionAmount,
} from '../services/transactionService';
import WithNetInfo from '../components/hoc/withNetInfo';
import TransactionCard from '../components/Transaction/TransactionCard';

const TransactionScreen = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLast, setLast] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    apiTransactionAmonut();
    apiTransactionHit();
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
  const apiTransactionHit = async () => {
    try {
      if (!isLast) {
        const response = await getTransaction(user?.accessToken, limit, skip);
        const json = await response.json();
        console.log('json-->', json);
        setData([...data, ...json]);
        setSkip(skip + limit);
        setLoading(false);
        setLast(json.length == 0 || json.length < limit ? true : false);
        setRefreshing(false);
      }
    } catch (error) {
      console.log('error raised', error);
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    return <TransactionCard item={item} />;
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const handlRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      apiTransactionHit();
    }, 2000);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onEndReached = () => {
    setSkip(0);
    setLast(true);
    setRefreshing(false);
    apiTransactionHit();
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
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <LinearGradient
          colors={[PRIMARY, '#2D65AE']}
          style={styles.linearGradientStyle}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Amount to Settled</Text>
            <Text style={styles.headerTotal}>
              {'\u20B9'} {total ? total : 0}
            </Text>
            {/* <Text style={{fontSize:textScale(12),color:WHITE,marginBottom:moderateScaleVertical(15)}}>Total Number of Payments 23</Text> */}
          </View>
        </LinearGradient>
        <View style={{marginHorizontal: moderateScale(15)}}>
          {data.length === 0 ? (
            <Text style={styles.notFoundText}>Not Found</Text>
          ) : (
            <FlatList
              contentContainerStyle={{
                paddingBottom: moderateScaleVertical(200),
                marginTop: moderateScaleVertical(15),
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => item._id}
              ItemSeparatorComponent={() => <View style={styles.lineStyle} />}
              onEndReachedThreshold={0.01}
              onMomentumScrollBegin={() => {
                onEndReachedMomentum = false;
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handlRefresh}
                  tintColor={PRIMARY}
                />
              }
              ListFooterComponent={
                !isLast && (
                  <View style={{marginTop: moderateScaleVertical(20)}}>
                    <ActivityIndicator color={PRIMARY} size="large" />
                  </View>
                )
              }
              onEndReached={onEndReached}
            />
          )}
        </View>
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
    position: 'relative',
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
    marginBottom: moderateScaleVertical(20),
  },
  headerTitle: {
    fontSize: textScale(18),
    color: WHITE,
    fontFamily: 'Gilroy-Medium',
    marginVertical: moderateScaleVertical(5),
  },
  headerTotal: {
    fontSize: textScale(50),
    fontFamily: 'Gilroy-Medium',
    color: WHITE,
    marginBottom: moderateScaleVertical(15),
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
});
