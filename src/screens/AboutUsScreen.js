import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import WithNetInfo from '../components/hoc/withNetInfo';

class AboutUsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>
        Lfyd is a hyper-local eCommerce and a Business Development company that has been set up to allow the customers to discover exclusive offers and sales happening in their city along with receiving attractive cash backs while paying in partner's shops with the app.
We are very proud of what we do, for our customers we give them a platform to explore their local shops and get all the information about latest deals and sales happening in the market. People can get real time information about their shop and get other people's reviews about the shop. At the same time it's also a holy grail for businesses and businessmen. From marketing to branding and promotion, our company provides a one-stop solution for growing a business and getting more sales and customers. When a business registers as our partner we provide them complete support and knowledge about running the business so that they always remain ahead in the competition.We aim to help people in generating more profit from their business even if they are a novice.

  
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: .3,
    lineHeight: 25,
    paddingVertical: 10
  }
});

export default WithNetInfo(AboutUsScreen);
