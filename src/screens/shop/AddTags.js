import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import ButtonComponent from '../../components/ButtonComponent'
import { DARKBLACK, DARKGREY, GREY, PRIMARY } from '../../assets/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';


const AddTags = ({handleClosePress}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Add Tags</Text>
        <Text style={styles.description}>It will help the customer to find your shops more easily!</Text>
        <View style={styles.inputView}>
            <TextInput mode='outlined' activeOutlineColor={DARKGREY} style={styles.input} placeholder="Try fruits" left={
              <TextInput.Icon
                name={() => (
                    <Ionicons name="pricetag-outline" size={19} color={DARKGREY} />

                )}
              />
            }/>
            <Text style={styles.add}>ADD</Text>
        </View>
        <View style={styles.button}>
        <ButtonComponent label='Submit' color="white" backgroundColor={PRIMARY} onPress={handleClosePress}/>

        </View>
    </View>
  )
}

export default AddTags

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Gilroy-Bold',
        color: DARKBLACK,
        fontSize: 20,
        marginBottom: 15,
    },
    description: {
        fontFamily: 'Gilroy-Medium',
        fontSize: 13,
        marginBottom: 15,

    },
    inputView: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,

    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        height: 45,
    },
    add: {
        color: PRIMARY,
        fontFamily: 'Gilroy-Bold',
        fontSize: 14
    },
    button: {
        width: '90%',
        alignSelf: 'center'
    }

})