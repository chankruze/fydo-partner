import React, { Component, createRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Switch,
  Modal,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeFab from '../components/home/HomeFab';
import HomeSlider from './../components/home/HomeSlider';
//import Entypo from 'react-native-vector-icons/Entypo';
import { LIGHTBLUE, PRIMARY, WHITE } from '../assets/colors';
//import { SvgUri } from 'react-native-svg';
import OfferIcon from './../assets/icons/my offer.svg';
import MyShopIcon from './../assets/icons/myshop.svg';
import SupportIcon from './../assets/icons/support.svg';
//import ReferEarnIcon from './../assets/icons/refer and earn.svg';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AddOfferIcon from './../assets/icons/addoffer.png';
import WithNetInfo from '../components/hoc/withNetInfo';
import AddTagsBottomSheet from '../components/home/AddTagsBottomSheet';
import {
  closeShop,
  getCarousels,
  getCategories,
  getMyShop,
  getShopStatus,
  openShop,
} from '../services/shopService';
import CardIconButton from '../components/home/CardIconButton';
import { setShop } from '../store/actions/user.action';
import CardlabelButton from '../components/home/CardlabelButton';
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize';
import JoinNowTopSheet from './shop/JoinNowTopSheet';
import MyOffersBottomSheet from '../components/myoffers/MyOffersBottomSheet';
import RoundIconText from '../components/home/RoundIconText';
import SquareIconButton from '../components/home/SquareIconButton';
import MySaleBottomSheet from '../components/sale/MySaleBottomSheet';
import messaging from '@react-native-firebase/messaging';
import { getDeviceInfo } from '../utils/getDeviceInfo';
import { getSupportVersion, uploadDeviceInfo } from '../services/homeService';
import { Platform } from 'react-native';
import { compareVersions } from 'compare-versions';
import UpdateDialog from '../components/UpdateDialog';
import ViewShot from 'react-native-view-shot';
import Permissions, { PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import { isBleConnectPermissionGranted, isBleScanPermissionGranted, isBluetoothPermissionGranted, isCameraPermissionGranted, isLocationPermissionGranted, requestBleConnectPermission, requestBleScanPermission, requestCameraPermission, requestLocationPermission } from '../utils/permissionManager';

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
    language: state?.userReducer?.language,
    myshop: state?.userReducer?.myshop,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShop: myshop => dispatch(setShop(myshop))
  };
};
class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      shopOpen: false,
      modalVisible: false,
      tagBottomSheetVisible: false,
      tagTopSheetVisibel: false,
      modalOfferVisible: false,
      modelSaleVisible: false,
      carousels: [],
      supportVersion: null,
      deviceInfo: null,
      updateViewVisible: false,
      card: false,
      myCategories: []
    }
    this.openShop = this.openShop.bind(this);
    this.closeShop = this.closeShop.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.shareCard = this.shareCard.bind(this);
    this.triggerTagModal = this.triggerTagModal.bind(this);
    this.triggerTopTagModal = this.triggerTopTagModal.bind(this);
    this.navigateToReferEarn = this.navigateToReferEarn.bind(this);
    this.navigateToSupportScreen = this.navigateToSupportScreen.bind(this);
    this.triggerOfferModal = this.triggerOfferModal.bind(this);
    this.triggerSaleModel = this.triggerSaleModel.bind(this);
    this.NotifcationListnes = this.NotifcationListnes.bind(this);
    this.cardSnap = createRef();
  }

  async componentDidMount() {
    const response = await getSupportVersion();
    const deviceInfo = await getDeviceInfo();
    this.setState({ supportVersion: response, deviceInfo: deviceInfo });

    const permissionStatus = await isLocationPermissionGranted();
    if (permissionStatus !== 'granted') {
      await requestLocationPermission();
    }

    await this.callApis();
    await this.fetchShopData();
    await this.getSections();
    await this.showUpdateDialog();
    await this.fetchAllCategories();
    // this.NotifcationListnes();
  }

  async fetchAllCategories() {
    let { user, myshop } = this.props;
    try {
      const response = await getCategories(user?.accessToken);
      console.log('response',response)
      let result = response?.filter(function (o1) {
        return myshop?.categories.some(function (o2) {
          return o1._id === o2;
        });
      });
      let newArr = result.map((i) => {
        return i?.name
      })
      console.log('newArr---->',newArr)
      this.setState({
        myCategories: newArr
      })
    } catch (error) {
      console.log(error);
    }
  }

  async callApis() {
    let { user } = this.props;
    try {
      const [shopStatusResponse, carouselsResponse] = await Promise.all([
        getShopStatus(user?.accessToken), getCarousels(user?.accessToken)
      ]);
      this.setState({ carousels: carouselsResponse, shopOpen: shopStatusResponse?.isOpen })

    } catch (error) {
      console.log("ty==", error);
    }
  }
  async fetchShopData() {
    let { user, setShop } = this.props;
    try {
      const response = await getMyShop(user?.accessToken);
      if (response) {
        setShop(response)
      }
    } catch (error) {
      console.log(error);
    }
  }
  async openShop() {
    let { user } = this.props;
    try {
      const response = await openShop(user?.accessToken);
      this.setState({ shopOpen: response?.isOpen });
    } catch (error) {
      console.log(error);
    }
  }

  async closeShop() {
    let { user } = this.props;
    try {
      const response = await closeShop(user?.accessToken);
      this.setState({ shopOpen: response?.isOpen });
    } catch (error) {
      console.log(error);
    }
  }

  handleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  // handleTagsBottomSheet() {
  //   this.setState({ tagBottomSheetVisible: !this.state.tagBottomSheetVisible });
  // }
  getSections = async () => {
    const { user } = this.props;

    try {
      const accessToken = user?.accessToken || null;
      if (accessToken) {
        const token = await this.getToken();
        const deviceInfo = await getDeviceInfo();
        this.uploadDeviceInfos(token, deviceInfo, accessToken)

      }
    } catch (error) {
      console.log("calling from getSection", error);
      this.setState({ loading: false });
    }
  }

  showUpdateDialog = () => {
    let { supportVersion, deviceInfo } = this.state;
    if (supportVersion == null || deviceInfo == null) return;
    let appVersion = deviceInfo?.appVersion;
    let minAndroidVersion = supportVersion?.minAndroidVersion;
    let minIosVersion = supportVersion?.minIosVersion;

    if (minIosVersion == undefined || minAndroidVersion == undefined || appVersion == null)
      return;

    if (Platform.OS === 'ios' && compareVersions(appVersion, minIosVersion) == -1) {
      this.setState({ updateViewVisible: true });
    } else if (Platform.OS === 'android' && compareVersions(appVersion, minAndroidVersion) == -1) {
      this.setState({ updateViewVisible: true });
    }
    else {
      this.setState({ updateViewVisible: false });
    }
  }

  uploadDeviceInfos = async (token, deviceInfo, accessToken) => {
    const { myshop } = this.props;

    let params = JSON.stringify(Object.assign({ ...deviceInfo }, {
      'fcmId': token,
      'appType': 'Partner',
      'shopId': myshop?._id,
      'appTech': 'RN'
    }));
    const response = await uploadDeviceInfo(params, accessToken);
  }

  async getToken() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      await messaging().registerDeviceForRemoteMessages();
      return await messaging().getToken();
    }
  }
  NotifcationListnes() {
    console.log('NotifcationListnes-->')
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:'
      );
      if (remoteMessage) {
        console.log('remoteMessage')
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('remoteMessage-->')
        }
      });
    messaging().onMessage(async remoteMessage => {
      console.log('notification on froground state....')
    })
  }

  async shareCard() {
    let { myCategories } = this.state;
    const { myshop } = this.props;
    try {
      this.cardSnap.current.capture({
        snapshotContentContainer: true,
      }).then((uri) => {
        let shareImage = {
          url: uri,
          message: `Check ${myshop && myshop?.name} out. Get all your ${myCategories && myCategories?.join(', ')} needs from ${myshop && myshop?.name} only on Fydo.`
        };
        Share.open(shareImage).catch(err => console.log(err));
        this.setState({
          card: !this.state.card
        })
      })
      // const shareResponse = Share.open({
      //   message: `Check ${myshop && myshop?.name} out. Get all your Automobile Repair needs from ${myshop && myshop?.name} only on Fydo.`,
      //   title: 'Title',
      // });
    } catch (error) {
      console.log(error);
    }
  }

  // handleShopStatus(){
  //     this.setState({shopOpen: !this.state.shopOpen});
  // }

  navigateToReferEarn() {
    let { navigation } = this.props;
    navigation.navigate('ReferEarn');
  }

  navigateToSupportScreen() {
    let { navigation } = this.props;
    navigation.navigate('Support');
  }
  triggerOfferModal() {
    this.setState({ modalVisible: false })
    this.setState(prevState => {
      return {
        modalOfferVisible: !prevState.modalOfferVisible,
      }
    });
  }
  triggerSaleModel() {
    this.setState({ modalVisible: false })
    this.setState(prevState => {
      return {
        modelSaleVisible: !prevState.modelSaleVisible,
      }
    })
  }
  triggerTagModal() {
    this.setState(prevState => {
      return {
        tagBottomSheetVisible: !prevState.tagBottomSheetVisible,
      };
    });
  }
  triggerTopTagModal() {
    this.setState(prevState => {
      return {
        tagTopSheetVisibel: !prevState.tagTopSheetVisibel,
      };
    });
  }
  renderTopSheet() {
    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={this.state.tagTopSheetVisibel}
        onRequestClose={this.triggerTopTagModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable
            activeOpacity={1}
            style={styles.addTagsBottomSheetContainer}
            onPress={this.triggerTopTagModal}
          >
            <JoinNowTopSheet
              onPress={this.triggerTopTagModal}
            />
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    )
  }
  renderTagBottomSheet() {
    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={this.state.tagBottomSheetVisible}
        onRequestClose={this.triggerTagModal}>
        <KeyboardAvoidingView
          style={{
            height: 400,
            // position: 'absolute',
            width: '100%',
            bottom: 0,
            flex: 1
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Pressable
            activeOpacity={1}
            style={styles.addTagsBottomSheetContainer}
            onPress={this.triggerTagModal}>
            <AddTagsBottomSheet triggerTagModal={this.triggerTagModal} />
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
  renderOfferModal() {
    let { user } = this.props;
    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={this.state.modalOfferVisible}
        onRequestClose={this.triggerOfferModal}
      >
        {/* <KeyboardAvoidingView
          // style={{
          //   justifyContent: 'center'
          // }}
          behavior={Platform.OS == 'android' ? 'height' : 'padding'}
        > */}
        <Pressable
          activeOpacity={1}
          style={styles.addTagsBottomSheetContainer}
          onPress={this.triggerOfferModal}>

          <MyOffersBottomSheet
            token={user?.accessToken}
            toggle={this.triggerOfferModal} />
        </Pressable>
        {/* </KeyboardAvoidingView> */}

      </Modal>
    )
  }
  renderSaleModal() {
    let { user } = this.props;
    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={this.state.modelSaleVisible}
        onRequestClose={this.triggerSaleModel}
      >
        <Pressable
          activeOpacity={1}
          style={styles.addTagsBottomSheetContainer}
          onPress={this.triggerSaleModel}>

          <MySaleBottomSheet
            token={user?.accessToken}
            toggle={this.triggerSaleModel} />
        </Pressable>
      </Modal>
    )
  }

  renderModal() {
    let { myCategories } = this.state;
    const { myshop } = this.props;

    console.log("shop==>", myCategories)

    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={this.state.card}
        onRequestClose={() => {
          this.setState({
            card: false
          })
        }}
      >
        <Pressable
          activeOpacity={1}
          style={styles.addTagsBottomSheetContainer}
          onPress={() => {
            this.setState({
              card: false
            })
          }}>
          <View style={{
            minHeight: moderateScale(300),
            backgroundColor: WHITE,
            position: 'absolute',
            width: '100%',
            bottom: 0,
            borderTopLeftRadius: moderateScale(10),
            borderTopRightRadius: moderateScale(10),
            zIndex: 10,
            // paddingHorizontal: moderateScale(10)
          }}>
            <ViewShot
              ref={this.cardSnap}
              style={{
                flex: 1,
                // justifyContent: 'center',
                borderTopLeftRadius: moderateScale(10),
                borderTopRightRadius: moderateScale(10),
                // height: '92%',
                // paddingBottom: 10,
                backgroundColor: 'white',
              }}
              options={{ format: 'jpg', quality: 0.9 }}>
              <ImageBackground
                source={require('../assets/images/card.png')}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                resizeMode='contain'
              >
                <View style={styles.shopTitleView}>
                  <Text style={styles.shopTitle}>{myshop?.name}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Image
                    source={require('../assets/images/pincode.png')}
                    style={{
                      width: 10,
                      height: 10
                    }}
                  />
                  <Text style={styles.extraTxt}>
                    {myshop?.address?.addressLine1}
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <Image
                    source={require('../assets/images/telephone.png')}
                    style={{
                      width: 10,
                      height: 10
                    }}
                  />
                  <Text style={styles.extraTxt}>{myshop?.mobile}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Image
                    source={require('../assets/images/user.png')}
                    style={{
                      width: 10,
                      height: 10
                    }}
                  />
                  <Text style={styles.extraTxt}>
                    {myshop?.owner?.ownerName}
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <Image
                    source={require('../assets/images/list.png')}
                    style={{
                      width: 10,
                      height: 10
                    }}
                  />
                  <Text style={styles.extraTxt}>{myCategories?.join(',')}</Text>
                </View>
              </ImageBackground>
            </ViewShot>
            <TouchableOpacity
              style={styles.cardBtn}
              onPress={() => {
                this.shareCard()
              }}>
              <Text style={styles.cardBtnTxt}>Share card</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    )
  }

  render() {
    let { shopOpen, carousels } = this.state;
    let { language, myshop } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <HomeFab handleModal={this.handleModal} />
        {/* <UpdateDialog updateVisible={this.state.updateViewVisible} /> */}
        {this.state.card && this.renderModal()}
        <Modal
          statusBarTranslucent
          transparent={true}
          visible={this.state.modalVisible}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modelContainer}
            onPress={() => this.setState({ modalVisible: false })}>
            <View style={styles.modalItems}>
              <TouchableOpacity
                style={styles.modalItem}
                activeOpacity={0.9}
                onPress={this.triggerOfferModal}>
                <Image
                  source={AddOfferIcon}
                  style={styles.addOfferIcon} />
                <View style={styles.modalLabelContainer}>
                  <Text style={styles.modalLabel}>{language == 'HINDI' ? 'प्रस्ताव जोड़ें' : 'Add Offer'}</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity 
                                    style={styles.modalItem}
                                    activeOpacity={.9}
                                    onPress={this.triggerSaleModel}
                                    >
                                    <Image
                  source={AddOfferIcon}
                  style={styles.addOfferIcon} />
                                    <View style={styles.modalLabelContainer}>
                                        <Text style={styles.modalLabel}>
                                            Add Sale
                                        </Text>
                                    </View>
                                </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
        </Modal>
        {this.state.modalOfferVisible && this.renderOfferModal()}
        {this.state.modelSaleVisible && this.renderSaleModal()}
        {this.state.tagBottomSheetVisible && this.renderTagBottomSheet()}
        {this.state.tagTopSheetVisibel && this.renderTopSheet()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor={PRIMARY} />
          <HomeSlider carousels={carousels && carousels} />
          <CardIconButton title="Share your business card to get more customer!" buttonTitle="Tap to share" icons={<MaterialIcons name="card-giftcard" size={30} color={WHITE} />} onPress={() => {
            this.setState({
              card: !this.state.card
            })
          }} />
          <View style={styles.line} />
          <CardIconButton title="Add Tags to your shops to make user search you" buttonTitle="Tap to Add" icons={<Ionicons name="pricetag-outline" size={30} color={WHITE} />} onPress={this.triggerTagModal} />
          <View style={styles.line} />
          <View style={styles.row}>
            <RoundIconText
              icon={<MyShopIcon width={24} height={24} />}
              onPress={() => this.props?.navigation?.navigate('MyShop')}
              label={language == 'HINDI' ? 'मेरी दुकान' : 'My Shops'} />
            <RoundIconText
              icon={<OfferIcon width={24} height={24} />}
              onPress={() => this.props?.navigation?.navigate('MyOffers')}
              label={language == 'HINDI' ? 'मेरे प्रस्ताव' : 'My Offers'}
            />
            <RoundIconText
              icon={<Feather name="arrow-down-left" size={24} color={'#fff'} />}
              onPress={() => this.props?.navigation?.navigate('ReferralHistory')}
              label={language == 'HINDI' ? 'मेरे प्रस्ताव' : 'My Referral'}
            />
            {/* <RoundIconText 
              icon={<OfferIcon width={24} height={24} />}
              onPress={()=> this.props?.navigation?.navigate('MySales')}
              label={language == 'HINDI' ? 'मेरे प्रस्ताव' : 'My Sales'}
            /> */}
          </View>
          <View style={styles.line} />
          {!myshop?.isChannelPartner && (
            <CardlabelButton title="Get guranteed customer in your shop" subTitle="Be Our Exclusive Channel Partner" buttonTitle="Join now" onPress={this.triggerTopTagModal} />
          )}
          <View style={styles.line} />
          <View style={styles.row}>
            <SquareIconButton
              onPress={() => this.props?.navigation?.navigate('Support')}
              label={language == 'HINDI' ? 'समर्थन और सेवा' : 'Support and service'}
              icon={<SupportIcon width={24} height={24} />} />
            <SquareIconButton
              onPress={() => this.props?.navigation?.navigate('ReferEarn')}
              label={language == 'HINDI' ? 'देखें और कमाएं' : 'Refer and earn'}
              icon={<FontAwesome name='bullhorn' size={24} color={PRIMARY} />} />
          </View>
          <View style={styles.line} />
          <View style={styles.shopStatusRow}>
            <Text style={styles.shopStatusLabel}>{language == 'HINDI' ? 'आपकी दुकान की स्थिति' : 'Your shop status'}</Text>
            <Switch
              style={styles.switchButton}
              value={shopOpen}
              thumbColor={shopOpen ? PRIMARY : 'lightgrey'}
              onValueChange={shopOpen ? this.closeShop : this.openShop}
            />
            <View
              style={Object.assign(
                { ...styles.shopStatus },
                { backgroundColor: shopOpen ? '#66bb6a' : '#ff7043' },
              )}>
              <Text style={styles.shopStatusOtherLabel}>
                {shopOpen ? (language == 'HINDI' ? 'खुल गया' : 'Opened') : (language == 'HINDI' ? 'बंद किया हुआ' : 'Closed')}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNetInfo(HomeScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: moderateScale(15),
  },
  line: {
    backgroundColor: 'lightgrey',
    height: moderateScale(1),
  },
  shopStatusLabel: {
    color: 'black',
    fontSize: textScale(13),
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
  shopStatusRow: {
    padding: moderateScale(10),
    marginHorizontal: moderateScale(5),
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchButton: {
    marginLeft: moderateScale(10),
  },
  shopStatus: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(20),
  },
  shopStatusOtherLabel: {
    fontSize: textScale(13),
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
  modelContainer: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    height: '100%',
  },
  modalItems: {
    position: 'absolute',
    width: '100%',
    bottom: moderateScaleVertical(120),
    zIndex: 10,
  },
  modalItem: {
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  modalIconContainer: {
    backgroundColor: PRIMARY,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 5,
    backgroundColor: 'rgba(227, 242, 253, .3)',
    shadowColor: 'rgba(227, 242, 253, 1)',
  },
  modalLabelContainer: {
    marginLeft: 10,
    backgroundColor: LIGHTBLUE,
    height: 30,
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 133,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  modalLabel: {
    color: '#000914',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.3,

  },
  addTagsBottomSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '100%',
  },
  bottomSheet: {
    flexWrap: 'wrap',
  },
  addOfferIcon: {
    width: 40,
    height: 40
  },
  shopTitleView: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: '40%'
  },
  shopTitle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
    color: 'white'
  },
  extraTxt: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 10,
    color: 'black',
    paddingLeft: 8
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    marginTop: 4,
    marginLeft: 8
  },
  cardBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8
  },
  cardBtnTxt: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
    color: 'white',
  }
});
