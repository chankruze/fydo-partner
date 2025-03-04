import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  BLACK,
  GREY,
  GREY_1,
  GREY_2,
  LIGHTBLUE,
  PRIMARY,
  WHITE,
} from '../../assets/colors';
import TransactionCard from '../../components/Transaction/TransactionCard';
import {TransactionFilterButton} from '../../components/Transaction/TransactionFilterButton';
import {getTransaction} from '../../services/transactionService';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../utils/responsiveSize';

export const TransactionList = ({user, refreshBalance}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLast, setLast] = useState(false);
  const [filter, setFilter] = useState({
    key: 'NONE',
    value: undefined,
  });
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const apiTransactionHit = async () => {
    try {
      if (!isLast) {
        const response = await getTransaction(user?.accessToken, limit, skip);
        setTransactions(prev => [...prev, ...response]);
        setSkip(skip + limit);
        setLast(
          response.length === 0 || response.length < limit ? true : false,
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.err(error);
      setIsLoading(false);
    }
  };

  const handlRefresh = useCallback(() => {
    setTransactions([]);
    apiTransactionHit();
    refreshBalance();
  }, []);

  const renderItem = ({item}) => {
    return <TransactionCard item={item} />;
  };

  const seperator = () => <View style={styles.separator} />;

  useEffect(() => {
    apiTransactionHit();
  }, []);

  useEffect(() => {
    if (filter.key !== 'NONE') {
      const _filtered = transactions.filter(txn =>
        moment(txn.createdAt).isAfter(filter.value),
      );

      setFilteredTransactions(_filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [filter, transactions]);

  // TODO: think about it later for removing extra style
  if (isLoading) {
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
    <View style={styles.transactionsList}>
      {/* action bar (search/filter) */}
      <View style={styles.header}>
        {/* header title + actions */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Transactions</Text>
          <View style={styles.actions}>
            {/* <TouchableOpacity
              onPress={() => Toast.show('Coming soon!', Toast.SHORT)}>
              <MaterialIcons
                name="tune"
                size={24}
                color={PRIMARY}
                style={styles.iconButton}
              />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handlRefresh}>
              <MaterialIcons
                name="refresh"
                size={24}
                color={PRIMARY}
                style={styles.iconButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* search */}
        <View style={[styles.headerRow, {marginVertical: moderateScale(4)}]}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={PRIMARY} />
            <TextInput
              placeholder="Search for Name, Bank or UPI"
              style={styles.searchInput}
              activeUnderlineColor={PRIMARY}
            />
          </View>
        </View>
        <View style={styles.headerRow}>
          <View style={styles.actions}>
            <TransactionFilterButton
              label="1 Day"
              onPress={() =>
                setFilter({
                  key: '1D',
                  value: moment().subtract(1, 'days'),
                })
              }
              isSelected={filter.key === '1D'}
              count={filteredTransactions.length}
            />
            {/* week */}
            <TransactionFilterButton
              label="1 Week"
              onPress={() =>
                setFilter({
                  key: '1W',
                  value: moment().subtract(1, 'weeks'),
                })
              }
              isSelected={filter.key === '1W'}
              count={filteredTransactions.length}
            />
            <TransactionFilterButton
              label="1 Month"
              onPress={() =>
                setFilter({
                  key: '1M',
                  value: moment().subtract(1, 'months'),
                })
              }
              isSelected={filter.key === '1M'}
              count={filteredTransactions.length}
            />
            <TransactionFilterButton
              label="All"
              onPress={() =>
                setFilter({
                  key: 'NONE',
                  value: undefined,
                })
              }
              isSelected={filter.key === 'NONE'}
              count={filteredTransactions.length}
            />
          </View>
          <TouchableOpacity
            onPress={() => Toast.show('Coming soon!', Toast.SHORT)}>
            <MaterialIcons
              name="date-range"
              size={24}
              color={PRIMARY}
              style={styles.iconButton}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* transactions list */}
      <FlatList
        contentContainerStyle={{
          padding: moderateScale(16),
        }}
        showsVerticalScrollIndicator={false}
        data={filteredTransactions}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
        ItemSeparatorComponent={seperator}
        onEndReachedThreshold={0.01}
        // refreshControl={
        //   <RefreshControl
        //     isRefreshing={isRefreshing}
        //     onRefresh={handlRefresh}
        //     tintColor={PRIMARY}
        //   />
        // }
        ListFooterComponent={
          !isLast ? (
            <View style={{padding: moderateScaleVertical(16)}}>
              <ActivityIndicator color={PRIMARY} size="large" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.notFoundText}>No Data Found</Text>
        }
        onEndReached={apiTransactionHit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsList: {
    flex: 1,
  },
  header: {
    backgroundColor: LIGHTBLUE,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    fontSize: moderateScale(18),
    color: PRIMARY,
    paddingVertical: moderateScale(8),
  },
  searchContainer: {
    // backgroundColor: LIGHTGREEN,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Gilroy-Medium',
    padding: moderateScale(8),
    borderBottomColor: PRIMARY,
  },
  iconButton: {
    padding: moderateScale(8),
    borderRadius: moderateScale(12),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
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
  notFoundText: {
    marginTop: moderateScaleVertical(15),
    alignSelf: 'center',
    fontFamily: 'Gilroy-Medium',
    color: BLACK,
    fontSize: textScale(18),
  },
  separator: {
    height: 0.4,
    backgroundColor: GREY_1,
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
  },
  searchIcon: {
    position: 'absolute',
    left: moderateScale(6),
    zIndex: 1,
  },
  filterBtn: {
    borderColor: GREY,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '40%',
    // paddingHorizontal: moderateScale(50)
  },
  filterTxt: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
    color: GREY_2,
  },
});
