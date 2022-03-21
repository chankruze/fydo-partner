import React, {Component} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import { connect } from 'react-redux';
import { PRIMARY } from '../../assets/colors';
import { getOffers } from '../../services/offerService';
import OfferIcon from './../../assets/icons/offer.png';

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class RequestedOffersScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            offers: [],
            loading: false
        }
    }

    componentDidMount(){
        this.fetchOffers();
    }

    async fetchOffers(){
        let {user} = this.props;
        this.setState({loading: true});
        try {
            const response = await getOffers(user?.accessToken);
            const json = await response.json();
            this.setState({loading: false, offers: json});
        } catch (error) {
            console.log(error);
            this.setState({loading: false});
        }
    }

    renderItem({item}){
        let {title, status} = item;
        return (
            <View style={styles.offer}>
                <Image 
                    source={OfferIcon}
                    style={styles.icon}/>
                <Text style={styles.title}>{title}</Text>
                <View style={Object.assign({...styles.status}, {backgroundColor: status == 'PENDING'? '#ffb74d': '#81c784'})}>
                    <Text style={styles.statusLabel}>{status}</Text>
                </View>
            </View>
        )
    }

    render(){

        let {offers, loading} = this.state;

        if(loading){
            return (
                <SafeAreaView style={styles.container}>
                    <ActivityIndicator 
                        size="large" 
                        color={PRIMARY}
                    />
                </SafeAreaView>
            )
        }

        if(offers.length == 0)
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.info}>
                        We have no item to show here
                    </Text>
                </SafeAreaView>
            )

        return (
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={offers}
                    keyExtractor={item => item?._id.toString()}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                />
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(RequestedOffersScreen);

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
    icon: {
        height: 30,
        width: 30
    },
    offer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    separator: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: .8
    },
    title: {
        flex: 1,
        marginHorizontal: 10,
        color: 'black',
        fontWeight: '400'
    },
    status: {
        backgroundColor: 'orange',
        alignSelf: 'flex-end',
        borderRadius: 5
    },
    statusLabel: {
        paddingHorizontal: 20,
        paddingVertical: 3,
        fontSize: 13
    }
})