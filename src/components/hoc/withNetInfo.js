import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {DARKBLUE} from '../../assets/colors';

const WithNetInfo = WrappedComponent => {
  const NewComponent = props => {
    const [networkStatus, setNetworkStatus] = useState(true);

    const networkCheck = () => {
      return NetInfo.addEventListener(state => {
        if (networkStatus !== state.isConnected) {
          setNetworkStatus(!!state.isConnected && !!state.isInternetReachable);
        }
      });
    };

    useEffect(() => {
      const unsubscribe = networkCheck();
      return () => {
        unsubscribe();
      };
    }, []);

    if (!networkStatus) {
      return (
        <View>
          <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            // transparent={true}
            isVisible={!networkStatus}
            // onRequestClose={() => {
            //   console.log("Hardware back button pressed(Android)")
            // }}
          >
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
                <TouchableOpacity style={styles.button} onPress={networkCheck}>
                  <Text style={styles.textStyle}>Try Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <WrappedComponent {...props} />
        </View>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
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
