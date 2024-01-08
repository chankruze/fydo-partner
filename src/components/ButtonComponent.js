import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const WIDTH = Dimensions.get('screen').width;

export default function ButtonComponent({
  label,
  color,
  backgroundColor = 'white',
  onPress = () => {},
  loading = false,
}) {
  let labelStyle = Object.assign({...styles.label}, {color: color});
  let buttonStyle = Object.assign(
    {...styles.button},
    {backgroundColor: backgroundColor},
  );
  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.6} onPress={onPress}>
      {!loading && <Text style={labelStyle}>{label}</Text>}
      {loading && <ActivityIndicator color="white" size="large" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 17,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 0.3,
  },
});
