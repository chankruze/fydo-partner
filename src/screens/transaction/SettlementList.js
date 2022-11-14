import React, { useState } from "react"
import { useEffect } from "react"
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import IonIcons from 'react-native-vector-icons/Ionicons'
import { BLACK, GREY, GREY_2, PRIMARY, WHITE } from "../../assets/colors"
import SettlementCard from "../../components/Transaction/SettlementCard"
import TransactionCard from "../../components/Transaction/TransactionCard"
import { getSettlement, getTransaction } from "../../services/transactionService"
import { moderateScale, moderateScaleVertical, textScale, verticalScale } from "../../utils/responsiveSize"

export const SettlementList = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [settlements, setSettlements] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [isLast, setLast] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        getSettlements();
    }, [])

    const getSettlements = async () => {
        console.log('====================================');
        console.log("api call==>");
        console.log('====================================');
        try {
            if (!isLast) {
                let params = {
                    startDate: 0,
                    endDate: 1761611872252
                }

                const response = await getSettlement(user?.accessToken, limit, skip, params);
                const json = await response.json();

                console.log('====================================');
                console.log("json==>", json);
                console.log('====================================');
                setSettlements([...settlements, ...json]);
                setSkip(skip + limit);
                setLoading(false);
                setLast(json.length == 0 || json.length < limit ? true : false);
            }
        } catch (error) {
            console.log('error raised', error);
            setLoading(false);
        }
    };

    const handlRefresh = React.useCallback(() => {
        getSettlements();
        setKey(Math.random())
    }, []);

    const renderItem = ({ item }) => {
        return <SettlementCard item={item} />;
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
                <SafeAreaView>
                    <ActivityIndicator size="large" color={PRIMARY} />
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={{
            marginHorizontal: moderateScale(15)
        }}>
            <View style={[styles.row]}>
                <Text style={[styles.title, {
                    flex: 1,
                    marginTop: verticalScale(2)
                }]}>Settlements</Text>
                <TouchableOpacity
                    onPress={handlRefresh}
                >
                    <IonIcons
                        name='refresh'
                        size={24}
                        color={PRIMARY}
                    />
                </TouchableOpacity>
            </View>

            <View style={{
                height: '78%',
                marginTop: verticalScale(15)
            }}>
                <FlatList
                    key={key}
                    contentContainerStyle={{
                        paddingBottom: verticalScale(20),
                        marginTop: moderateScaleVertical(15),
                    }}
                    showsVerticalScrollIndicator={false}
                    data={settlements}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item._id}
                    ItemSeparatorComponent={() => <View style={styles.lineStyle} />}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={
                        !isLast && (
                            <View style={{ marginTop: moderateScaleVertical(20) }}>
                                <ActivityIndicator color={PRIMARY} size="large" />
                            </View>
                        )
                    }
                    ListEmptyComponent={
                        <Text style={styles.notFoundText}>Not Found</Text>
                    }
                    onEndReached={getSettlements}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'relative',
        backgroundColor: WHITE,
    },
    linearGradientStyle: {
        width: '100%',
        paddingVertical: moderateScaleVertical(25),
        position: 'relative',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // marginBottom: verticalScale(20)
    },
    headerTitle: {
        fontSize: textScale(18),
        color: WHITE,
        fontFamily: 'Gilroy-Regular',
        marginVertical: moderateScaleVertical(5),
    },
    headerTotal: {
        fontSize: textScale(50),
        fontFamily: 'Gilroy-Medium',
        color: WHITE,
        // marginBottom: moderateScaleVertical(15),
    },
    notFoundText: {
        marginTop: moderateScaleVertical(15),
        alignSelf: 'center',
        fontFamily: 'Gilroy-Medium',
        color: BLACK,
        fontSize: textScale(18),
    },
    lineStyle: {
        marginVertical: moderateScaleVertical(5),
    },
    pagerView: {
        width: '100%',
        height: verticalScale(200),
        borderRadius: 8,
        paddingVertical: 10
    },
    indicators: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 15,
        justifyContent: 'center'
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#505050',
        marginHorizontal: 3,
        borderWidth: .4,
        borderColor: 'grey'
    },
    title: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 20,
        marginTop: verticalScale(8),
        color: 'rgba(97, 90, 90, 0.65)'
    },
    searchInput: {
        fontFamily: 'Gilroy-Regular',
        fontSize: 12,
        color: GREY_2,
        width: '85%',
        paddingLeft: moderateScale(40)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(8),
    },
    searchIcon: {
        position: 'absolute',
        left: moderateScale(6),
        zIndex: 1,
    },
    filterBtn: {
        borderColor: GREY,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: verticalScale(6),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '40%'
        // paddingHorizontal: moderateScale(50)
    },
    filterTxt: {
        fontFamily: 'Gilroy-SemiBold',
        fontSize: 14,
        color: GREY_2
    }
});