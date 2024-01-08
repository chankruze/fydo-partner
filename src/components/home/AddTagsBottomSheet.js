import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {DARKBLACK, LIGHTBLUE, PRIMARY, WHITE} from '../../assets/colors';
import {updateShop} from '../../services/shopService';
import {setShop} from '../../store/actions/user.action';
import ButtonComponent from '../ButtonComponent';
import BottomsheetIcon from './../../assets/icons/bottomsheet-icon.png';

const AddTagsBottomSheet = ({user, myshop, setShop, triggerTagModal}) => {
  const [tags, setTags] = useState(
    myshop?.searchTags.length > 0 ? myshop.searchTags : [],
  );
  const [tag, setTag] = useState(null);
  const onStartShouldSetResponder = () => {
    return true;
  };

  const [error, setError] = useState({});

  const isValidate = () => {
    const e = {};

    if (tag === null || tag?.trim() === '') {
      e.tag = 'Enter The Tag';
    }

    setError(e);

    if (Object.keys(e).length === 0) {
      return true;
    }

    return false;
  };

  const addTag = () => {
    if (isValidate()) {
      tags.push(tag);
      setTags(tags);
      setTag(null);
    }
  };
  const handleClosePress = async () => {
    myshop.searchTags = tags;
    const response = await updateShop(user?.accessToken, myshop);
    if (response) {
      setShop(response);
    }
    triggerTagModal();
  };

  const handleInput = value => {
    setTag(value);
  };
  const renderItem = (item, index) => {
    return (
      <View style={styles.tag} key={index}>
        <Text style={styles.tagLabel}>{item}</Text>
        <TouchableOpacity onPress={removeTag.bind(this, item)}>
          <MaterialIcons name="clear" size={16} color={PRIMARY} />
        </TouchableOpacity>
      </View>
    );
  };

  const removeTag = t => {
    let list = tags.filter(item => item !== t);
    setTags(list);
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={onStartShouldSetResponder}>
      <Image source={BottomsheetIcon} style={styles.bottomSheetIcon} />
      <Text style={styles.title}>Add Tags</Text>
      <Text style={styles.label}>
        It will help the customer to find your shops more easily.
      </Text>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="pricetag-outline"
            size={18}
            style={styles.inputIcon}
          />
          <TextInput
            value={tag}
            onChangeText={handleInput}
            style={styles.input}
            placeholder="Try Fruits"
          />
        </View>
        <TouchableOpacity onPress={addTag} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>ADD</Text>
        </TouchableOpacity>
      </View>
      {error.tag && <Text style={styles.error}>{error.tag}</Text>}
      <View style={styles.tags}>
        {tags?.map((t, index) => {
          return renderItem(t, index);
        })}
      </View>
      <View style={styles.submitButton}>
        <ButtonComponent
          label="Submit"
          color="white"
          backgroundColor={PRIMARY}
          onPress={handleClosePress}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
    myshop: state?.userReducer?.myshop,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setShop: myshop => dispatch(setShop(myshop)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTagsBottomSheet);
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  bottomSheetIcon: {
    height: 8,
    width: 32,
    marginTop: 10,
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 5,
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    color: DARKBLACK,
    fontSize: 20,
    marginBottom: 15,
  },
  label: {
    marginVertical: 10,
    lineHeight: 20,
    letterSpacing: 0.5,
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    marginBottom: 15,
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
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    marginLeft: 20,
  },
  addButtonLabel: {
    color: PRIMARY,
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
  },
  input: {
    flex: 1,
  },
  submitButton: {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: LIGHTBLUE,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 10,
  },
  separator: {
    width: 10,
    borderRadius: 5,
  },
  tagLabel: {
    marginRight: 10,
    color: PRIMARY,
    fontFamily: 'Gilroy-Medium',
  },
  error: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Gilroy-Regular',
    paddingLeft: 15,
  },
});
