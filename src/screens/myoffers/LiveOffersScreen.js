import React, {Component} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View,RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import {  PRIMARY, WHITE } from '../../assets/colors';
import CardOffers from '../../components/myoffers/CardOffers';
import { getOffers } from '../../services/offerService';
import { moderateScaleVertical, textScale } from '../../utils/responsiveSize';

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class LiveOffersScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            offers: [],
            isLoading: false,
            isRefresh: false,
            loadeMore: false,
            limit: 10,
            skip: 0,
        }
        this.onEndReached = this.onEndReached.bind(this)
        this.handlRefresh = this.handlRefresh.bind(this)
    }

    componentDidMount(){
        this.fetchOffers(true);
    }

    async fetchOffers(val,loadeMore){
        let {user} = this.props;
        if (loadeMore) {
            this.setState({ loadeMore: true })
        }
        if (val) {
            this.setState({ isLoading: true })
        }
        else {
            this.setState({ isRefresh: true })
        }
        try {
            const activeJson = []
            let {limit,skip} = this.state;
            const response = await getOffers(user?.accessToken,limit,skip);
            const json = await response.json();
            json.filter((data)=> {
                if(data.status == 'ACTIVE'){
                    activeJson.push(data)
                }
            })
            this.setState({
                offers:[...this.state.offers, ...activeJson],
                isLoading: false,
                isRefresh: false,
                skip: skip + limit,
                loadeMore: false,
            })
        } catch (error) {
            console.log(error);
            this.setState({loading: false});
        }
    }
    renderItem({item}){
        return (
            <CardOffers item={item}/>
        )
    }
    handlRefresh(){
        this.fetchOffers(false)
     }
 
     onEndReached(){
        this.fetchOffers(false, true)
     }
    render(){

        let {offers, loading} = this.state;

        if(loading){
            return (
                <View style={styles.liveContainer}>
                    <SafeAreaView>
                        <ActivityIndicator 
                            size="large" 
                            color={PRIMARY}
                        />
                    </SafeAreaView>
                </View>
            )
        }

        if(offers.length == 0)
            return (
                <View style={styles.liveContainer}>
                    <SafeAreaView>
                        <Text style={styles.info}>
                            We have no item to show here
                        </Text>
                    </SafeAreaView>
                </View>
            )

        return (
            <View style={styles.liveContainer}>
                <SafeAreaView>
                <FlatList 
                    contentContainerStyle={{paddingBottom:moderateScaleVertical(90),marginTop:moderateScaleVertical(15)}}
                    showsVerticalScrollIndicator={false}
                    data={offers}
                    keyExtractor={item => item?._id.toString()}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    onEndReachedThreshold={0.01}
                    onMomentumScrollBegin={() => {
                        onEndReachedMomentum = false
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={this.handlRefresh}
                            color={PRIMARY}
                        />
                    }
                    ListFooterComponent={
                       this.state.loadeMore && (<View style={{ marginTop: moderateScaleVertical(20) }}>
                            <ActivityIndicator color={PRIMARY} size="large" />
                        </View>)
                    }
                    onEndReached={this.onEndReached}
                />
                </SafeAreaView>
                </View>
        )
    }
}

export default connect(mapStateToProps)(LiveOffersScreen);

const styles = StyleSheet.create({
    liveContainer: {
        flex: 1,
        backgroundColor: WHITE,
    },
    info: {
        alignSelf: 'center',
        marginTop: moderateScaleVertical(14),
        fontWeight: 'bold',
        fontSize: textScale(16),
        letterSpacing: .2
    },
    separator: {
        marginBottom:moderateScaleVertical(10)
     },
})