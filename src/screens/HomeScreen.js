import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Text, StatusBar, Switch, Modal, Pressable, KeyboardAvoidingView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeFab from '../components/home/HomeFab';
import HomeSlider from './../components/home/HomeSlider';
import Entypo from 'react-native-vector-icons/Entypo';
import { PRIMARY } from '../assets/colors';
import { SvgUri } from 'react-native-svg';
import OfferIcon from './../assets/icons/my offer.svg';
import MyShopIcon from './../assets/icons/myshop.svg';
import SupportIcon from './../assets/icons/support.svg';
import ReferEarnIcon from './../assets/icons/refer and earn.svg';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
// import MyShopIcon from './../assets/icons/myshop.svg';


import WithNetInfo from '../components/hoc/withNetInfo';
import AddTagsBottomSheet from '../components/home/AddTagsBottomSheet';
import { closeShop, getCarousels, getShopStatus, openShop } from '../services/shopService';

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}


class HomeScreen extends Component{
    constructor(){
        super();
        this.state = {
            shopOpen: false,
            modalVisible: false,
            tagBottomSheetVisible: false,
            carousels: []
        }
        this.openShop = this.openShop.bind(this);
        this.closeShop = this.closeShop.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.shareCard = this.shareCard.bind(this);
        this.navigateToMyOffers = this.navigateToMyOffers.bind(this);
        this.triggerTagModal = this.triggerTagModal.bind(this);
        this.navigateToReferEarn = this.navigateToReferEarn.bind(this);
        this.navigateToSupportScreen = this.navigateToSupportScreen.bind(this);
        this.handleTagsBottomSheet = this.handleTagsBottomSheet.bind(this);
    }

    componentDidMount(){
        this.callApis();
    }

    async callApis(){
        let {user} = this.props; 
        console.log("accessToken", user?.accessToken)
        try {
            const [shopStatusResponse, carouselsResponse ] = await Promise.all([
                getShopStatus(user?.accessToken), getCarousels(user?.accessToken)
            ]);
            const shopStatusJson = await shopStatusResponse.json();
            const carouselsJson = await carouselsResponse.json();
            this.setState({carousels: carouselsJson, shopOpen: shopStatusJson?.isOpen})

        } catch (error) {
            console.log(error);
        }
    }

    async openShop(){
        let {user} = this.props;
        try {
            const response = await openShop(user?.accessToken);
            const json = await response.json();
            console.log(json);
            this.setState({shopOpen: json?.isOpen});
        } catch (error) {
            console.log(error);
        }
    }

    async closeShop(){
        let {user} = this.props;
        try {
            const response = await closeShop(user?.accessToken);
            const json = await response.json();
            console.log(json);
            this.setState({shopOpen: json?.isOpen});
        } catch (error) {
            console.log(error);
        }
    }

    handleModal(){
        this.setState({modalVisible: !this.state.modalVisible});
    }

    handleTagsBottomSheet(){
        this.setState({tagBottomSheetVisible: !this.state.tagBottomSheetVisible});
    }

    async shareCard(){
        try {
            const shareResponse = await Share.open({
                message: 'Message',
                title: 'Title',
                url: 'https://www.npmjs.com/package/react-native-share'
            });
        } catch (error) {
            console.log(error);
        }
    }

    // handleShopStatus(){
    //     this.setState({shopOpen: !this.state.shopOpen});
    // }

    navigateToReferEarn(){
        let {navigation} = this.props;
        navigation.navigate('ReferEarn');
    }

    navigateToSupportScreen(){
        let {navigation} = this.props;
        navigation.navigate('Support');
    }

    navigateToMyOffers(){
        this.setState({modalVisible: false});
        let {navigation} = this.props;
        navigation.navigate('MyOffers');
    }

    triggerTagModal() {
        this.setState(prevState => {
          return {
            tagBottomSheetVisible: !prevState.tagBottomSheetVisible
          }
        });
     }


