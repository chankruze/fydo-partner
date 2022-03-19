import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import { PRIMARY } from '../../assets/colors';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddTagsBottomSheet(){

    const [tags, setTags] = useState(['asfd', 'asdfsasdf', 'asdfasdf']);
    const [tag, setTag]  = useState(null);
    
    const onStartShouldSetResponder = () => {
        return true
    };

    const addTag = () => {
        tags.push(tag);
        console.log(tags)
        setTags(tags);
        setTag(null);
    }

    const handleInput = (value) => {
        setTag(value)
    }

    const renderItem = (item, index) => {
        return (
            <View style={styles.tag} key={index}>
                <Text style={styles.tagLabel}>{item}</Text>
                <TouchableOpacity
                    onPress={removeTag.bind(this, item)}>
                    <MaterialIcons 
                        name='clear'
                        size={16}
                        color={PRIMARY}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const removeTag = (tag) => {
        let list = tags.filter(item => item != tag);
        setTags(list);
    }

    return (
        <View 
            style={styles.container} 
            onStartShouldSetResponder={onStartShouldSetResponder}>
            <Image 
                source={BottomsheetIcon}
                style={styles.bottomSheetIcon}
            />
            <Text style={styles.title}>Add Tags</Text>
            <Text style={styles.label}>It will help the customer to find your shops more easily.</Text>
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    <Ionicons 
                        name='pricetag-outline'
                        size={18}/>
                    <TextInput
                        value={tag}
                        onChangeText={handleInput}
                        style={styles.input}/>
                </View>
                <TouchableOpacity 
                    onPress={addTag}
                    style={styles.addButton}>
                    <Text style={styles.addButtonLabel}>ADD</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tags}>
                {tags?.map((tag, index) => {
                    return renderItem(tag, index);
                })}
            </View>
            <TouchableOpacity 
                style={styles.submitButton}>
                <Text style={styles.submitButtonLabel}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 10,
        paddingHorizontal: 10,
        paddingBottom: 50
    },
    bottomSheetIcon: {
        height: 8,
        width: 32,
        marginTop: 10,
        marginVertical: 20,
        alignSelf: 'center',
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black'
    },
    label: {
        marginVertical: 10,
        lineHeight: 20,
        color: 'lightgray',
        letterSpacing: .5
    },
    inputContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        width: '60%',
        borderRadius: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addButton: {
        marginLeft: 20
    },
    addButtonLabel: {
        fontWeight: 'bold',
        color: PRIMARY,
        fontSize: 15
    },
    input: {
        flex: 1
    },
    submitButton: {
        width: '70%',
        backgroundColor: PRIMARY,
        height: 42,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        alignSelf: 'center'
    },
    submitButtonLabel: {
        color: 'white',
        fontSize: 15,
        letterSpacing: .5
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        backgroundColor: '#F6FAFF',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10,
        marginTop: 10
    },
    separator: {
        width: 10,
        borderRadius: 5
    },
    tagLabel: {
        marginRight: 10
    }
})