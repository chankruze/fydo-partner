import React, { Component, createRef, useEffect, useState } from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    StatusBar,
    BackHandler,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { QRscanner } from "react-native-qr-decode-image-camera";
import RNQRGenerator from 'rn-qr-generator';
import { hasNotch } from 'react-native-device-info';
import { PRIMARY } from '../../assets/colors';
import ToastMessage from '../../components/common/ToastComponent';
import { goBackHandler } from '../../components/common/GoBack';
import { storeValue } from '../../utils/sharedPreferences';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const QrCodeScan = ({ navigation }) => {

    const [key, setKey] = useState(0);
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []);

    const handleBackButton = async () => {
        await goBackHandler(navigation);
    }

    const chooseImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            RNQRGenerator.detect({
                uri: Platform.OS == 'android' ? image.path
                    : image.sourceURL
            })
                .then(response => {
                    if (response?.values.length > 0) {
                        onRead({ data: response?.values[0] });
                    } else {
                        ToastMessage({ message: 'Cannot detect QR code in image' });
                    }
                })
                .catch(error => console.log('Cannot detect QR code in image', error));
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleFlash = () => {
        setFlash(!flash)
    }

    const onRead = async (res) => {

        let upiId = res?.data?.split('upi://pay?pa=')[1]?.split('&pn=')[0];

        console.log('====================================');
        console.log("ip==>", res?.data);
        console.log('====================================');

        if (upiId) {
            navigation.goBack();
            await storeValue('upiId', JSON.stringify(upiId));
        } else {
            ToastMessage({ message: 'Sorry,we cannot fetch upi id from this qr code.' });
            setTimeout(() => {
                setKey(Math.random())
            }, 4000);
        }
        console.log('====================================');
        console.log("subString==>", res?.data?.split('upi://pay?pa=')[1].split('&pn=')[0]);
        console.log('====================================');
        // if (res) {
        //     let params = {
        //         qrText: res?.data
        //     }
        //     try {
        //         const response = await scanQrCode(params);
        //         if (response?.validUidId) {
        //             let { navigation } = this.props;

        //             ToastMessage({ message: response?.message });
        //             this.setState({
        //                 key: Math.random()
        //             })
        //             navigation.navigate('StorePayment', { store: response?.shopPaymentDetails?.shopId });
        //         } else {
        //             setTimeout(() => {
        //                 this.setState({
        //                     key: Math.random()
        //                 });
        //             }, 4000);
        //             ToastMessage({ message: response?.message });
        //         }
        //     } catch (error) {
        //         setTimeout(() => {
        //             this.setState({
        //                 key: Math.random()
        //             });
        //         }, 4000);
        //         ToastMessage({ message: 'Sorry,please try again' });
        //     }
        // }
    }

    return (
        <View style={{
            flex: 1
        }}>
            <StatusBar
                translucent={false}
                backgroundColor={PRIMARY}
                barStyle='light-content'
            />
            {Platform.OS == 'ios' && (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: hasNotch() ? 50 : 25,
                        left: 20
                    }}>
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                </TouchableOpacity>
            )}

            <QRscanner
                key={key}
                onRead={onRead}
                renderBottomView={() =>
                    <View style={{
                        bottom: 0,
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 100,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: '100%',
                        justifyContent: 'space-evenly'
                    }}>
                        <TouchableOpacity
                            onPress={() => chooseImage()}
                        >
                            <Ionicons
                                name='image-outline'
                                size={40}
                                color={'white'}
                                style={{
                                    marginLeft: 20
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleFlash()}
                        >
                            <Ionicons
                                name={flash ? 'flash-off-outline' : 'flash-outline'}
                                size={40}
                                color={'white'}
                                style={{
                                    marginLeft: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                flashMode={flash}
                cornerColor={PRIMARY}
                scanBarColor={PRIMARY}
                zoom={0}
                hintText={
                    'Put QR code / bar code into the box and scan it automatically'
                }
                hintTextStyle={styles.hintTextStyle}
                hintTextPosition={50}
                rectHeight={250}
                rectWidth={250}
            />
            {/* <QRCodeScanner
                    // cameraContainerStyle={{
                    //     top: 0,
                    //     position: 'absolute',
                    //     height: '100%'
                    // }}
                    cameraStyle={{
                        height: '100%'
                    }}
                    topViewStyle={{
                        zIndex: 1,
                        position: 'absolute'
                        // height: '100%'
                    }}
                    // onRead={this.onSuccess}
                    flashMode={this.state.flash}
                    bottomContent={
                        <View style={{
                            bottom: 0,
                            position: 'absolute',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 100,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            width: '100%'
                        }}>
                            <TouchableOpacity
                                onPress={() => this.chooseImage()}
                            >
                                <Ionicons
                                    name='image-outline'
                                    size={40}
                                    color={'white'}
                                    style={{
                                        marginLeft: 20
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.handleFlash()}
                            >
                                <Ionicons
                                    name='flash-outline'
                                    size={40}
                                    color={'white'}
                                    style={{
                                        marginLeft: 20
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                /> */}

            {/* <View style={styles.bottomView}>
                    <Text style={styles.titleTxt}>Quick pay</Text>
                    <FlatList
                        style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={this.renderData}
                        ItemSeparatorComponent={() =>
                            <View style={styles.seperator} />
                        }
                    />
                </View> */}
        </View>
    )
}

export default connect(mapStateToProps)(QrCodeScan);

const styles = StyleSheet.create({
    bottomView: {
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 15,
        width: '100%',
        height: '32%'
    },
    titleTxt: {
        fontFamily: 'Gilroy-Semibold',
        fontSize: 16,
        color: 'black'
    },
    shop: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center'
    },
    seperator: {
        height: 15
    },
    shopImage: {
        height: 70,
        width: 70,
        borderRadius: 8,
        borderWidth: .5,
        borderColor: 'rgba(0, 53, 121, 0.15)',
        resizeMode: 'cover'
    },
    flatlist: {
        marginTop: 10
    },
    shopName: {
        fontFamily: 'Gilroy-Semibold',
        fontSize: 14,
        color: 'black',
        marginLeft: 20
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    hintTextStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        marginHorizontal: 10,
        fontFamily: 'Gilroy-Semibold',
        letterSpacing: 0.3
    }
})