import { Dimensions, StyleSheet, TouchableOpacity, Image, View, Text, ToastAndroid, Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LIGHTGREY } from '../../assets/colors';
import imageLoading from '../../assets/images/image-loading.png'
import imageNotUploaded from '../../assets/images/image-not-uploaded.png'
import React, {useState} from 'react'
import { moderateScale } from '../../utils/responsiveSize';

const WIDTH = Dimensions.get('screen').width;

const OfferComponent = ({token, item, navigation, type}) => {
  const { _id, pics, title, extra, imageUrl, isFavourite, description } = item;
  const [favourite, setFavourite] = useState(true)
  const [loading, setLoading] = React.useState(false);
  return (
    <Shadow
    distance={1}
    radius={10}
    startColor={'rgba(13,61,131,0.02)'}
    finalColor='rgba(13,61,131,0.02)'
    offset={[0, 1]}
    viewStyle={{
        paddingVertical: 5,
        paddingHorizontal: 5,
    }}>
    <TouchableOpacity
        key={_id}
        activeOpacity={1}
        style={styles.listItem}
        >
        <Image
            source={imageUrl[0] ? { uri: imageUrl && imageUrl[0] } : imageNotUploaded}
            style={{...styles.image,display: loading ? 'none': 'flex'}}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
        /><Image 
        source={imageLoading}
        style={{...styles.image,display:loading ? 'flex' : 'none'}}
        />
        <View style={styles.content}>
            <Text style={styles.dealTitle} numberOfLines={1}>{title}</Text>
            <Text style={styles.dealExtra} numberOfLines={1}>{description}</Text>
            <TouchableOpacity
                style={styles.icon}
                >
                
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
</Shadow>
  )
}

export default OfferComponent

const styles = StyleSheet.create({
  listItem: {
      width: WIDTH - 60,
      height: 170,
      backgroundColor: 'white',
      // marginTop: 12,
      // marginBottom: 10,
      borderRadius: 4,
      // shadowColor: 'gray',
      // shadowOpacity: 0.26,
      // shadowOffset: { width: 0, height: 5 },
      // shadowRadius: 10,
      // elevation: 5,
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden'
  },
  image: {
    height: moderateScale(110),
    width: '100%',
      // borderRadius: 10,
      //resizeMode: 'stretch',
  },
  icon: {
      position: 'absolute',
      right: 5,
      marginVertical: 5,
      paddingHorizontal: 15,
      paddingVertical: 8,
      // backgroundColor: 'rgba(254, 56, 56, 0.2)',
      borderRadius: 4
  },
  content: {
      flex: 1,
      justifyContent: 'center',
      position: 'absolute',
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: '100%',
      bottom: 0,
      height: 'auto'
  },
  brandIcon: {
      height: 43,
      width: 43
  },
  dealTitle: {
      color: 'rgba(97, 90, 90, 0.65)',
      // fontWeight: '700',
      fontFamily: 'Gilroy-Semibold',
      fontSize: 10,
      lineHeight: 12,
      width: '70%',
  },
  dealExtra: {
      color: '#000000',
      fontFamily: 'Gilroy-Medium',
      fontSize: 14,
      lineHeight: 18,
      width: '70%',
      // fontWeight: '300'
  }
})