import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList, View, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { PRIMARY } from '../assets/colors';
import WithNetInfo from '../components/hoc/withNetInfo';
import { getNotifications } from '../services/notificationService';

const notifications = [
    {
        _id: 1,
        notification: {
            title: 'asdfasdf',
            body: 'asdfasdf'
        },
        createdAt: '2000',
        read: null

    },
    {
        _id: 2,
        notification: {
            title: 'asdfasdf',
            body: 'asdfasdf'
        },
        createdAt: '2000',
        read: null

    },
    {
        _id: 3,
        notification: {
            title: 'asdfasdf',
            body: 'asdfasdf'
        },
        createdAt: '2000',
        read: null

    },
    {
        _id: 4,
        notification: {
            title: 'asdfasdf',
            body: 'asdfasdf'
        },
        createdAt: '2000',
        read: null

    },
];

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class NotificationScreen extends Component{

    constructor(){
        super();
        this.state = {
            notifications: notifications,
            loading: false
        }
    }

    componentDidMount(){
        this.fetchNotifications();
    }

    async fetchNotifications(){
        let {user} = this.props;
        this.setState({loading: true});
        try {
            const response = await getNotifications(user?.accessToken);
            const json = await response.json();
            this.setState({loading: false, notifications: json});
        } catch (error) {
            console.log(error);
            this.setState({loading: false});
        }
    }

    renderNotification({item}) {
        let {notification, createdAt} = item;
        return (
            <View style={styles.notification}>
                <Text style={styles.title}>{notification?.body}</Text>
                <Text style={styles.time}>{createdAt}</Text>
            </View>
        )
    }

    render(){
        let {notifications, loading} = this.state;

        if(loading){
            return (
                <SafeAreaView style={styles.container}>
                    <ActivityIndicator 
                        color={PRIMARY}
                        size="large"
                    />
                </SafeAreaView>
            )
        }

        if(notifications.length == 0){
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.info}>We have no item to show here</Text>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={notifications}
                    style={styles.notifications}
                    renderItem={this.renderNotification}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    keyExtractor={item => item?._id.toString()}
                />
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(NotificationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    info: {
        alignSelf: 'center',
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: .2
    },
    notifications: {
        marginTop: 10
    },
    notification: {
        padding: 20,
    },
    title: {
        fontWeight: '400',
        color: 'black',
        fontSize: 13,
        lineHeight: 20
    },
    time: {
        color: 'gray',
        fontSize: 10,
        alignSelf: 'flex-end',
        fontWeight: '400'
    },
    separator: {
        borderBottomWidth: .4,
        width: '100%',
        borderBottomColor: 'rgba(0, 53, 121, 0.2)',
        marginTop: 10
    }
})
