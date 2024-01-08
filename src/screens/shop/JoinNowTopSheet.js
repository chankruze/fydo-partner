import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../utils/responsiveSize';
import { BLACK, GREEN, PRIMARY, WHITE } from '../../assets/colors';
import shield from '../../assets/images/shield.png';
import ButtonComponent from '../../components/ButtonComponent';
import { useState } from 'react';
import { connect } from 'react-redux';
import { updateShop } from '../../services/shopService';
import { saveUserData } from '../../utils/defaultPreference';
import { setUser } from '../../store/actions/user.action';

const mapStateToProps = state => {
  return {
    myshop: state?.userReducer?.myshop,
    user: state?.userReducer?.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

const JoinNowTopSheet = ({ myshop, user, onPress, setUser }) => {
  const [nextStep, setNextStep] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [bankNo, setBankNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [upi, setUpi] = useState('');

  const getNextStep = () => {
    setNextStep(state => !state);
  };

  const editShop = async () => {
    let request = {
      ...myshop,
      bankDetails: {
        accNumber: bankNo,
        ifsc: ifsc,
        name: accountName,
        upiIds: [upi],
        email: email
      },
    }

    const response = await updateShop(user?.accessToken, request);

    if (response) {
      onPress();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {!nextStep ? (
          <>
            <Image source={shield} style={styles.image} />
            <View style={styles.wrapper}>
              <Text style={styles.modelTopTitle}>
                1. 100% Guaranteed Customers in your shop
              </Text>
              <Text style={styles.modelTopTitle}>
                2. Pay us when any customer visits your shop
              </Text>
              <Text style={styles.modelTopTitle}>
                3. Exclusive advertisements{' '}
              </Text>
              <Text style={styles.modelTopTitle}>
                4. Business Loans at 1% interest rates
              </Text>
              <View style={styles.modelButton}>
                <ButtonComponent
                  label="Next"
                  color={WHITE}
                  backgroundColor={PRIMARY}
                  onPress={getNextStep}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.wrapper}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder='Account Name'
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={accountName}
                  onChangeText={setAccountName}
                />
                <TextInput
                  placeholder='Email Address'
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={email?.trim()}
                  onChangeText={setEmail}
                />
                <TextInput
                  placeholder='Bank account number'
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={bankNo?.trim()}
                  onChangeText={setBankNo}
                  keyboardType='number-pad'
                />
                <TextInput
                  placeholder='IFSC Code'
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={ifsc?.trim()}
                  onChangeText={setIfsc}
                />
                <TextInput
                  placeholder='Add UPI ID'
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={upi?.trim()}
                  onChangeText={setUpi}
                />
              </View>
              <ButtonComponent
                onPress={() => editShop()}
                label="Get Partner"
                color={WHITE}
                backgroundColor={PRIMARY}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinNowTopSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: WHITE,
    width: moderateScale(350),
    borderRadius: moderateScale(10),
    paddingVertical: moderateScaleVertical(15)
  },
  wrapper: {
    paddingHorizontal: moderateScale(15),
    //marginTop: moderateScaleVertical(10),
  },
  image: {
    height: moderateScale(80),
    width: moderateScale(80),
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: moderateScaleVertical(20),
  },
  modelButton: {
    marginTop: moderateScaleVertical(25),
  },
  modelTopTitle: {
    marginTop: moderateScale(10),
    fontSize: textScale(14),
    fontFamily: 'Gilroy-Medium',
    fontWeight: '500',
  },
  input: {
    borderBottomColor: '#00357933',
    borderBottomWidth: 1.5,
    padding: moderateScale(8),
    marginVertical: moderateScaleVertical(8),
    marginHorizontal: moderateScale(5),
  },
  inputWrapper: {
    marginBottom: moderateScale(10),
  }
});
