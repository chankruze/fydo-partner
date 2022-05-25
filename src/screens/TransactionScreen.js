import { SafeAreaView, StyleSheet, Text, View,StatusBar,ActivityIndicator,FlatList,RefreshControl } from 'react-native'
import React,{useEffect,useState} from 'react'
import { height, moderateScaleVertical, textScale,moderateScale } from '../utils/responsiveSize'
import { BLACK, PRIMARY, WHITE } from '../assets/colors'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import { getTransaction, getTransactionAmount } from '../services/transactionService'

const TransactionScreen = ({user}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total,setTotal] = useState(0);
    const [isLast, setLast] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        apiTransactionAmonut()
        apiTransactionHit()
    }, [])
      const apiTransactionAmonut = async () => {
          try {
            const response = await getTransactionAmount(user?.accessToken);
            const json = await response.json();
            console.log('json amount-->',json)
          } catch(error) {
              console.log('error-->',error)
          }
      }
      const apiTransactionHit = async () => {
        try {
          if(!isLast){
            const response = await getTransaction(user?.accessToken,limit,skip);
            const json = await response.json();
            console.log('json-->',json)
              setData([...data,...json])
              setSkip(skip + limit);
              setLoading(false);
              setLast(
                  json.length == 0 || json.length < limit ? true : false);
              setRefreshing(false);
          }
        } catch (error) {
            console.log('error raised', error)
            setLoading(false);
        }
      }
      const renderItem = ({item}) => {
        return (
            <>
          <View style={styles.itemWrapper}>
            <View style={styles.cardWrapper}>
                <View style={styles.leftWrapper}>
                    <Text>SUCCESS</Text>
                </View>
                <View style={styles.rightWrapper}>
                    <Text>hii</Text>
                </View>
              </View>
                <View style={styles.cardWrapper}>
                        <View style={styles.leftWrapper}>
                            <View style={{...styles.icon, backgroundColor: '#003579'}}>
                                <MaterialIcons style={styles.iconContent} name='account-balance-wallet'/>
                            </View>
                                <View>
                                    <Text style={{...styles.titleText}}>Transaction Id:</Text>
                                    <Text style={styles.primaryText}>{item?.linkedTransaction}</Text>
                                </View>
                        </View>
                        <View style={styles.rightWrapper}>
                            <Text style={{...styles.titleText}}>{'\u20B9'}{item?.totalAmount}</Text>
                        </View>
                </View>
                <Text style={{alignSelf:'flex-end'}}>hii</Text>
            </View>
            </>
        )
      }
      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      const handlRefresh = React.useCallback (() => {
            setRefreshing(true);
            setTimeout(() => {
            apiTransactionHit()
          }, 2000)
            wait(2000).then(() => setRefreshing(false))
      },[])
    
      const onEndReached = () => {
            setSkip(0);
            setLast(true)
            setRefreshing(false);
            apiTransactionHit()
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
  return (
      <View style={styles.container}>
   <SafeAreaView style={{flex:1}}>
   <StatusBar 
                backgroundColor={PRIMARY}
                barStyle="light-content" 
              />
      <LinearGradient
      colors={['#003579', '#2D65AE']}
      style={{
        width:'100%',
        paddingVertical:moderateScaleVertical(25),
        position:'relative',
    }}>
        <View style={{justifyContent:'center',alignItems:'center',textAlign:'center',marginBottom:moderateScaleVertical(20)}}>
            <Text style={{fontSize:textScale(18),color:WHITE,marginVertical:moderateScaleVertical(5)}}>Amount to Settle</Text>
            <Text style={{fontSize:textScale(50),fontFamily:'Gilroy-Medium',color:WHITE,marginBottom:moderateScaleVertical(15)}}>{'\u20B9'} 1200</Text>
            {/* <Text style={{fontSize:textScale(12),color:WHITE,marginBottom:moderateScaleVertical(15)}}>Total Number of Payments 23</Text> */}
        </View>
    </LinearGradient>
    <View style={{marginHorizontal:moderateScale(15)}}>
    <FlatList
                        contentContainerStyle={{paddingBottom:moderateScaleVertical(230),marginTop:moderateScaleVertical(15)}}
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
export default connect(mapStateToProps)(TransactionScreen) 

const styles = StyleSheet.create({
    container: { 
        flex:1,
        position:'relative',
        backgroundColor:WHITE
    },
    lineStyle:{
        marginVertical:moderateScaleVertical(5)
    },
    itemWrapper:{
        backgroundColor: WHITE,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      padding:moderateScale(16),
      borderRadius:moderateScale(4),
      margin:2
    },
    cardWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightWrapper:{
        alignItems:'flex-end'
    },
    info: {
      fontSize:textScale(12),
      color:'#4D535BCC',
    },
    primaryText: {
        fontSize: textScale(12),
        fontFamily:'Gilroy-Medium',
        color:BLACK
    },
    iconContent: {
        flex: 1,
        //paddingVertical: moderateScaleVertical(5),
        fontSize: textScale(24),
        fontFamily:'Gilroy-Bold',
        color: WHITE,
        //marginHorizontal: moderateScale(5),
        justifyContent:'center'
    },
    icon:{
        borderRadius:moderateScale(25),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(15),
        padding: moderateScale(10)
    },
})