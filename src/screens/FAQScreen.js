import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DARKBLACK, PRIMARY} from '../assets/colors';

const FAQS = [
  {
    id: 1,
    question: 'What is Fydo?',
    answer:
      'Fydo or “find your deals & offers” is a hyperlocal ​​Discovery & business development startup that has been set up to help the business owners in getting more customers and at the same time help the customers get information on best deals and offers from all shops and malls in their city. ',
  },
  {
    id: 2,
    question: 'How to Register as Fydo Partner?',
    answer:
      'After downloading the app you have to add your shop details along with giving two-three pictures of the shop that will be displayed on the app. You don’t have to worry, if you will face any problem during registration just give us a call and our team will set up the shop for you.',
  },
  {
    id: 3,
    question: 'Can I give special discounts in festive seasons?',
    answer:
      'Through fydo, any business partners can give discounts on any occasion they want, which will be clearly visible below their shop name and on the dashboard. Just fill the details in the business offers section and select your duration of promotional discounts and we will handle the rest.',
  },
  {
    id: 4,
    question: 'Can I give any suggestions to develop your app?',
    answer:
      'We will be very happy to get any type of suggestion from anyone especially our customers and channel partners so that we can grow our app and our channel partners sales can increase just go to the feedback section and write any feedback you want to give.',
  },
  {
    id: 5,
    question: 'If I am having any problem in the app, how can I contact you?',
    answer:
      'You can directly open the support option and can directly call us on the number provided.',
  },
  {
    id: 6,
    question: 'How to use the refer and earn feature?',
    answer:
      'We have created this application to help the businessmen get more customers and at the same time provide citizens a good place to check the discounts and offers that are available in their city with ease so we really want you all to share the app with other people so that they can use the app to get exclusive cashback and discounts available to them.',
  },
  {
    id: 7,
    question: 'Other than getting customers what extra benefits I get?',
    answer:
      'With fydo, you are not just any other shop you become our channel partner we give you extra privileges by giving you exclusive partner discounts at a no of stores other than that we give you more access to your wallet.',
  },
  {
    id: 8,
    question: 'If I need to give some idea about the app where can I do that?',
    answer:
      'Customer feedback is one of the most important and we take it very seriously, so if you want to give any feedback about our app, our startup or anything in common please open the feedback section from the app drawer and tell us whatever you want, you can also mail us at support@fydoin.',
  },
];

class FAQScreen extends Component {
  constructor() {
    super();
    this.state = {
      faqs: FAQS,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  toggleShowMore(id) {
    let {faqs} = this.state;
    let list = faqs.map(item => {
      if (item?.id == id && item?.showMore) {
        return Object.assign({...item}, {showMore: false});
      } else if (item?.id == id && !item?.showMore)
        return Object.assign({...item}, {showMore: true});
      return item;
    });
    this.setState({faqs: list});
  }

  renderItem({item}) {
    let {id, question, answer, showMore} = item;
    return (
      <TouchableOpacity
        key={id}
        activeOpacity={1}
        onPress={this.toggleShowMore.bind(this, id)}
        style={styles.item}>
        <View style={styles.row}>
          <Text style={styles.question}>{question}</Text>
          <MaterialIcons
            size={20}
            name={showMore ? 'arrow-drop-up' : 'arrow-drop-down'}
            color={PRIMARY}
            style={styles.icon}
          />
        </View>
        {showMore && <Text style={styles.answer}>{answer}</Text>}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.faqs}
          keyExtractor={item => item?.id.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
  },
  question: {
    fontSize: 15,
    flex: 1,
    fontFamily: 'Gilroy-Medium',
    color: DARKBLACK,
    letterSpacing: 0.3,
  },
  answer: {
    fontSize: 13,
    marginTop: 10,
    fontFamily: 'Gilroy-Medium',
    color: 'grey',
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 5,
  },
});

export default WithNetInfo(FAQScreen);
