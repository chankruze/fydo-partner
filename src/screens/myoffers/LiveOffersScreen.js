import React, { Component } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { PRIMARY, WHITE } from '../../assets/colors';
import CardOffers from '../../components/myoffers/CardOffers';
import { getOffers } from '../../services/offerService';
import { moderateScaleVertical, textScale } from '../../utils/responsiveSize';
// import OfferIcon from './../../assets/icons/offer.png';

const mapStateToProps = (state) => {
    return {
        user: state?.userReducer?.user
    }
}

class RequestedOffersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            limit: 10,
            skip: 0,
            isLast: false,
            refreshing: false,
            loading: false,
        }
        this.fetchOffers = this.fetchOffers.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.fetchOffers();
    }

    async fetchOffers() {
        let { user } = this.props;
        let { limit, skip, isLast } = this.state;
        try {
            if (!isLast) {
                const activeJson = []
                const response = await getOffers(user?.accessToken, limit, skip);
                response.filter((data) => {
                    if (data.status == 'ACTIVE') {
                        activeJson.push(data)
                    }
                })
                this.setState({
                    offers: [...this.state.offers, ...activeJson],
                    skip: skip + limit,
                    loading: false,
                    isLast: activeJson.length == 0 || activeJson.length < limit ? true : false,
                    refreshing: false,
                })
            } else {
                this.setState({ loading: false, refreshing: false })
            }
            // this.setState({loading: false, offers: paddingJson});
        } catch (error) {
            console.log(error);
            this.setState({ loading: false, refreshing: false });
        }
    }
    renderItem({ item }) {
        return (
            <CardOffers item={item} />
        )
    }
    handlRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.fetchOffers();
    }

    onEndReached = () => {
        this.setState({
            isLast: true,
            refreshing: false
        })
        this.fetchOffers()
    }
    render() {

        let { offers, isLoading } = this.state;

        if (isLoading) {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ActivityIndicator
                            size="large"
                            color={PRIMARY}
                        />
                    </SafeAreaView>
                </View>
            )
        }

        if (offers.length == 0)
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Text style={styles.info}>
                            We have no item to show here
                        </Text>
                    </SafeAreaView>
                </View>
            )

        return (

            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: moderateScaleVertical(20), marginTop: moderateScaleVertical(15) }}
                        showsVerticalScrollIndicator={false}
                        data={offers}
                        keyExtractor={item => item?._id.toString()}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
            </View>

        )
    }
}

export default connect(mapStateToProps)(RequestedOffersScreen);

const styles = StyleSheet.create({
    container: {
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
        marginBottom: moderateScaleVertical(10)
    },
})