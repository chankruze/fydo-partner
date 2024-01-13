import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {PRIMARY, WHITE} from '../../assets/colors';
import OfferComponent from '../../components/common/OfferComponent';
import {getOffers} from '../../services/offerService';
import {moderateScaleVertical, textScale} from '../../utils/responsiveSize';
// import OfferIcon from './../../assets/icons/offer.png';

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

const limit = 10;

const RequestedOffersScreen = ({user}) => {
  const [isLoading, setIsLoading] = useState(0);
  const [skip, setSkip] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      if (!isLast) {
        const response = await getOffers(user?.accessToken, limit, skip);
        const _offers = response.filter(data => data.status === 'PENDING');

        console.log(_offers);

        setOffers(_offers);
        setSkip(skip + limit);
        setIsLast(
          _offers.length === 0 || _offers.length < limit ? true : false,
        );
      }
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handlRefresh = () => {
    setIsRefreshing(true);
    fetchOffers();
  };

  const onEndReached = () => {
    setIsLast(true);
    setIsRefreshing(false);
    fetchOffers();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchOffers();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <ActivityIndicator size="large" color={PRIMARY} />
        </SafeAreaView>
      </View>
    );
  }

  if (offers.length === 0) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <Text style={styles.info}>We have no item to show here</Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: moderateScaleVertical(20),
          marginTop: moderateScaleVertical(15),
        }}
        showsVerticalScrollIndicator={false}
        data={offers}
        keyExtractor={item => item?._id.toString()}
        renderItem={({item}) => <OfferComponent item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReachedThreshold={0.01}
        // onMomentumScrollBegin={() => {
        //   this.onEndReachedMomentum = false;
        // }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handlRefresh}
            color={PRIMARY}
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
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(RequestedOffersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  info: {
    alignSelf: 'center',
    marginTop: moderateScaleVertical(14),
    fontWeight: 'bold',
    fontSize: textScale(16),
    letterSpacing: 0.2,
  },
  separator: {
    marginBottom: moderateScaleVertical(10),
  },
});
