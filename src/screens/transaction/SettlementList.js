import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BLACK, GREY_1, LIGHTBLUE, PRIMARY, WHITE} from '../../assets/colors';
import SettlementCard from '../../components/Transaction/SettlementCard';
import {getSettlement} from '../../services/transactionService';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

export const SettlementList = ({refreshBalance}) => {
  const [loading, setLoading] = useState(false);
  const [settlements, setSettlements] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLast, setLast] = useState(false);

  useEffect(() => {
    getSettlements();
  }, []);

  const getSettlements = async () => {
    try {
      if (!isLast) {
        let params = {
          startDate: 0,
          endDate: 1761611872252,
        };

        const response = await getSettlement(limit, skip, params);

        setSettlements(prev => [...prev, ...response]);
        setSkip(skip + limit);
        setLoading(false);
        setLast(
          response.length === 0 || response.length < limit ? true : false,
        );
      }
    } catch (error) {
      console.log('error raised', error);
      setLoading(false);
    }
  };

  const handlRefresh = React.useCallback(() => {
    setSettlements([]);
    getSettlements();
    refreshBalance();
  }, []);

  const renderItem = ({item}) => {
    return <SettlementCard item={item} />;
  };

  const seperator = () => <View style={styles.separator} />;

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
    <View style={styles.settlementsList}>
      <View style={styles.header}>
        {/* header title + actions */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Settlements</Text>
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
        {/* <View style={[styles.headerRow, {marginVertical: moderateScale(4)}]}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={PRIMARY} />
            <TextInput
              placeholder="Search for Name, Bank or UPI"
              style={styles.searchInput}
              activeUnderlineColor={PRIMARY}
            />
          </View>
        </View> */}
      </View>

      <FlatList
        contentContainerStyle={{
          padding: moderateScale(16),
        }}
        showsVerticalScrollIndicator={false}
        data={settlements}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={seperator}
        onEndReachedThreshold={0.01}
        ListFooterComponent={
          !isLast && (
            <View style={{padding: moderateScaleVertical(16)}}>
              <ActivityIndicator color={PRIMARY} size="large" />
            </View>
          )
        }
        ListEmptyComponent={
          <Text style={styles.notFoundText}>Not Data Found</Text>
        }
        onEndReached={getSettlements}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settlementsList: {
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
  separator: {
    height: 0.4,
    backgroundColor: GREY_1,
  },
  notFoundText: {
    marginTop: moderateScaleVertical(15),
    alignSelf: 'center',
    fontFamily: 'Gilroy-Medium',
    color: BLACK,
    fontSize: textScale(18),
  },
});
