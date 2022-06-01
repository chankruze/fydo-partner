import moment from 'moment';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, ActivityIndicator, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { GREY_2, PRIMARY, WHITE } from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';
import { getNotifications } from '../services/notificationService';
import { moderateScale, moderateScaleVertical, textScale } from '../utils/responsiveSize';

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class NotificationScreen extends Component {

    constructor() {
        super();
        this.state = {
            notifications: [],
            limit: 10,
            skip: 0,
            isLast: false,
            refreshing: false,
            loading: false,
        }
        this.fetchNotifications = this.fetchNotifications.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.fetchNotifications();
    }

    async fetchNotifications() {
        let { user } = this.props;
        let {limit,skip,isLast} = this.state;
        try {
            if(!isLast){
            const response = await getNotifications(user?.accessToken,limit,skip);
            const json = await response.json();
            console.log("gg-->", json);
                this.setState({ 
                    notifications:[...this.state.notifications, ...json],
                    skip: skip + limit,
                    loading: false,
                    isLast: json.length == 0 || json.length < limit ? true : false,
                    refreshing: false,
                });
            }
            else{
                this.setState({loading: false, refreshing: false })
            }
        } catch (error) {
            console.log(error);
            this.setState({ loading: false,refreshing:false });
        }
    }
    handlRefresh = () =>{
        this.setState({
            refreshing: true
        });
       this.fetchNotifications();
    }

    onEndReached = () =>{
        this.setState({
            isLast:true,
            refreshing:false
        })
       this.fetchNotifications()
    }
    renderNotification({ item }) {
        let { notificationBody, createdAt } = item;
        return (
            <View style={styles.notification}>
                <Text style={styles.title}>{notificationBody?.title}</Text>
                <Text style={styles.body}>{notificationBody?.body}</Text>
                <Text style={styles.time}>{moment(createdAt).local().startOf('seconds').fromNow()}</Text>
            </View>
        )
    }

    render() {
        let { notifications, loading } = this.state;

        if (loading) {
            return (
                <SafeAreaView style={styles.container}>
                    <ActivityIndicator
                        color={PRIMARY}
                        size="large"
                    />
                </SafeAreaView>
            )
        }

        if (notifications.length == 0) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.info}>We have no item to show here</Text>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                contentContainerStyle={{marginTop: moderateScaleVertical(15),paddingBottom:moderateScaleVertical(20)}}
                    showsVerticalScrollIndicator={false}
                    data={notifications}
                    renderItem={this.renderNotification}
                    ItemSeparatorComponent={() => <View style={styles.lineStyle} />}
                    keyExtractor={item => item?._id.toString()}
                    onEndReachedThreshold={0.01}
                    onMomentumScrollBegin={() => {
                        onEndReachedMomentum = false
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.handlRefresh}
                            color={PRIMARY}
                        />
                    }
                    ListFooterComponent={
                       !this.state.isLast && (<View style={{ marginTop: moderateScaleVertical(20) }}>
                            <ActivityIndicator color={PRIMARY} size="large" />
                        </View>)
                    }
                    onEndReached={this.onEndReached}
                />
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(NotificationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:WHITE
    },
    info: {
        alignSelf: 'center',
        marginTop:  moderateScaleVertical(15),
        fontSize: textScale(16),
        letterSpacing: .2,
        fontFamily: 'Gilroy-Bold'
    },
    notification: {
        borderColor: GREY_2,
        borderWidth: 1,
        borderRadius: moderateScale(10),
        padding: moderateScale(15),
        //marginVertical: 8,
        marginHorizontal: moderateScale(10)
    },
    title: {
        // fontWeight: '400',
        color: 'black',
        fontSize: textScale(16),
        fontFamily: 'Gilroy-SemiBold',
        lineHeight: 20
    },
    body: {
        paddingTop: moderateScaleVertical(5),
        color: 'black',
        fontSize: textScale(14),
        fontFamily: 'Gilroy-Medium',
        lineHeight: 20
    },
    time: {
        color: GREY_2,
        fontSize:  textScale(10),
        alignSelf: 'flex-end',
        fontWeight: '400'
    },
    separator: {
        borderBottomWidth: .4,
        width: '100%',
        borderBottomColor: 'rgba(0, 53, 121, 0.2)',
        marginTop: moderateScaleVertical(10)
    },
    lineStyle:{
        marginBottom:moderateScaleVertical(8)
    }
})
