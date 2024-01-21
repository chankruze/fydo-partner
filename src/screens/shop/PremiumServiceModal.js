import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BLACK, PRIMARY, RED, WHITE} from '../../assets/colors';
import ButtonComponent from '../../components/ButtonComponent';
import {moderateScale} from '../../utils/responsiveSize';

export const PremiumServiceModal = ({isVisible, onRequestClose}) => {
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.header}>
        <Text style={styles.title}>Fydo Loyalty Plan</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
          <MaterialIcons name="close" color={WHITE} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.h1}>
          The Fydo Loyalty Plan is your secret weapon for customer retention.
          It's a simple, hassle-free way to turn one-time shoppers into loyal
          patrons.
        </Text>
        <View style={styles.div}>
          <Text style={styles.h2}>🚀 Why it's Amazing</Text>
          <Text style={styles.p}>
            <Text style={styles.b}>Repeat Business:</Text> Encourage customers
            to return with exclusive rewards.
          </Text>

          <Text style={styles.p}>
            <Text style={styles.b}>Boost Sales:</Text> Incentivize more
            purchases and increase your revenue.
          </Text>
          <Text style={styles.p}>
            <Text style={styles.b}>Happy Customers:</Text> Show your
            appreciation, and they'll keep coming back.
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={styles.h2}>💡 How it Works</Text>
          <Text style={styles.p}>
            Customers earn points with every purchase. Points unlock exciting
            discounts and special offers. The more they shop, the more they
            save!
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={styles.h2}>📈 Benefits for You</Text>
          <Text style={styles.p}>
            Build a loyal customer base. Increase sales effortlessly. Stay ahead
            in the competitive market.
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={styles.h2}>💰 App Maintenance Fee</Text>
          <Text style={styles.p}>
            Important Note: To ensure smooth operation, the app maintenance fee
            only kicks in after you've crossed one lakh worth of transactions
            through Fydo.
          </Text>
          <Text style={styles.p}>₹199/month</Text>
          <Text style={styles.p}>₹490 for 3 months</Text>
          <Text style={styles.p}>₹900 for 6 months</Text>
          <Text style={styles.p}>₹150 for 1 year</Text>
        </View>

        <ButtonComponent
          label="Got it!"
          color="white"
          backgroundColor={PRIMARY}
          onPress={onRequestClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY,
    padding: moderateScale(16),
  },
  div: {
    marginBottom: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: 'Gilroy-Black',
    textAlign: 'justify',
    color: WHITE,
  },
  h1: {
    fontSize: moderateScale(16),
    fontFamily: 'Gilroy-Bold',
    color: BLACK,
    textAlign: 'justify',
  },
  h2: {
    fontSize: moderateScale(16),
    fontFamily: 'Gilroy-Bold',
    marginVertical: moderateScale(4),
    color: PRIMARY,
  },
  p: {
    fontFamily: 'Gilroy-Medium',
    padding: moderateScale(4),
  },
  b: {
    fontFamily: 'Gilroy-Bold',
  },
  closeButton: {
    padding: moderateScale(4),
    backgroundColor: RED,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(1000),
  },
});
