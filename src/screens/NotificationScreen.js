import moment from 'moment';
import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
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

const NotificationScreen = ({ user }) => {

    const [notifications, setNotifications] = useState([]);
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [isLast, setLast] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            if (!isLast) {
                const response = await getNotifications(user?.accessToken, limit, skip);
                setNotifications([...notifications, ...response])
                setSkip(skip + limit)
                setLoading(false)
                setLast(response.length == 0 || response.length < limit ? true : false)
                setRefreshing(false)
            }
            else {
                setLoading(false)
                setRefreshing(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setRefreshing(false)
        }
    }

    const handlRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchNotifications();
    }, []);

    const renderNotification = ({ item }) => {
        let { notificationBody, createdAt } = item;
        return (
            <View style={styles.notification}>
                <Text style={styles.title}>{notificationBody?.title}</Text>
                <Text style={styles.body}>{notificationBody?.body}</Text>
                <Text style={styles.time}>{moment(createdAt).local().startOf('seconds').fromNow()}</Text>
            </View>
        )
    }

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
                contentContainerStyle={{ marginTop: moderateScaleVertical(15), paddingBottom: moderateScaleVertical(20) }}
                showsVerticalScrollIndicator={false}
                data={notifications}
                renderItem={renderNotification}
                ItemSeparatorComponent={() => <View style={styles.lineStyle} />}
                keyExtractor={item => item?._id.toString()}
                onEndReachedThreshold={0.01}
                // onMomentumScrollBegin={() => {
                //     onEndReachedMomentum = false
                // }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handlRefresh}
                        color={PRIMARY}
                    />
                }
                ListFooterComponent={
                    !isLast && (<View style={{ marginTop: moderateScaleVertical(20) }}>
                        <ActivityIndicator color={PRIMARY} size="large" />
                    </View>)
                }
                onEndReached={fetchNotifications}
            />
        </SafeAreaView>
    )
}

export default connect(mapStateToProps)(NotificationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    info: {
        alignSelf: 'center',
        marginTop: moderateScaleVertical(15),
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
        fontSize: textScale(10),
        alignSelf: 'flex-end',
        fontWeight: '400'
    },
    separator: {
        borderBottomWidth: .4,
        width: '100%',
        borderBottomColor: 'rgba(0, 53, 121, 0.2)',
        marginTop: moderateScaleVertical(10)
    },
    lineStyle: {
        marginBottom: moderateScaleVertical(8)
    }
})