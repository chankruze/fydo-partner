import moment from 'moment';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Checkbox} from 'react-native-paper';
import {DARKBLACK, PRIMARY} from '../../assets/colors';
import ButtonComponent from '../../components/ButtonComponent';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';

export default function AddBreaksBottomSheet({handleClosePress}) {
  const onStartShouldSetResponder = () => {
    return true;
  };

  const [startTimePicker, setStartTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [isSunday, setIsSunday] = useState(false);
  const [isMonday, setIsMonday] = useState(false);
  const [isTuesday, setIsTuesday] = useState(false);
  const [isWednesday, setIsWednesday] = useState(false);
  const [isThursday, setIsThursday] = useState(false);
  const [isFriday, setIsFriday] = useState(false);
  const [isSaturday, setIsSaturday] = useState(false);

  const setGlobalStartTime = item => {
    const d = moment(item).format('hh:mm A');
    setStartTime(d);
  };

  const setGlobalEndTime = item => {
    const d = moment(item).format('hh:mm A');
    setEndTime(d);
  };

  const handleStartTimePicker = () => {
    setStartTimePicker(!startTimePicker);
  };

  const handleEndTimePicker = () => {
    setEndTimePicker(!endTimePicker);
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={onStartShouldSetResponder}>
      <Image source={BottomsheetIcon} style={styles.bottomSheetIcon} />
      <Text style={styles.title}>Add Breaks</Text>
      <Text style={styles.label}>
        It is a time like that of lunch hour or something that you considered as
        break for your shop
      </Text>

      {/* This could be done using FlatList but never mind :( */}

      <View style={styles.days}>
        <View style={styles.left}>
          <View style={styles.checkboxContainer}>
            <Text>Monday</Text>
            <Checkbox
              color={PRIMARY}
              status={isMonday ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsMonday(!isMonday);
              }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Wednesday</Text>
            <Checkbox
              color={PRIMARY}
              status={isWednesday ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsWednesday(!isWednesday);
              }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Friday</Text>
            <Checkbox
              color={PRIMARY}
              status={isFriday ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsFriday(!isFriday);
              }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Sunday</Text>
            <Checkbox
              color={PRIMARY}
              status={isSunday ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsSunday(!isSunday);
              }}
            />
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.checkboxContainer}>
            <Text>Tuesday</Text>
            <Checkbox
              color={PRIMARY}
              status={isTuesday ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsTuesday(!isTuesday);
              }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Thursday</Text>
            <Checkbox
              color={PRIMARY}
              status={isThursday ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsThursday(!isThursday);
              }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Saturday</Text>
            <Checkbox
              color={PRIMARY}
              status={isSaturday ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsSaturday(!isSaturday);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.timeContainer}>
        {/* Start Time Container......................... */}
        <View style={styles.time}>
          <Text style={styles.usualText}>Start Time</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={handleStartTimePicker}>
            {startTime ? (
              <Text style={styles.timeTxt}>{startTime}</Text>
            ) : (
              <Text style={styles.timeTxt}>12:30 PM</Text>
            )}
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={startTimePicker}
            mode="time"
            onConfirm={setGlobalStartTime}
            onCancel={setStartTimePicker}
          />
        </View>

        {/* End Time Container......................... */}
        <View style={styles.time}>
          <Text style={styles.usualText}>End Time</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={handleEndTimePicker}>
            {endTime ? (
              <Text style={styles.timeTxt}>{endTime}</Text>
            ) : (
              <Text style={styles.timeTxt}>3:30 PM</Text>
            )}
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={endTimePicker}
            mode="time"
            onConfirm={setGlobalEndTime}
            onCancel={setEndTimePicker}
          />
        </View>
      </View>
      <View style={styles.submitButton}>
        <ButtonComponent
          label="Submit"
          color="white"
          backgroundColor={PRIMARY}
          onPress={handleClosePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fa',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  timeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  timeButton: {
    borderRadius: 8,
    borderColor: 'rgba(77, 83, 91, 0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  usualText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: '#4D535BCC',
  },
  timeTxt: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bottomSheetIcon: {
    height: 8,
    width: 32,
    marginTop: 10,
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 5,
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    color: DARKBLACK,
    fontSize: 20,
    marginBottom: 15,
  },
  label: {
    marginVertical: 10,
    lineHeight: 20,
    letterSpacing: 0.5,
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    marginBottom: 15,
  },

  addButton: {
    marginLeft: 20,
  },
  addButtonLabel: {
    fontWeight: 'bold',
    color: PRIMARY,
    fontSize: 15,
  },
  input: {
    flex: 1,
  },
  submitButton: {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
  },

  separator: {
    width: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  days: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  left: {
    width: '45%',
  },
  right: {
    width: '45%',
  },
});
