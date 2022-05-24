import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../utils/responsiveSize';
import {PRIMARY, WHITE} from '../../assets/colors';
import shield from '../../assets/images/shield.png';
import ButtonComponent from '../../components/ButtonComponent';
import {useState} from 'react';

const JoinNowTopSheet = () => {
  const [nextStep, setNextStep] = useState(false);
  const getNextStep = () => {
    setNextStep(state => !state);
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
                    placeholder='Your Name'
                    style={styles.input}
                    placeholderTextColor="#383B3F80"
                    //onChangeText={handleProductName}
                />
                <TextInput
                    placeholder='Bank Account'
                    style={styles.input}
                    placeholderTextColor="#383B3F80"
                    //onChangeText={handleProductName}
                />
                <TextInput
                    placeholder='IFSC Code'
                    style={styles.input}
                    placeholderTextColor="#383B3F80"
                    //onChangeText={handleProductName}
                />
            </View>
            <ButtonComponent
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

export default JoinNowTopSheet;

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
    paddingVertical:moderateScaleVertical(15)
  },
  wrapper: {
    paddingHorizontal: moderateScale(15),
    marginTop: moderateScaleVertical(10),
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
    marginVertical: moderateScaleVertical(25),
    marginHorizontal:moderateScale(5)
  },
  inputWrapper: {
   //paddingHorizontal: moderateScale(5),
    marginTop: moderateScaleVertical(10),
  }
});
