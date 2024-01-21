import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GREY, PRIMARY, WHITE} from '../../assets/colors';
import imageNotUploaded from '../../assets/images/image-not-uploaded.png';
import {moderateScale} from '../../utils/responsiveSize';

const OfferComponent = ({token, item, navigation, type}) => {
  const {_id, pics, title, extra, imageUrl, isFavourite, description} = item;
  // const [favourite, setFavourite] = useState(true);
  const [loading, setLoading] = React.useState(false);

  return (
    <View key={_id} activeOpacity={1} style={styles.card}>
      <Image
        source={imageUrl[0] ? {uri: imageUrl && imageUrl[0]} : imageNotUploaded}
        style={{...styles.image, display: loading ? 'none' : 'flex'}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      <View style={styles.body}>
        <View style={styles.content}>
          <Text style={styles.dealTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.dealExtra} numberOfLines={1}>
            {description}
          </Text>
        </View>
        <TouchableOpacity style={styles.icon} />
      </View>
    </View>
  );
};

export default OfferComponent;

const styles = StyleSheet.create({
  card: {
    height: moderateScale(180),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  icon: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    backgroundColor: WHITE,
    borderRadius: moderateScale(8),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY,
    padding: moderateScale(16),
  },
  content: {
    flex: 1,
  },
  brandIcon: {
    height: 48,
    width: 48,
  },
  dealTitle: {
    color: WHITE,
    fontFamily: 'Gilroy-Bold',
    fontSize: moderateScale(14),
  },
  dealExtra: {
    color: GREY,
    fontFamily: 'Gilroy-Medium',
    fontSize: moderateScale(12),
  },
});
