import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {DARKBLACK, DARKBLUE, PRIMARY, DARKGREY} from '../assets/colors/index';
import ButtonComponent from '../components/ButtonComponent';
import { setLanguage } from '../store/actions/user.action';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    changeLangauge: (language) => dispatch(setLanguage(language))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user
  }
}

const ChooseLanguage = ({changeLangauge, navigation, user}) => {
  const [language, setLanguage] = useState(null);
  const [error, setError] = useState(null);

  const next = () => {
    if(!language){
      setError("Please select your langauge")
    }
    else{
      setError(null);
      changeLangauge(language);
      if(user?.profileComplete){
        navigation.navigate('Main');         
      }
      else {
        navigation.navigate('RegisterShop'); 
      }
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Language</Text>
      <View style={styles.radioButton}>
        <RadioButton
          value="ENGLISH"
          color={PRIMARY}
          status={language === 'ENGLISH' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('ENGLISH')}
        />
        <Text style={styles.radioText}>English</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="HINDI"
          color={PRIMARY}
          status={language === 'HINDI' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('HINDI')}
        />
        <Text style={styles.radioText}>Hindi/हिन्दी</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="ODIA"
          color={PRIMARY}
          status={language === 'ODIA' ? 'checked' : 'unchecked'}
          onPress={() => setLanguage('ODIA')}
        />
        <Text style={styles.radioText}>Odia/ଓଡ଼ିଆ</Text>
      </View>
      <View style={styles.button}>
        <ButtonComponent
          backgroundColor={PRIMARY}
          color="white"
          label="Continue"
          onPress={next}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerLabel}>By continuing you agree to our</Text>
        <TouchableOpacity>
          <Text style={styles.footerOtherLabel}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLanguage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    // minHeight: HEIGHT * 0.6,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    color: DARKBLACK,
  },
  radioButton: {
    marginTop: 10,
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
    fontFamily: 'Gilroy-Medium',

  },
  footerLabel: {
    fontSize: 12,
    color: DARKGREY,
    fontFamily: 'Gilroy-Medium',

  },
  footerOtherLabel: {
    fontSize: 12,
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',

    marginTop: 3,
  },
  error: {
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold'
  }
});
