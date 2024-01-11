import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {PRIMARY, WHITE} from '../../assets/colors';
import shield from '../../assets/images/shield.png';
import ButtonComponent from '../../components/ButtonComponent';
import ToastMessage from '../../components/common/ToastComponent';
import {updateShop} from '../../services/shopService';
import {setUser} from '../../store/actions/user.action';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

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

const JoinNowTopSheet = ({navigation, myshop, user, onPress, setUser}) => {
  const [nextStep, setNextStep] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [bankNo, setBankNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [upi, setUpi] = useState('');
  const [upiList, setUpiList] = useState([]);
  const [loyaltyPercentage, setLoyaltyPercentage] = useState('');

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
        upiIds: upiList,
        email: email,
        loyaltyPercentage: loyaltyPercentage,
      },
    };

    const response = await updateShop(user?.accessToken, request);

    if (response) {
      onPress();
    }
  };

  const addUpiToList = _upi =>
    setUpiList(prev => [_upi, ...prev.filter(p => p !== _upi)]);

  const deleteUpiFromList = _upi => {
    setUpiList(prev => [...prev.filter(u => u !== _upi)]);
  };

  const addUpis = () => {
    const regx = /^[\w.-]+@[\w.-]+$/;

    if (regx.test(upi)) {
      addUpiToList(upi?.trim());
    } else {
      ToastMessage({message: 'Please enter valid UPI id'});
    }
  };

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
                  placeholder="Account Name"
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={accountName}
                  onChangeText={setAccountName}
                />
                <TextInput
                  placeholder="Email Address"
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={email?.trim()}
                  onChangeText={setEmail}
                />
                <TextInput
                  placeholder="Bank account number"
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={bankNo?.trim()}
                  onChangeText={setBankNo}
                  keyboardType="number-pad"
                />
                <TextInput
                  placeholder="IFSC Code"
                  style={styles.input}
                  placeholderTextColor="#383B3F80"
                  value={ifsc?.trim()}
                  onChangeText={setIfsc}
                />
                <TextInput
                  value={String(loyaltyPercentage).trim()}
                  style={styles.input}
                  onChangeText={val => setLoyaltyPercentage(val?.trim())}
                  placeholderTextColor="#383B3F80"
                  placeholder="Enter Loyalty Percentage"
                  keyboardType="number-pad"
                />
                <View style={styles.upiContainer}>
                  <TextInput
                    value={upi}
                    style={[styles.input, styles.upiInput]}
                    onChangeText={val => setUpi(val?.trim())}
                    placeholder="UPI ID"
                    placeholderTextColor="#383B3F80"
                  />
                  <TouchableOpacity
                    style={styles.upiScanButton}
                    onPress={() => navigation.navigate('QrScan')}>
                    <MaterialIcon
                      name="qr-code-scanner"
                      size={24}
                      color={WHITE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => addUpis()}
                    style={styles.upiAddButton}>
                    <MaterialIcon name="save" size={24} color={WHITE} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={upiList}
                  style={{
                    padding: 16,
                  }}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 0.4,
                        backgroundColor: GREY,
                        marginVertical: 4,
                      }}
                    />
                  )}
                  renderItem={({item, index}) => (
                    <View
                      key={`${index}-${item}`}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Medium',
                          fontSize: 14,
                          flex: 1,
                        }}>
                        {item}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          deleteUpiFromList(item);
                        }}>
                        <MaterialIcon name="delete" size={24} color={RED} />
                      </TouchableOpacity>
                    </View>
                  )}
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
    paddingVertical: moderateScaleVertical(15),
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
  },
  upiContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upiInput: {
    flex: 1,
  },
  upiScanButton: {
    padding: moderateScale(8),
    backgroundColor: PRIMARY,
    borderRadius: moderateScale(8),
  },
  upiAddButton: {
    marginHorizontal: moderateScale(8),
    padding: moderateScale(8),
    backgroundColor: PRIMARY,
    borderRadius: moderateScale(8),
  },
});
