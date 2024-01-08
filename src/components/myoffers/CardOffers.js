import { StyleSheet, Text, View,ImageBackground,Slider,Image } from 'react-native'
import React from 'react'
import {  LIGHTBLUE, PRIMARY, WHITE } from '../../assets/colors'
import { moderateScale,moderateScaleVertical,textScale, width } from '../../utils/responsiveSize'
//import { useState } from 'react'
//import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import imageLoading from '../../assets/images/image-loading.png'
import imageNotUploaded from '../../assets/images/image-not-uploaded.png'
import { buildLink } from '../../utils/deepLinkManager'
// function getNumberOfDays(start, end) {
//     const date1 = new Date(start);
//     const date2 = new Date(end);
//     const oneDay = 1000 * 60 * 60 * 24;
//     const diffInTime = date2.getTime() - date1.getTime();
//     const diffInDays = Math.round(diffInTime / oneDay);
//     return diffInDays;
// }
const CardOffers = ({item}) => {
    const {imageUrl,status,searchTags,title,description,startDate,endDate} = item 
    const [loading, setLoading] = React.useState(false);
    // const  newStartDate = moment(startDate).format('MM/DD/YY')
    // const newCurrentDate = moment(new Date()).format('MM/DD/YY')
    // const newEndDate = moment(endDate).format('MM/DD/YY') 
    // const EndDate = new Date(newEndDate).getTime() < new Date(newCurrentDate).getTime() ?  newCurrentDate : newEndDate
    // const totalDay =getNumberOfDays(newStartDate,newEndDate)
    // const endDay = getNumberOfDays(EndDate,newEndDate)
    // const startDay = getNumberOfDays(newStartDate,EndDate)
    ////const [value,setValue] = useState(startDay + (totalDay - endDay));
    //const total = totalDay
    //const left = totalDay - startDay < 0 ? 0 : value * (width-290)/total - 15;
    const shareCard = async () => {
        try {
        const link = await buildLink(item);
        await Share.open({
            message: `${title && title}\n${description && description}\n${link}`,
            title: description,
            url: imageUrl && imageUrl[0],
          });
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <View style={styles.offer}>
                <ImageBackground 
                    source={imageUrl[0] ? { uri: imageUrl && imageUrl[0] } : imageNotUploaded}
                    style={{...styles.image,display: loading ? 'none': 'flex'}}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}>
                        <View style={styles.share}>
                            <TouchableOpacity onPress={shareCard}>
                                <Ionicons name="share-social" size={24} color={'#fff'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{...styles.status,backgroundColor:status === 'ACTIVE' ? '#9DF9ACCC' : '#F9E5A1CC' }}>
                            <Text style={{...styles.statusLabel,color:status == 'ACTIVE' ? '#146F23' : '#957B23'}}>{status}</Text>
                        </View>
                    </ImageBackground>
                    <Image 
                            source={imageLoading}
                            style={{...styles.image,display:loading ? 'flex' : 'none'}}
                    />
            <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                <View style={styles.textContainer}>
                    <View style={styles.tags}>
                        {searchTags?.map((tag, index) => {
                            return(
                             <View style={styles.tag} key={index}>
                                <Text style={styles.tagLabel}>{tag}</Text>
                            </View>)
                        })}
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                {/* <View style={{width:160,margin:15}}>
                                    <Text style={ { width: 50, textAlign: 'center',left:left} }>{totalDay - startDay} left</Text>
                                    <Slider maximumValue={total} 
                                            value={value}
                                            disabled={true} 
                                            minimumTrackTintColor="#D50000"
                                            maximumTrackTintColor="#D50000"
                                            thumbTintColor="#1B5E20"
                                            onValueChange={value => setValue({ value })} />
                                            <View style={{flexDirection: 'row',
                                                    justifyContent: 'space-between'}}>
                                                <Text style={styles.colorGrey}>{moment(startDate).format('DD/MM')}</Text>
                                                <Text style={styles.colorGrey}>{moment(endDate).format('DD/MM')}</Text>
                                            </View>
                </View> */}
            </View>
                
        </View>
  )
}

export default CardOffers

const styles = StyleSheet.create({
    image: {
        height: moderateScale(110),
        width: '100%',
        flex: 1,
    },
    offer: {
        marginHorizontal:moderateScale(16),
       // marginTop:moderateScaleVertical(14),
        backgroundColor:WHITE,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        elevation:3
    },
    textContainer: {
        margin:moderateScale(10),
    },
    title: {
        color: 'black',
        fontWeight: '500',
        fontSize:textScale(16)
    },
    description: {
        color:'#4D535BCC',
        marginVertical:moderateScaleVertical(5),
        fontSize:textScale(14)
    },
    status: {
        alignSelf: 'flex-start',
        borderRadius: moderateScale(5),
        marginTop:moderateScale(40),
        marginHorizontal: moderateScale(10),
    },
    share: {
        //flexDirection: 'row', 
        alignSelf: 'flex-end',
        marginHorizontal:moderateScale(10),
        marginVertical:moderateScaleVertical(10)
    },
    statusLabel: {
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScaleVertical(3),
        fontSize: textScale(8),
        fontWeight:'600',
    },
    tag: {
        backgroundColor: LIGHTBLUE,
        height: moderateScale(20),
        paddingHorizontal: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: moderateScale(10),
        borderRadius:moderateScale(2)
    },
    tagLabel: {
        color:PRIMARY,
        fontWeight:'500',
        fontFamily: 'Gilroy-Medium',
        fontSize:textScale(8)
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:moderateScaleVertical(5)
    },
})