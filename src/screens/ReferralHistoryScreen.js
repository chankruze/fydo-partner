import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, ActivityIndicator,RefreshControl,StatusBar } from 'react-native';
import React,{useState} from 'react'
import { BLACK, PRIMARY, WHITE } from '../assets/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { getRefer } from '../services/referearnService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import moment from 'moment';

const ReferralHistoryScreen = ({user}) => {
  const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total,setTotal] = useState(0);
    const [isLast, setLast] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
  React.useEffect(() => {
    apiHit()
  }, [])
  const apiHit = async () => {
    try {
      if(!isLast){
        const response = await getRefer(user?.accessToken,limit,skip);
        const json = await response.json();
        console.log('json-->',json.referrals)
          setData([...data,...json.referrals])
          setTotal(json.total)
          setSkip(skip + limit);
          setLoading(false);
          setLast(
              json?.referrals.length == 0 || json?.referrals.length < limit ? true : false);
          setRefreshing(false);
      }
    } catch (error) {
        console.log('error raised', error)
        setLoading(false);
    }
  }
const  shortName = (str1) => {
  if (str1) {
      var split_names = str1.trim().split(" ");
      if (split_names.length > 1) {
          return (split_names[0].charAt(0) + split_names[split_names.length - 1].charAt(0));
      }
      return split_names[0].charAt(0);
  }
};
  const renderItem = ({item}) => {
    return (
      <View style={styles.flatStyle}>
        <View style={{flexDirection:'row',alignContent:'center'}}>
          <View style={styles.card}>
            <View style={styles.infoContainer}>
                <View style={{...styles.icon, backgroundColor: '#003579'}}>
                  <Text style={styles.iconContent}>{item?.referredUser?.name && shortName(item?.referredUser?.name && item?.referredUser?.name)}{item?.referredShop?.name && shortName(item?.referredShop?.name && item?.referredShop?.name)}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View>
                      <Text style={{...styles.titleText,marginBottom:moderateScaleVertical(5)}}>Referred {item?.referredUser?.name && 'User'} {item?.referredShop?.name && 'Shop'}</Text>
                      <Text style={styles.primaryText}>{item?.referredUser?.name && item?.referredUser?.name} {item?.referredShop?.name && item?.ActivityIndicatorreferredShop?.name}</Text>
                    </View>
                    <View style={{marginHorizontal:moderateScale(25)}}>
                      <Text style={{...styles.titleText,marginBottom:moderateScaleVertical(5)}}>Referred on</Text>
                      <Text style={styles.primaryText}>{moment(item?.createdAt).format('DD-MM-YYYY')}</Text>
                    </View>
                </View>
            </View>
          </View>
         </View>
      </View>
    )
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const handlRefresh = React.useCallback (() => {
        setRefreshing(true);
       setTimeout(() => {
        apiHit()
      }, 2000)
        wait(2000).then(() => setRefreshing(false))
  },[])

  const onEndReached = () => {
      setSkip(0);
      setLast(true)
     setRefreshing(false);
      apiHit()
  }
  if (loading) {
    return (
        <View style={styles.container}>
          <StatusBar 
            backgroundColor={PRIMARY}
            barStyle="light-content" 
          />
          <SafeAreaView>
              <ActivityIndicator size="large" color={PRIMARY} />
            </SafeAreaView>
        </View>
    )
}
if(data?.length === 0){
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{flex:1}}>
                      <View style={{
                        marginTop:moderateScaleVertical(15),
                        marginHorizontal: moderateScale(16),
                      }}>
                          <Text style={styles.referralTitle}>Total Referral {''} {total && total}</Text>
                      </View>
                      <View style={styles.loaderContainer}>
                        <FontAwesome name={'paper-plane'} size={40} color={'#4D535BCC'} style={{marginBottom:moderateScaleVertical(10)}}/>
                          <Text style={styles.info}>
                            Share your referral code to get referrals
                          </Text>
                        </View>
                    </SafeAreaView>
                </View>
            )
  }
  return (
  <View style={styles.container}>
     <StatusBar 
        backgroundColor={PRIMARY}
        barStyle="light-content" 
      />
     <SafeAreaView style={{flex:1, backgroundColor: WHITE }}>
        <View style={{
            marginTop:moderateScaleVertical(15),
            marginHorizontal: moderateScale(16),
            flex:1
        }}>
            <Text style={styles.referralTitle}>Total Referral {total && total}</Text>
            <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id}
                        ItemSeparatorComponent={() => <View style={styles.lineStyle} />}
                        onEndReachedThreshold={0.01}
                        onMomentumScrollBegin={() => {
                            onEndReachedMomentum = false
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handlRefresh}
                                tintColor={PRIMARY}
                            />
                        }
                        ListFooterComponent={
                           !isLast &&(<View style={{ marginTop: moderateScaleVertical(20) }}>
                                <ActivityIndicator color={PRIMARY} size="large" />
                            </View>)
                        }
                        onEndReached={onEndReached}
                    />
        </View>
    </SafeAreaView>
  </View>
  )
}

const mapStateToProps = (state) => {
  return {
      user: state?.userReducer?.user
  }
}
export default  connect(mapStateToProps)(ReferralHistoryScreen)

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:WHITE
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  referralTitle: {
    fontSize:textScale(20),
    color:'#4D535BCC',
    marginBottom:moderateScaleVertical(10)
  },
  flatStyle:{
      backgroundColor: WHITE,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      //padding:moderateScale(16),
      borderRadius:moderateScale(4),
      margin:2
  },
  flexView: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent:'space-between'
  },
  card: {
    padding: 10,
    margin: 5
  },
  infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 2
  },
  info: {
    fontSize:textScale(12),
    color:'#4D535BCC',
  },
  primaryText: {
      fontSize: textScale(16),
      fontFamily:'Gilroy-Medium',
      color:BLACK
  },
  titleText: {
      fontSize:textScale(14),
      color:'#4D535B99'
  },
  iconContent: {
      flex: 1,
      paddingVertical: moderateScaleVertical(5),
      fontSize: textScale(24),
      fontFamily:'Gilroy-Bold',
      color: WHITE,
      marginHorizontal: moderateScale(5),
      justifyContent:'center'
  },
  icon:{
      borderRadius: 25,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
      padding: moderateScale(5)
  },
  lineStyle:{
    marginVertical:moderateScaleVertical(5)
  }
})