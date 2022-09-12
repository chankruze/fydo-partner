import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid,View} from 'react-native';
import { connect } from 'react-redux';
import { BLACK, PRIMARY, WHITE } from '../assets/colors';
import { getReferCode, refer } from '../services/referearnService';
import { moderateScale, moderateScaleVertical, textScale, width } from '../utils/responsiveSize';
import ReferEarnImage from './../assets/images/referearn.png';
import ReferCode from './../assets/images/refercode.png';
import { buildReferalLink } from '../utils/deepLinkManager';
import Share from 'react-native-share';

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class ReferAndEarnScreen extends Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            shopName: null,
            contactNumber: null,
            data:''
        };
        this.onReferClick = this.onReferClick.bind(this);
        this.handleShopName = this.handleShopName.bind(this);
        this.handleContactNumber = this.handleContactNumber.bind(this);
        this.shareCard = this.shareCard.bind(this);
    }
    componentDidMount() {
        this.onReferCode();
    }
    async onReferCode() {
        let { user } = this.props;
        try {
          const response = await getReferCode(user?.accessToken);
          const json = await response.json();
          console.log('json--',json)
          this.setState({data:json})
          //this.setState({ shopOpen: json?.isOpen });
        } catch (error) {
          console.log(error);
        }
      }
      async shareCard() {
        try {
            console.log('data==>',this.state.data)
            const message = `Hi, I just invited you to Fydo!\nStep 1: Use my link to download the app.\nStep 2: Use my referral code ${this.state.data.referralCode && this.state.data.referralCode} while signing up.\nStep 3: Start exploring offers, deals and much more in your city.\n\nDownload the app now.`
            const link = await buildReferalLink(this.state.data.referralCode && this.state.data.referralCode,message && message)
            await Share.open({
                message:`Hi, I just invited you to Fydo!\nStep 1: Use my link to download the app.\nStep 2: Use my referral code ${this.state.data.referralCode && this.state.data.referralCode} while signing up.\nStep 3: Start exploring offers, deals and much more in your city.\n\nDownload the app now.\n${link && link}`,
            });
        } catch (error) {
          console.log(error);
        }
      }
    async onReferClick(){
        let {user} = this.props;
        let {shopName, contactNumber} = this.state;
        try {
            this.setState({loading: true});
            const response = await refer(user?.accessToken, shopName, contactNumber);
            const json = await response.json();
            if(json){
                ToastAndroid.show('Successfully refer', ToastAndroid.SHORT);
                this.setState({shopName: null, contactNumber: null})
            }
            this.setState({loading: false});
        } catch (error) {
            console.log(error);
            this.setState({loading: false});
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
    }

    handleShopName(value){
        this.setState({shopName: value});
    }

    handleContactNumber(value){
        this.setState({contactNumber: value});
    }
    render(){
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Refer your nearby merchant and earn upto &#8377;100.</Text>
                <Text style={styles.label}>You will receive the reward as soon as the merchant add money to their wallet.</Text>
                <Image
                    source={ReferEarnImage} 
                    style={styles.image}
                />
                {/* <TextInput 
                    style={styles.input}
                    onChangeText={this.handleShopName}
                    placeholder="Shop name"
                    placeholderTextColor="gray"
                    value={this.state.shopName}
                />
                <TextInput 
                    style={styles.input}
                    onChangeText={this.handleContactNumber}
                    placeholder="Shop contact number"
                    placeholderTextColor="gray"
                    keyboardType="phone-pad"
                    value={this.state.contactNumber}
                    maxLength={10}
                />
                <TouchableOpacity 
                    activeOpacity={.8}
                    onPress={this.onReferClick}
                    style={styles.button}>
                        {this.state.loading && <ActivityIndicator size="small" color="white"/>}
                        {!this.state.loading && <Text style={styles.buttonLabel}>Refer</Text>}
                </TouchableOpacity> */}
                <View style={styles.CardContainer}>
                    <TouchableOpacity style={styles.Card} onPress={this.shareCard} >
                        <View style={{alignItems:'center',flexDirection:'row'}}>
                        <View style={styles.subView} />
                            <View style={styles.cardLabelContainer}>
                                <Text  style={styles.cardLabel}>
                                    Share your referral code
                                </Text>
                                <Text style={styles.cardButtonLabel}>Referral code: {this.state.data.referralCode && this.state.data.referralCode}</Text>
                            </View>
                        </View>
                        <View style={{alignSelf:'flex-end',padding:moderateScale(10)}}>
                            <Image
                                source={ReferCode}
                                style={{height:moderateScale(80),width:moderateScale(90)}}
                            />
                        </View>
                    </TouchableOpacity>
          </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(ReferAndEarnScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 25
    },
    title: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        letterSpacing: .3
    },
    label: {
        marginVertical: 10,
        color: 'black',
        letterSpacing: .3
    },
    image: {
        height: 150,
        width: '60%',
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginVertical: 10
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginVertical: 10,
        borderRadius: 5,
        fontSize: 15,
        paddingHorizontal: 10
    },
    button: {
        width: 200,
        backgroundColor: PRIMARY,
        alignSelf: 'center',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginVertical: 10
    },
    buttonLabel: {
        color: 'white',
        fontSize: 15,
    },
    CardContainer: {
        padding: moderateScale(2),
        paddingVertical: moderateScaleVertical(10),
      },
      Card: {
        height: moderateScale(100),
        borderRadius: moderateScale(10),
        backgroundColor: WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
       // paddingHorizontal: moderateScale(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation:3
      },
      cardLabelContainer: {
        marginLeft: moderateScale(15),
      },
      cardLabel: {
        color: BLACK,
        fontSize: textScale(14),
        fontWeight:'500',
        fontFamily: 'Gilroy-Medium'
      },
      cardButtonLabel: {
        fontFamily: 'Gilroy-Medium',
        letterSpacing: 0.3,
        color: BLACK,
        fontSize: textScale(10),
        marginTop:moderateScaleVertical(5)
      },
      subView: {
        backgroundColor: PRIMARY,
        width: moderateScale(20),
        height: moderateScale(100),
       borderTopLeftRadius: moderateScale(10),
       borderBottomLeftRadius: moderateScale(10)
    },

})