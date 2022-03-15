import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, Modal, Text, StyleSheet, Pressable, Image} from 'react-native';
import {DARKBLUE} from '../../assets/colors';

const WithNetInfo = WrappedComponent => {
  const NewComponent = () => {
    const [networkStatus, setNetworkStatus] = useState(false);
    const networkCheck = () => {
      NetInfo.fetch().then(state => {
        setNetworkStatus(state.isConnected);
      });
    };
    useEffect(() => {
      networkCheck();
    }, []);
    if (networkStatus) {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={networkStatus}
            onRequestClose={()=> {
                console.log("Hardware back button pressed(Android)")
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.image}
                  source={require('../../assets/images/no-wifi.png')}
                />
                <Text style={styles.modalHeading}>Connection</Text>
                <Text style={styles.modalText}>
                  Oops! Looks like your device is not connected to the internet
                </Text>
                <Pressable style={styles.button} onPress={networkCheck}>
                  <Text style={styles.textStyle}>Try Again</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <WrappedComponent />
        </View>
      );
    }
    return <WrappedComponent />;
  };
  return NewComponent;
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    backgroundColor: DARKBLUE,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalHeading: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  modalText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 15,
  },
});

export default WithNetInfo;
