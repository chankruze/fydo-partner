import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {connect} from 'react-redux';
import {PRIMARY} from '../../assets/colors';
import {setLanguage} from '../../store/actions/user.action';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';

const LANGUAGES = {
  ENGLISH: 'ENGLISH',
  HINDI: 'HINDI',
  ODIA: 'ODIA',
};

const radioButtonsData = [
  {
    id: '1',
    label: 'English',
    value: LANGUAGES.ENGLISH,
    color: PRIMARY,
    labelStyle: {
      color: PRIMARY,
    },
  },
  {
    id: '2',
    label: 'Hindi/हिन्दी',
    value: LANGUAGES.HINDI,
    color: PRIMARY,
    labelStyle: {
      color: PRIMARY,
    },
  },
  {
    id: '3',
    label: 'Odia/ଓଡ଼ିଆ ଭାଷା',
    value: LANGUAGES.ODIA,
    color: PRIMARY,
    labelStyle: {
      color: PRIMARY,
    },
  },
];

const mapStateToProps = state => {
  return {
    language: state?.userReducer?.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: language => dispatch(setLanguage(language)),
  };
};

function ChooseLanguageComponent({toggle, language, setLanguage}) {
  const [userLanguage, setUserLanguage] = useState(language);
  const [radioButtons, setRadioButtons] = useState(getButtons());

  function getButtons() {
    return radioButtonsData.map(item => {
      if (item.value === language) {
        return Object.assign({...item}, {selected: true});
      }
      return item;
    });
  }

  function onPressRadioButton(radioButtonsArray) {
    setUserLanguage(getSelectedLanguage(radioButtonsArray));
    setRadioButtons(radioButtonsArray);
  }

  function getSelectedLanguage(array) {
    let _language = null;

    array?.map(item => {
      if (item?.selected === true) {
        _language = item?.value;
        return;
      }
    });

    return _language;
  }

  const onStartShouldSetResponder = () => {
    return true;
  };

  const changeLanguage = () => {
    setLanguage(userLanguage);
    toggle();
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={onStartShouldSetResponder}>
      <Image source={BottomsheetIcon} style={styles.bottomSheetIcon} />
      <Text style={styles.title}>Choose language</Text>
      <RadioGroup
        containerStyle={styles.radioContainer}
        radioButtons={radioButtons}
        onPress={onPressRadioButton}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.continueButton}
        onPress={changeLanguage}>
        <Text style={styles.continueButtonLabel}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.label}>By continuing you agree to our</Text>
      <TouchableOpacity style={styles.termsConditionButton}>
        <Text style={styles.termsLabel}>Terms & conditions</Text>
      </TouchableOpacity>
    </View>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseLanguageComponent);

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
    padding: 10,
  },
  bottomSheetIcon: {
    height: 8,
    width: 32,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Gilroy-Bold',
  },
  radioContainer: {
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  radioButtonLabel: {
    color: 'red',
    fontFamily: 'Gilroy-Medium',
  },
  continueButton: {
    height: 40,
    backgroundColor: PRIMARY,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  continueButtonLabel: {
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Gilroy-Bold',
  },
  termsConditionButton: {
    alignItems: 'center',
  },
  termsLabel: {
    color: PRIMARY,
    marginBottom: 10,
    fontFamily: 'Gilroy-Medium',
  },
  label: {
    alignSelf: 'center',
    marginTop: 15,
    color: 'gray',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
});
