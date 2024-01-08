import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../../assets/colors';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Dialog from "react-native-dialog";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { generatePresignUrl } from '../../services/presignUrlService';
import { addOffer } from '../../services/offerService';
import uuid from 'react-native-uuid';
import { moderateScale } from '../../utils/responsiveSize';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import ToastMessage from '../common/ToastComponent';
import { ScrollView } from 'react-native';

export default function MyOffersBottomSheet({ token, toggle }) {

    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [tag, setTag] = useState(null);
    const [error, setError] = useState({});
    const [productName, setProductName] = useState(null);
    const [description, setDescription] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().getTime());
    const [endTimePicker, setEndTimePicker] = useState(false);
    const [startTimePicker, setStartTimePicker] = useState(false);
    const handleProductName = (productName) => {
        setProductName(productName)
    };

    const handleDescription = (description) => {
        setDescription(description);
    }

    const onStartShouldSetResponder = () => {
        return true
    };

    const addTag = () => {
        if (validateTag()) {
            tags.push(tag);
            setTags(tags);
            setTag(null);
        }
    }

    const handleInput = (value) => {
        setTag(value)
    }

    const removeTag = (tag) => {
        let list = tags.filter(item => item != tag);
        setTags(list);
    }

    const handleStartDate = (selectedDate) => {
        const currentDate = selectedDate;
        const milliseconds = new Date(currentDate).getTime();
        setStartDate(milliseconds);
    }

    const handleEndDate = (selectedDate) => {
        const currentDate = selectedDate;
        const milliseconds = new Date(currentDate).getTime();
        setEndDate(milliseconds);
    }

    const pickImage = () => {
        setDialogVisible(true)
    }
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
                    imagePath = imageResponse[0]?.split("?")[0];
                    const imageBody = await getBlob(imageUrl);
                    const dataResponse = await fetch(imageResponse[0], {
                        method: 'PUT',
                        body: imageBody
                    })
                }
                const response = await addOffer(token, {
                    title: productName,
                    description: description,
                    searchTags: tags,
                    startDate: startDate,
                    endDate: endDate,
                    imageUrl: [imagePath]
                });

                if (response) {
                    ToastMessage({ message: 'Offer added' })
                }
                setLoading(false);
                toggle();
            } catch (error) {
                console.log("error", error)
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
    }

    const validateInputs = () => {
        let error = {};
        setError({});
        if (!productName)
            error['productName'] = "Enter product name";
        if (!description)
            error['description'] = 'Enter description';
        if (Object.keys(error).length > 0) {
            setError(error);
            return false;
        }
        return true;
    }
    const validateTag = () => {
        let error = {};
        setError({});
        if (!tag)
            error['tag'] = "Enter Tag";
        if (Object.keys(error).length > 0) {
            setError(error);
            return false;
        }
        return true;
    }

    const getDate = (milliseconds) => {
        return moment(milliseconds).format('DD MMM');
    };

    const openCamera = async () => {
        try {
            const result = await launchCamera({
                mediaType: 'photo',
                quality: .5,
            });
            if (result?.assets?.length > 0) {
                setImageUrl(result?.assets[0]?.uri)
            }
            setDialogVisible(false);
        } catch (error) {
            console.log(error)
            setDialogVisible(false);
        }
    };

    getBlob = async (fileUri) => {
        const resp = await fetch(fileUri);
        const imageBody = await resp.blob();
        return imageBody;
    };

    const openGallery = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: .5,
                selectionLimit: 1
            });
            if (result?.assets.length > 0) {
                setImageUrl(result?.assets[0]?.uri)
            }
            setDialogVisible(false);
        } catch (error) {
            console.log(error);
            setDialogVisible(false);
        }
    };

    const renderDialog = () => {
        return (
            <Dialog.Container
                visible={dialogVisible}
                onBackdropPress={() => {
                    setDialogVisible(false)
                }}>
                <Dialog.Title>Select Image</Dialog.Title>
                <Dialog.Description>
                    Select image from?
                </Dialog.Description>
                <Dialog.Button label="Gallery" onPress={openGallery} />
                <Dialog.Button label="Camera" onPress={openCamera} />
            </Dialog.Container>
        )
    }

    const renderItem = (item, index) => {
        return (
            <View style={styles.tag} key={index}>
                <Text style={styles.tagLabel}>{item}</Text>
                <TouchableOpacity
                    onPress={removeTag.bind(this, item)}>
                    <MaterialIcons
                        name='clear'
                        size={16}
                        color={PRIMARY}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={onStartShouldSetResponder}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1 }}
                >
                    {renderDialog()}
                    <Image
                        source={BottomsheetIcon}
                        style={styles.bottomSheetIcon}
                    />
                    <Text style={styles.title}>Add Offer</Text>
                    <View style={[styles.row, {
                    }]}>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={styles.addPhotosButton}>
                            <Ionicons
                                color={PRIMARY}
                                size={32}
                                name='md-add-circle-outline' />
                            <Text style={styles.addPhotoLabel}>Add photos</Text>
                        </TouchableOpacity>
                        <Text style={[styles.otherLabel, {
                            alignSelf: 'center'
                        }]}>If any</Text>
                    </View>

                    <TextInput
                        placeholder='Product Name'
                        style={styles.input}
                        onChangeText={handleProductName}
                    />
                    {error?.productName && <Text style={styles.error}>{error?.productName}</Text>}
                    <TextInput
                        placeholder='Add Description (Buy 1 get 1 free /Buy 2 get 20% off)'
                        style={styles.input}
                        onChangeText={handleDescription}
                    />
                    {error?.description && <Text style={styles.error}>{error?.description}</Text>}
                    <Text style={styles.title}>Add Search Tags</Text>
                    <Text style={styles.label}>Please add some tags to make the customer feel easy to find your offers!</Text>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name='pricetag-outline'
                                size={18}
                                style={styles.inputIcon} />
                            <TextInput
                                value={tag}
                                onChangeText={handleInput}
                                style={styles.tagInput}
                                placeholder="Try fruits"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={addTag}
                            style={styles.addButton}>
                            <Text style={styles.addButtonLabel}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                    {error?.tag && <Text style={styles.error}>{error?.tag}</Text>}
                    <View style={styles.tags}>
                        {tags?.map((tag, index) => {
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
                        activeOpacity={.8}
                        style={styles.submitButton}>
                        {!loading && <Text style={styles.submitButtonLabel}>Submit</Text>}
                        {loading && <ActivityIndicator size="small" color="white" />}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
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
        paddingHorizontal: 10
    },
    bottomSheetIcon: {
        height: 8,
        width: 32,
        marginBottom: 20,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black',
        marginTop: 10
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
        alignItems: 'center'
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
        marginLeft: 5
    },
    inputIcon: {
        marginRight: 5,
    },
    input: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    label: {
        color: 'grey',
        marginVertical: 10
    },
    tagInput: {
        flex: 1
    },
    label: {
        color: 'grey',
        marginVertical: 10
    },
    inputContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        width: '60%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    addButton: {
        marginLeft: 20
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
        marginRight: 15
    },
    dateLabel: {
        color: 'black',
        fontSize: 15
    },
    dateContainer: {
        borderWidth: 1,
        borderColor: BLACK,
        backgroundColor: WHITE,
        width: moderateScale(80),
        padding: moderateScale(10),
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {

    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        backgroundColor: '#F6FAFF',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10,
        marginTop: 10
    },
    separator: {
        width: 10,
        borderRadius: 5
    },
    tagLabel: {
        marginRight: 10
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
        elevation: 5
    },
    submitButtonLabel: {
        color: 'white',
        fontSize: 14
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 10
    }
})