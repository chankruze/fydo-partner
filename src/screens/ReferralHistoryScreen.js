import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, ActivityIndicator,RefreshControl,StatusBar } from 'react-native';
import React,{useState} from 'react'
import { PRIMARY, WHITE } from '../assets/colors'
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize'
import { getRefer } from '../services/referearnService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import WithNetInfo from '../components/hoc/withNetInfo';
import ReferralCard from '../components/Referral/ReferralCard';

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

  const renderItem = ({item}) => {
    return (
      <ReferralCard item={item}/>
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
                          <Text style={styles.referralTitle}>Total Referral {total && total}</Text>
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
            marginHorizontal: moderateScale(12),
            flex:1
        }}>
            <Text style={{...styles.referralTitle,}}>Total Referral {total && total}</Text>
            <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item._id}
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
export default  connect(mapStateToProps)(WithNetInfo(ReferralHistoryScreen))

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
    fontFamily:'Gilroy-Medium',
    marginBottom:moderateScaleVertical(10)
  },
  info: {
    fontSize:textScale(12),
    fontFamily:'Gilroy-Medium',
    color:'#4D535BCC',
  },
  
  lineStyle:{
    marginVertical:moderateScaleVertical(5)
  },
})