import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Dialog from 'react-native-dialog';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK, PRIMARY, WHITE} from '../../assets/colors';
import {generatePresignUrl} from '../../services/presignUrlService';
import {addSale} from '../../services/saleService';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';

export default function MySaleBottomSheet({token, toggle}) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState({});
  const [description, setDescription] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [startTimePicker, setStartTimePicker] = useState(false);
  const [titleName, setTitleName] = useState(null);
  const handleTitleName = title => {
    setTitleName(title);
  };

  const handleDescription = _description => {
    setDescription(_description);
  };

  const onStartShouldSetResponder = () => {
    return true;
  };

  const handleStartDate = selectedDate => {
    const currentDate = selectedDate;
    const milliseconds = new Date(currentDate).getTime();
    setStartDate(milliseconds);
    handleStartTimePicker();
  };

  const handleEndDate = selectedDate => {
    const currentDate = selectedDate;
    const milliseconds = new Date(currentDate).getTime();
    setEndDate(milliseconds);
    handleEndTimePicker();
  };

  const pickImage = () => {
    setDialogVisible(true);
  };
  const handleStartTimePicker = () => {
    setStartTimePicker(!startTimePicker);
  };

  const handleEndTimePicker = () => {
    setEndTimePicker(!endTimePicker);
  };
  const submit = async () => {
    let imagePath = null;
    if (validateInputs()) {
      setLoading(true);
      try {
        if (imageUrl) {
          const imageResponse = await generatePresignUrl(token, [uuid.v4()]);
          imagePath = imageResponse[0]?.split('?')[0];
          const imageBody = await getBlob(imageUrl);
          const dataResponse = await fetch(imageResponse[0], {
            method: 'PUT',
            body: imageBody,
          });
        }
        const response = await addSale(token, {
          title: titleName,
          description: description,
          startDate: startDate,
          endDate: endDate,
          imageUrl: [imagePath],
        });
        const json = await response.json();
        setLoading(false);
        toggle();
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
    }
    // let imagePath = null, body = null;
    // if (profilePicurl) {
    //     const response = await generatePresignUrl(user?.accessToken);
    //     const { url } = await response.json();
    //     imagePath = url?.split("?")[0];
    //     const imageBody = await getBlob(profilePicurl);
    //     const data = await fetch(url, {
    //         method: 'PUT',
    //         body: imageBody
    //     });
    //     if (data.status != "200") {
    //         if (Platform.OS == 'android') {
    //             ToastAndroid.show('Unable to upload image', ToastAndroid.SHORT);
    //         } else {
    //             Toast.show('Unable to upload image', Toast.SHORT);
    //         }
    //         return;
    //     }
    //     body = {
    //         profilePicurl: imagePath
    //     }
    // }
  };

  const validateInputs = () => {
    setError({});
    let e = {};

    if (!titleName) {
      e.titleName = 'Enter title';
    }

    if (!description) {
      e.description = 'Enter description';
    }

    if (Object.keys(e).length > 0) {
      setError(e);
      return false;
    }

    return true;
  };

  const getDate = milliseconds => {
    return moment(milliseconds).format('DD MMM');
  };

  const openCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.5,
      });
      if (result?.assets?.length > 0) {
        setImageUrl(result?.assets[0]?.uri);
      }
      setDialogVisible(false);
    } catch (e) {
      console.log(e);
      setDialogVisible(false);
    }
  };

  const getBlob = async fileUri => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 1,
      });
      if (result?.assets.length > 0) {
        setImageUrl(result?.assets[0]?.uri);
      }
      setDialogVisible(false);
    } catch (e) {
      console.log(e);
      setDialogVisible(false);
    }
  };

  const renderDialog = () => {
    return (
      <Dialog.Container
        visible={dialogVisible}
        onBackdropPress={() => {
          setDialogVisible(false);
        }}>
        <Dialog.Title>Select Image</Dialog.Title>
        <Dialog.Description>Select image from?</Dialog.Description>
        <Dialog.Button label="Gallery" onPress={openGallery} />
        <Dialog.Button label="Camera" onPress={openCamera} />
      </Dialog.Container>
    );
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={onStartShouldSetResponder}>
      {renderDialog()}
      <Image source={BottomsheetIcon} style={styles.bottomSheetIcon} />
      <Text style={styles.title}>Add Sale</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={pickImage} style={styles.addPhotosButton}>
          <Ionicons color={PRIMARY} size={32} name="md-add-circle-outline" />
          <Text style={styles.addPhotoLabel}>Add photos</Text>
        </TouchableOpacity>
        <Text style={styles.otherLabel}>If any</Text>
      </View>
      <TextInput
        placeholder="Title"
        style={styles.input}
        onChangeText={handleTitleName}
      />
      {error?.titleName && <Text style={styles.error}>{error?.titleName}</Text>}
      <TextInput
        placeholder="Add Description (Buy 1 get 1 free /Buy 2 get 20% off)"
        style={styles.input}
        numberOfLines={2}
        multiline={true}
        onChangeText={handleDescription}
      />
      {error?.description && (
        <Text style={styles.error}>{error?.description}</Text>
      )}
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <TouchableOpacity
            onPress={handleStartTimePicker}
            style={styles.dateContainer}>
            <Text style={styles.date}>{getDate(startDate)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.dateLabel}>End Date</Text>
          <TouchableOpacity
            onPress={handleEndTimePicker}
            style={styles.dateContainer}>
            <Text style={styles.date}>{getDate(endDate)}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={startTimePicker}
          mode="date"
          onConfirm={handleStartDate}
          onCancel={setStartTimePicker}
        />
        <DateTimePickerModal
          isVisible={endTimePicker}
          mode="date"
          onConfirm={handleEndDate}
          onCancel={setEndTimePicker}
        />
      </View>
      <TouchableOpacity
        onPress={submit}
        activeOpacity={0.8}
        style={styles.submitButton}>
        {!loading && <Text style={styles.submitButtonLabel}>Submit</Text>}
        {loading && <ActivityIndicator size="small" color="white" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: moderateScale(300),
    backgroundColor: WHITE,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    zIndex: 10,
    paddingHorizontal: moderateScale(10),
  },
  bottomSheetIcon: {
    height: moderateScale(8),
    width: moderateScale(32),
    marginBottom: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(10),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: '900',
    color: BLACK,
    marginTop: moderateScaleVertical(10),
  },
  addPhotosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#F5F5F5',
    width: moderateScale(150),
    borderRadius: moderateScale(5),
  },
  row: {
    marginVertical: moderateScaleVertical(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPhotoLabel: {
    marginLeft: moderateScale(10),
    color: BLACK,
    fontWeight: '400',
  },
  otherLabel: {
    color: BLACK,
    fontSize: textScale(12),
    alignSelf: 'flex-end',
    marginLeft: moderateScale(5),
  },
  input: {
    borderBottomColor: '#00357933',
    borderBottomWidth: 0.5,
    marginBottom: moderateScaleVertical(10),
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
  },
  dateLabel: {
    color: BLACK,
    fontSize: textScale(15),
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: BLACK,
    backgroundColor: WHITE,
    width: moderateScale(80),
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    height: moderateScale(40),
    marginBottom: moderateScale(30),
    borderRadius: moderateScale(3),
    elevation: 5,
  },
  submitButtonLabel: {
    color: WHITE,
    fontSize: textScale(14),
  },
  error: {
    fontSize: textScale(12),
    color: 'red',
    marginBottom: moderateScaleVertical(10),
  },
});
