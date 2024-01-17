import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Dialog from 'react-native-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BLACK, PRIMARY, WHITE} from '../../assets/colors';
import {addOffer} from '../../services/offerService';
import {generatePresignUrl} from '../../services/presignUrlService';
import {moderateScale} from '../../utils/responsiveSize';
import ToastMessage from '../common/ToastComponent';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';

export default function MyOffersBottomSheet({token, toggle}) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [tag, setTag] = useState(null);
  const [error, setError] = useState({});
  const [offerName, setOfferName] = useState('');
  const [description, setDescription] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().add(1, 'months').valueOf());
  const [endTimePicker, setEndTimePicker] = useState(false);
  const [startTimePicker, setStartTimePicker] = useState(false);

  const handleOfferName = _offerName => {
    setOfferName(_offerName);
  };

  const handleDescription = _description => {
    setDescription(_description);
  };

  const onStartShouldSetResponder = () => {
    return true;
  };

  const addTag = () => {
    if (validateTag()) {
      setTags(prev => [...tags, tag]);
      setTag(null);
    }
  };

  const handleInput = value => {
    setTag(value);
  };

  const removeTag = t => {
    let list = tags.filter(item => item !== t);
    setTags(list);
  };

  const handleStartDate = selectedDate => {
    const currentDate = selectedDate;
    const milliseconds = new Date(currentDate).getTime();
    setStartDate(milliseconds);
  };

  const handleEndDate = selectedDate => {
    const currentDate = selectedDate;
    const milliseconds = new Date(currentDate).getTime();
    setEndDate(milliseconds);
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
        if (imageUri) {
          const imageResponse = await generatePresignUrl(token, [uuid.v4()]);
          imagePath = imageResponse[0]?.split('?')[0];
          const imageBody = await getBlob(imageUri);
          const dataResponse = await fetch(imageResponse[0], {
            method: 'PUT',
            body: imageBody,
          });
        }
        const response = await addOffer(token, {
          title: offerName,
          description: description,
          searchTags: tags,
          startDate: startDate,
          endDate: endDate,
          imageUrl: [imagePath],
        });

        if (response) {
          ToastMessage({message: 'Offer added'});
        }
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
    let _error = {};

    if (!offerName) {
      _error.offerName = 'Enter product name';
    }

    if (!description) {
      _error.description = 'Enter description';
    }

    if (Object.keys(error).length > 0) {
      setError(error);
      return false;
    }

    return true;
  };
  const validateTag = () => {
    setError({});

    let _error = {};

    if (!tag) {
      _error.tag = 'Enter Tag';
    }

    if (Object.keys(_error).length > 0) {
      setError(_error);
      return false;
    }

    return true;
  };

  const getDate = milliseconds => {
    return moment(milliseconds).format('DD MMM');
  };

  const openCamera = async () => {
    try {
      const selectedImage = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      setImageUri(selectedImage.path);
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
      const selectedImage = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setImageUri(selectedImage.path);
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

  const renderItem = (item, index) => {
    return (
      <View style={styles.tag} key={index}>
        <Text style={styles.tagLabel}>{item}</Text>
        <TouchableOpacity onPress={removeTag.bind(this, item)}>
          <MaterialIcons name="clear" size={16} color={PRIMARY} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={onStartShouldSetResponder}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          {renderDialog()}
          <Image source={BottomsheetIcon} style={styles.bottomSheetIcon} />
          <Text style={styles.title}>Add Offer</Text>
          <View style={[styles.row, {}]}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.addPhotosButton}>
              <Ionicons
                color={PRIMARY}
                size={32}
                name="md-add-circle-outline"
              />
              <Text style={styles.addPhotoLabel}>Add photos</Text>
            </TouchableOpacity>
          </View>

          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image
                style={styles.imagePreview}
                source={{
                  isStatic: true,
                  uri: imageUri,
                  height: 128,
                  width: 100,
                }}
              />
            </View>
          ) : null}
          <TextInput
            placeholder="Offer Name"
            style={styles.input}
            onChangeText={handleOfferName}
          />
          {error?.offerName ? (
            <Text style={styles.error}>{error?.offerName}</Text>
          ) : null}
          <TextInput
            placeholder="Add Description (Buy 1 get 1 free /Buy 2 get 20% off)"
            style={styles.input}
            onChangeText={handleDescription}
          />
          {error?.description ? (
            <Text style={styles.error}>{error?.description}</Text>
          ) : null}
          <Text style={styles.title}>Add Search Tags</Text>
          <Text style={styles.label}>
            Add tags so that customers can find your offers easily!
          </Text>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="pricetag-outline"
                size={18}
                style={styles.inputIcon}
              />
              <TextInput
                value={tag}
                onChangeText={handleInput}
                style={styles.tagInput}
                placeholder="i.e. chicken"
              />
            </View>
            <TouchableOpacity onPress={addTag} style={styles.addButton}>
              <Text style={styles.addButtonLabel}>ADD</Text>
            </TouchableOpacity>
          </View>
          {error?.tag && <Text style={styles.error}>{error?.tag}</Text>}
          <View style={styles.tags}>
            {tags.map((tag, index) => {
              return renderItem(tag, index);
            })}
          </View>

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
            {!loading ? (
              <Text style={styles.submitButtonLabel}>Submit</Text>
            ) : null}
            {loading ? <ActivityIndicator size="small" color="white" /> : null}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

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
    paddingHorizontal: 10,
  },
  bottomSheetIcon: {
    height: 8,
    width: 32,
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: 'black',
    marginTop: 10,
  },
  addPhotosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    width: 150,
    borderRadius: 5,
  },
  row: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPhotoLabel: {
    marginLeft: 10,
    color: 'black',
    fontWeight: '400',
  },
  otherLabel: {
    color: 'black',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
  inputIcon: {
    marginRight: 5,
  },
  input: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  tagInput: {
    flex: 1,
  },
  label: {
    color: 'grey',
    marginVertical: 10,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '60%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 20,
  },
  addButtonLabel: {
    fontWeight: 'bold',
    color: PRIMARY,
    fontSize: 15,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
  },
  dateLabel: {
    color: 'black',
    fontSize: 15,
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
  date: {},
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F6FAFF',
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 10,
  },
  separator: {
    width: 10,
    borderRadius: 5,
  },
  tagLabel: {
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    height: 40,
    marginBottom: 30,
    borderRadius: 3,
    elevation: 5,
  },
  submitButtonLabel: {
    color: 'white',
    fontSize: 14,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});
