import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {DARKBLACK, DARKBLUE, PRIMARY, DARKGREY} from '../assets/colors/index';
import ButtonComponent from '../components/ButtonComponent';

const ChooseLanguage = () => {
  const [language, setLanguage] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Language</Text>
      <View style={styles.radioButton}>
        <RadioButton
          value="English"
          color={PRIMARY}
          status={language === 'English' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('English')}
        />
        <Text style={styles.radioText}>English</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="Hindi"
          color={PRIMARY}
          status={language === 'Hindi' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('Hindi')}
        />
        <Text style={styles.radioText}>Hindi/हिन्दी</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="Odia"
          color={PRIMARY}
          status={language === 'Odia' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('Odia')}
        />
        <Text style={styles.radioText}>Odia/ଓଡ଼ିଆ</Text>
      </View>
      <View style={styles.button}>
        <ButtonComponent
          backgroundColor={PRIMARY}
          color="white"
          label="Continue"
          onPress={() => console.log('Language selected')}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerLabel}>By continuing you agree to our</Text>
        <TouchableOpacity>
          <Text style={styles.footerOtherLabel}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseLanguage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    color: DARKBLACK,
  },
  radioButton: {
    marginTop: 20,
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioText: {
    fontSize: 14,
    color: DARKBLACK,
    fontFamily: 'Gilroy-Medium',
    paddingLeft: 18,
  },
  button: {
    marginTop: 25,
    width: '90%',
    alignSelf: 'center',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footerLabel: {
    fontSize: 12,
    color: DARKGREY,
  },
  footerOtherLabel: {
    fontSize: 12,
    color: DARKBLUE,
    fontWeight: '500',
    marginTop: 3,
  },
});