    renderTagBottomSheet(){
        return (
            <Modal 
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={this.state.tagBottomSheetVisible}
                onRequestClose={this.triggerTagModal}
                >
                <Pressable 
                    activeOpacity={1}
                    style={styles.addTagsBottomSheetContainer}
                    onPress={this.triggerTagModal}>

                    <KeyboardAvoidingView
                        style={{height: 400, position: 'absolute', width: '100%', bottom: 0}}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <AddTagsBottomSheet />
                    </KeyboardAvoidingView>
                </Pressable>
            </Modal>
        )
    }

    render(){
        let {shopOpen, carousels} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <HomeFab handleModal={this.handleModal}/>
                <Modal
                    statusBarTranslucent
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log(12)
                    }}>
                        <TouchableOpacity
                            activeOpacity={1} 
                            style={styles.modelContainer}
                            onPress={() => this.setState({modalVisible: false})}>
                           <View style={styles.modalItems}>
                                {/* <TouchableOpacity 
                                    style={styles.modalItem}
                                    activeOpacity={.9}>
                                    <View style={styles.modalIconContainer}>
                                        <MyShopIcon 
                                            width={18}
                                            height={18}
                                        />
                                    </View>
                                    <View style={styles.modalLabelContainer}>
                                        <Text style={styles.modalLabel}>
                                            Add new shop
                                        </Text>
                                    </View>
                                </TouchableOpacity> */}
                                <TouchableOpacity 
                                    style={styles.modalItem}
                                    activeOpacity={.9}
                                    onPress={this.navigateToMyOffers}>
                                    <View style={styles.modalIconContainer}>
                                        <MyShopIcon 
                                            width={18}
                                            height={18}
                                        />
                                    </View>
                                    <View style={styles.modalLabelContainer}>
                                        <Text style={styles.modalLabel}>
                                            Add Offer
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {/* <TouchableOpacity 
                                    style={styles.modalItem}
                                    activeOpacity={.9}>
                                    <View style={styles.modalIconContainer}>
                                        <MyShopIcon 
                                            width={18}
                                            height={18}
                                        />
                                    </View>
                                    <View style={styles.modalLabelContainer}>
                                        <Text style={styles.modalLabel}>
                                            Add Sale
                                        </Text>
                                    </View>
                                </TouchableOpacity> */}
                           </View>
                        </TouchableOpacity>
                </Modal>
                {this.state.tagBottomSheetVisible && this.renderTagBottomSheet()}
                <ScrollView>
                    <StatusBar backgroundColor={PRIMARY}/>
                    <HomeSlider carousels={carousels}/>
                    {/* <View style={styles.shareCardContainer}>
                        <TouchableOpacity 
                            style={styles.shareCard}
                            onPress={this.shareCard}>
                            <MaterialIcons 
                                name='card-giftcard'
                                size={26}
                                color={PRIMARY}
                            />
                            <View style={styles.cardLabelContainer}>
                                <Text style={styles.cardLabel}>Share your business card to get more customer!</Text>
                                <Text style={styles.cardButtonLabel}>Tap to share</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/> */}
                    {/* <View style={styles.addTagsCard}>
                        <TouchableOpacity 
                            style={styles.shareCard}
                            onPress={this.triggerTagModal}>
                            <Ionicons 
                                name='pricetag-outline'
                                size={26}
                                color={PRIMARY}
                            />
                            <View style={styles.cardLabelContainer}>
                                <Text style={styles.cardLabel}>Add Tags to your shops to make user search you</Text>
                                <Text style={styles.cardButtonLabel}>Tap to Add</Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <View
                                style={styles.button}>
                                <MyShopIcon 
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <Text style={styles.label}>My Shops</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress={this.navigateToMyOffers}>
                            <View
                                style={styles.button}>
                                <OfferIcon 
                                    width={24}
                                    height={24}
                                />
                            </View>
                            <Text style={styles.label}>My Offers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={this.navigateToSupportScreen} 
                            style={styles.support}>
                            <SupportIcon 
                                width={24}
                                height={24}/>
                            <Text style={styles.otherLabel}>Support and service</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.navigateToReferEarn} 
                            style={styles.referEarn}>
                            <SupportIcon 
                                width={24}
                                height={24}/>
                            <Text style={styles.otherLabel}>Refer and earn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.shopStatusRow}>
                        <Text style={styles.shopStatusLabel}>Your shop status</Text>
                        <Switch
                            style={styles.switchButton}
                            value={shopOpen}
                            thumbColor={shopOpen ? PRIMARY : 'lightgrey'}
                            onValueChange={shopOpen? this.closeShop : this.openShop}/>
                        <View style={Object.assign({...styles.shopStatus}, {backgroundColor: shopOpen? '#66bb6a': '#ff7043'})}>
                            <Text style={styles.shopStatusOtherLabel}>{shopOpen ? 'Opened': 'Closed'}</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(WithNetInfo(HomeScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15
    },
    button: {
        backgroundColor: PRIMARY,
        borderRadius: 25,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    label: {
        marginTop: 7,
        // fontFamily: 'Gilroy-Bold',
        fontWeight: '600',
        color: PRIMARY
    },
    support: {
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
        height: 70,
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        backgroundColor: 'rgba(227, 242, 253, .3)',
        shadowColor: 'rgba(227, 242, 253, 1)',
    },
    referEarn: {
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
        height: 70,
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        backgroundColor: 'rgba(227, 242, 253, .3)',
        shadowColor: 'rgba(227, 242, 253, 1)',
    },
    otherLabel: {
        color: PRIMARY,
        fontWeight: '500',
        fontSize: 13,
        marginTop: 5
    },
    line: {
        backgroundColor: 'lightgrey',
        height: 1
    },
    shopStatusLabel: {
        color: 'black',
        fontSize: 13
    },
    shopStatusRow: {
        padding: 10,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchButton: {
        marginLeft: 10
    },
    shopStatus: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    shopStatusOtherLabel: {
        fontSize: 13
    },
    shareCardContainer: {
        // height: 60
        padding: 20,
        paddingVertical: 10
    },
    addTagsCard: {
        padding: 20,
        paddingVertical: 10
        // height: 60
    },
    shareCard: {
        height: 70,
        borderRadius: 10,
        backgroundColor: '#00bcd4',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    cardLabelContainer: {
        marginLeft: 15
    },
    cardLabel: {
        color: 'white',

    },
    cardButtonLabel: {
        fontWeight: '500',
        color: 'white',
        fontSize: 15
    },
    modelContainer: {
        backgroundColor:'rgba(255, 255, 255, .8)', 
        height: '100%'
    },
    modalItems: {
        position: 'absolute',
        width: '100%',
        bottom: 70,
        zIndex: 10
    },
    modalItem: {
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: 20
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
    referEarn: {
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
        height: 70,
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 5,
        backgroundColor: 'rgba(227, 242, 253, .3)',
        shadowColor: 'rgba(227, 242, 253, 1)',
    },
    otherLabel: {
        color: PRIMARY,
        fontWeight: '500',
        fontSize: 13,
        marginTop: 5
    },
    line: {
        backgroundColor: 'lightgrey',
        height: 1
    },
    shopStatusLabel: {
        color: 'black',
        fontSize: 13
    },
    shopStatusRow: {
        padding: 10,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center'
    },
    switchButton: {
        marginLeft: 10
    },
    shopStatus: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    shopStatusOtherLabel: {
        fontSize: 13
    },
    shareCardContainer: {
        // height: 60
        padding: 20,
        paddingVertical: 10
    },
    addTagsCard: {
        padding: 20,
        paddingVertical: 10
        // height: 60
    },
    shareCard: {
        height: 70,
        borderRadius: 10,
        backgroundColor: '#00bcd4',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    cardLabelContainer: {
        marginLeft: 15
    },
    cardLabel: {
        color: 'white',

    },
    cardButtonLabel: {
        fontWeight: '500',
        color: 'white',
        fontSize: 15
    },
    modalLabelContainer: {
        marginLeft: 10,
        backgroundColor: '#F6FAFF',
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
        fontWeight: '400'
    },
    addTagsBottomSheetContainer: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        height: '100%'
    },
    bottomSheet: {
        flexWrap: 'wrap',
    }
})  
