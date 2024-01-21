import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Share from 'react-native-share';
import {connect} from 'react-redux';
import {BLACK, LIGHTBLUE, PRIMARY} from '../assets/colors';
import ToastMessage from '../components/common/ToastComponent';
import {getReferCode, refer} from '../services/referearnService';
import {buildReferalLink} from '../utils/deepLinkManager';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../utils/responsiveSize';
import ReferCode from './../assets/images/refercode.png';
import ReferEarnImage from './../assets/images/referearn.png';

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

class ReferAndEarnScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      shopName: null,
      contactNumber: null,
      data: '',
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
    let {user} = this.props;
    try {
      const response = await getReferCode(user?.accessToken);
      this.setState({data: response});
      //this.setState({ shopOpen: json?.isOpen });
    } catch (error) {
      console.log(error);
    }
  }
  async shareCard() {
    try {
      const message = `Hi, I just invited you to Fydo!\nStep 1: Use my link to download the app.\nStep 2: Use my referral code ${
        this.state.data.referralCode && this.state.data.referralCode
      } while signing up.\nStep 3: Start exploring offers, deals and much more in your city.\n\nDownload the app now.`;
      const link = await buildReferalLink(
        this.state.data.referralCode && this.state.data.referralCode,
        message && message,
      );
      await Share.open({
        message: `Hi, I just invited you to Fydo!\nStep 1: Use my link to download the app.\nStep 2: Use my referral code ${
          this.state.data.referralCode && this.state.data.referralCode
        } while signing up.\nStep 3: Start exploring offers, deals and much more in your city.\n\nDownload the app now.\n${
          link && link
        }`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async onReferClick() {
    let {user} = this.props;
    let {shopName, contactNumber} = this.state;
    try {
      this.setState({loading: true});
      const response = await refer(user?.accessToken, shopName, contactNumber);
      if (response) {
        ToastMessage({message: 'Successfully refer'});
        this.setState({shopName: null, contactNumber: null});
      }
      this.setState({loading: false});
    } catch (error) {
      console.log(error);
      this.setState({loading: false});
      ToastMessage({message: 'Something went wrong'});
    }
  }

  handleShopName(value) {
    this.setState({shopName: value});
  }

  handleContactNumber(value) {
    this.setState({contactNumber: value});
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Refer your customers and earn upto &#8377;15.
        </Text>
        <Text style={styles.subtitle}>
          You will receive the reward as soon they add money to their wallet.
        </Text>
        <Image source={ReferEarnImage} style={styles.image} />
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

        <TouchableOpacity style={styles.card} onPress={this.shareCard}>
          <View style={styles.subView} />
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>Share your referral code</Text>
            <Text style={styles.cardButtonLabel}>
              Referral code:{' '}
              {this.state.data.referralCode && this.state.data.referralCode}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <Image source={ReferCode} style={styles.phoneIcon} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(ReferAndEarnScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: PRIMARY,
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
  },
  subtitle: {
    marginVertical: 10,
    color: BLACK,
    fontFamily: 'Gilroy-Medium',
    textAlign: 'center',
  },
  image: {
    height: 150,
    width: '60%',
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginVertical: 10,
  },
  card: {
    borderRadius: moderateScale(16),
    backgroundColor: LIGHTBLUE,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 3,
    marginTop: moderateScale(16),
  },
  cardBody: {
    padding: moderateScale(16),
  },
  cardFooter: {
    marginLeft: 'auto',
  },
  cardLabel: {
    color: BLACK,
    fontSize: textScale(14),
    fontFamily: 'Gilroy-Bold',
    textTransform: 'capitalize',
  },
  cardButtonLabel: {
    fontFamily: 'Gilroy-Medium',
    color: BLACK,
    fontSize: textScale(12),
    marginTop: moderateScaleVertical(8),
  },
  subView: {
    backgroundColor: PRIMARY,
    width: moderateScale(16),
    height: '100%',
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  phoneIcon: {
    margin: moderateScale(8),
  },
});
