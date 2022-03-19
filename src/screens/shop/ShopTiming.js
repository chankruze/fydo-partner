import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import React, { createRef, useRef, useState } from 'react';
import { Checkbox } from 'react-native-paper';
import { DARKBLACK, DARKBLUE, GREY, GREY_2, PRIMARY } from '../../assets/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Cross from '../../assets/icons/cross.svg';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import moment from 'moment';

const ShopTiming = () => {

    let rbSheet = useRef();
    const [images, setImages] = useState([]);
    const [timePicker, setTimePicker] = useState(false);
    const [opentimePicker, setOpenTimePicker] = useState(false);
    const [checked, setChecked] = useState(false);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const selectImages = () => {
        rbSheet.open();
    };

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then((image) => {
                let imageData = [image];

                const data = imageData.map((i) => {
                    return {
                        // uri: i.path,
                        uri:
                            Platform.OS === 'android'
                                ? i.path
                                : i.path.replace('file://', ''),
                        width: i.width,
                        height: i.height,
                        mime: i.mime,
                    };
                });

                const newImages = [...images, ...data];

                setImages(newImages);
            })
            .catch((err) => {
                console.log(' Error fetching image from Camera roll ', err);
            });
    };

    const choosePhotosFromGallery = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            // multiple: true,
            waitAnimationEnd: false,
            cropping: true,
            // includeExif: true,
            forceJpg: true,
        })
            .then((res) => {
                let imageData = [res];

                const data = imageData.map((i, index) => {
                    return {
                        // uri: i.path,
                        uri:
                            Platform.OS === 'android'
                                ? i.path
                                : i.path.replace('file://', ''),
                        width: i.width,
                        height: i.height,
                        mime: i.mime,
                    };
                });
                const newImages = [...images, ...data];
                setImages(newImages);
            })
            .catch((err) => {
                console.log(' Error fetching images from gallery ', err);
            });
    };

    const renderImage = (image) => {
        return (
            <View style={styles.row}>
                <View style={styles.imageMainContainer}>
                    <Image
                        style={styles.circleContainer}
                        source={{
                            uri: image.uri,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            removeImage(image.uri);
                        }}
                        style={styles.removeIcon}>
                        <Cross />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const setGlobalTime = () => {
        setTimePicker(!timePicker)
    }

    const handleOpenTimePicker = () => {
        setOpenTimePicker(!opentimePicker)
    }

    const setGlobalOpenTime = (item) => {
        console.log("ite--.", item);
        const d = moment(item).format('hh:mm A');
        console.log("12-->", d);
    }

    const rendorTimings = ({ item, index }) => {
        console.log("hj-->", item);
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
            }}>
                <Text style={{
                    width: '15%',
                    marginLeft: 10,
                    fontFamily: 'Gilroy-Regular',
                    fontSize: 14,
                    color: '#383B3F'
                }}>{item}</Text>
                <TouchableOpacity style={styles.timeButton}
                    onPress={handleOpenTimePicker}
                >
                    <Text style={styles.timeTxt}>Open Time</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeButton}
                    onPress={setGlobalTime}
                >
                    <Text style={styles.timeTxt}>Close Time</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={styles.closeTxt}>Closed</Text>
                    <RadioButton
                        color={PRIMARY}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(true)}
                    />
                </View>
            </View>
        )
    }

    const removeImage = (uri) => {
        var c = images.filter((i) => {
            return i.uri !== uri;
        });
        setImages(c);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.imageTitle}>Add Shop Images</Text>
                <View style={styles.btnViewContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={selectImages}
                    >
                        <Image
                            source={require('../../assets/images/add_image.png')}
                            style={{
                                width: 29,
                                height: 29
                            }}
                        />
                    </TouchableOpacity>

                    <ScrollView
                        style={styles.imgContainer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {images
                            ? images.map((i) => (
                                <View style={styles.imgView} key={i.uri}>
                                    {renderImage(i)}
                                </View>
                            ))
                            : null}
                    </ScrollView>
                </View>
            </View>
            <View style={{
                marginTop: 20
            }}>
                <Text style={styles.imageTitle}>Add Timing</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <Text style={styles.usualText}>Usual Timing</Text>
                    <TouchableOpacity style={styles.globalTimeButton}
                        onPress={setGlobalTime}
                    >
                        <Text style={styles.timeTxt}>Open Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.globalTimeButton}
                        onPress={setGlobalTime}
                    >
                        <Text style={styles.timeTxt}>Close Time</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={opentimePicker}
                        mode="time"
                        onConfirm={setGlobalOpenTime}
                        onCancel={setOpenTimePicker}
                    />
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <FlatList
                        data={days}
                        renderItem={rendorTimings}
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles}>

                </TouchableOpacity>
            </View>
            <RBSheet
                ref={(ref) => rbSheet = ref}
                height={200}
                openDuration={150}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                }}>
                <View style={styles.chosseTextStyle}>
                    <Text style={styles.chooseContianer}>Choose Images from</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <TouchableOpacity
                        style={styles.buttonChoose}
                        onPress={takePhotoFromCamera}
                    >
                        <Image
                            source={require('../../assets/images/camera.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: PRIMARY
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonChoose}
                        onPress={choosePhotosFromGallery}
                    >
                        <Image
                            source={require('../../assets/images/gallery.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: PRIMARY
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </SafeAreaView >
    );
};

export default ShopTiming;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 30,
    },
    imageTitle: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 18,
        letterSpacing: 0.3,
        color: DARKBLACK
    },
    btnViewContainer: {
        flexDirection: 'row',
        height: 190,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ECECEC',
        borderWidth: 0.4,
        borderRadius: 20,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 112,
        height: 160,
    },
    buttonChoose: {
        backgroundColor: '#ECECEC',
        borderWidth: 0.4,
        borderRadius: 20,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 100,
        height: 100,
        marginTop: 7,
    },
    imgView: {
        // width: 75,
        // marginHorizontal: 25
    },
    imgContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    chooseContianer: {
        color: '#282828',
        fontFamily: 'Gilroy-SemiBold',
        marginVertical: 7,
        fontSize: 16,
    },
    chosseTextStyle: {
        padding: 10,
    },
    row: {
        width: 112,
        height: 190,
        justifyContent: 'center',
        marginHorizontal: 8,
        // marginTop: 10,
    },
    imageMainContainer: {
        flexDirection: 'row',
        width: 112,
        height: 160,
    },
    circleContainer: {
        width: 112,
        height: 160,
        borderWidth: 0.4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    removeIcon: {
        width: 30,
        height: 30,
        right: 20,
        bottom: 15,
        zIndex: 999,
    },
    globalTimeButton: {
        width: '30%',
        height: 30,
        borderRadius: 4,
        borderColor: 'rgba(77, 83, 91, 0.2)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    timeButton: {
        width: '20%',
        height: 30,
        borderRadius: 4,
        borderColor: 'rgba(77, 83, 91, 0.2)',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    usualText: {
        fontFamily: 'Gilroy-Medium',
        fontSize: 15,
        color: '#4D535BCC'
    },
    timeTxt: {
        fontFamily: 'Gilroy-Medium',
        fontSize: 12,
        color: 'black'
    },
    closeTxt: {
        marginLeft: 30,
        fontFamily: 'Gilroy-Regular',
        fontSize: 14,
        color: '#383B3F'
    }
});
