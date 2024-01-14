import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BLACK, GREY, PRIMARY} from '../../assets/colors';
import {moderateScale} from '../../utils/responsiveSize';
import {TransactionsCount} from './TransactionsCount';

export const TransactionFilterButton = ({
  label,
  onPress,
  isSelected,
  count,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: isSelected ? PRIMARY : GREY,
        },
      ]}
      onPress={onPress}>
      <Text
        style={{
          color: isSelected ? PRIMARY : BLACK,
        }}>
        {label}
      </Text>
      {isSelected ? <TransactionsCount count={count} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(1),
    marginEnd: moderateScale(8),
  },
});
