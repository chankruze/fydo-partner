import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {LIGHTGREEN} from '../../assets/colors';
import OfferComponent from '../common/OfferComponent';
const WIDTH = Dimensions.get('screen').width;

const StoreOffers = ({offers, navigation}) => {
  const separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Offers</Text>
        {/* <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList
        horizontal
        style={styles.list}
        data={offers}
        renderItem={({item}) => (
          <View style={{width: WIDTH * 0.7}}>
            <OfferComponent
              // token={token}
              item={item}
              navigation={navigation}
              type={'storeOffer'}
            />
          </View>
        )}
        ItemSeparatorComponent={separator}
        keyExtractor={item => item._id.toString()}
        showsHorizontalScrollIndicator={false}
        //   ListFooterComponent={<Footer size={30} />}
      />
    </View>
  );
};

export default StoreOffers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewAll: {
    color: LIGHTGREEN,
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
  },
  title: {
    color: '#1F2630',
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    letterSpacing: 0.3,
  },
  list: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  listItem: {
    width: WIDTH - 40,
    height: 165,
    marginHorizontal: 20,
    marginRight: 0,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  icon: {
    position: 'absolute',
    right: 0,
    margin: 15,
  },
  separator: {
    width: 12,
  },
});
