import dynamicLinks from '@react-native-firebase/dynamic-links';
// import { getReferralText } from '../services/referralService';
// import { fetchMyReferCode } from '../services/transactionService';
// import { DeepLinkTypes } from './DeepLinkTypes';

export async function buildLink(type, id, data) {
  console.log("buildLink", data)
  const link = await dynamicLinks().buildShortLink({
    link: `https://play.google.com/store/apps/details?id=com.letsdevelopit.lfydnewapp`,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://fydo.page.link',
   // domainUriPrefix: 'https://lfydnewapp.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    android: {
      packageName: 'com.letsdevelopit.lfydcustomer',
    },
    ios: {
      bundleId: 'org.reactjs.native.example.fydopartner',
      appStoreId: '1612594091'
    },
    social: {
      imageUrl: data?.imageUrl,
      title: data?.title,
      descriptionText: data?.description,
    }
  });

  return link;
}

export async function buildReferalLink(referralCode,referralText) {
  try {
    const link = await dynamicLinks().buildShortLink({
      link: `https://play.google.com/store/apps/details?id=com.letsdevelopit.lfydnewapp&referalCode=${referralCode}`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://fydo.page.link',
      //domainUriPrefix: 'https://lfydnewapp.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      android: {
        packageName: 'com.letsdevelopit.lfydcustomer',
      },
      ios: {
        bundleId: 'org.reactjs.native.example.fydopartner',
        appStoreId: '1612594091'
      },
      social: {
        imageUrl: 'https://fydoprod.s3.ap-south-1.amazonaws.com/REFER_AND_EARN/refer-and-earn',
        descriptionText: `${referralText && referralCode}\n${link}`,
      }
    });
  
    return link;
  } catch (error) {
    console.log(error)
  }
}