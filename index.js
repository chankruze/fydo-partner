/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox, Text, TextInput } from 'react-native';
LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
LogBox.ignoreAllLogs();
import messaging from '@react-native-firebase/messaging';
import Tts from 'react-native-tts';
global.is401Navigated = false;

// let oldRender = Text.render;
// Text.render = function(...args) {
//   let origin = oldRender.call(this, ...args);
//   return React.cloneElement(origin, {
//     style: [{fontFamily: 'Lato-Regular'}, origin.props.style],
//   });
// };

TextInput.defaultProps = {
    ...(TextInput.defaultProps || {}),
    color: 'black',
};
Text.defaultProps = {
    ...(Text.defaultProps || {}),
    color: 'black',
};

import './src/utils/notificationManager';
import { getValue, storeValue } from './src/utils/sharedPreferences';

const speakPayment = async (remoteMessage) => {
    let message = remoteMessage?.split('-')[0];
    let pId = remoteMessage?.split('-')[1]?.trim();

    const getList = await getValue('speak');

    if (getList?.length > 0) {
        let diffData = getList?.filter((i) => {
            let diff = (new Date().getTime() - i?.createdAt) / 1000;
            diff /= 60;
            let difference = Math.round(diff);
            if (difference < 6) {
                return i
            }
        });

        let existData = diffData.filter((j) => {
            return j?.paymentId === pId
        })

        if (existData?.length > 0) {
            storeValue('speak', JSON.stringify(diffData))
        } else {
            diffData.push({
                createdAt: JSON.stringify(new Date().getTime()),
                paymentId: pId
            });

            storeValue('speak', JSON.stringify(diffData))

            Tts.speak(message);
        }
    } else {
        let newArr = [];

        newArr.push({
            createdAt: JSON.stringify(new Date().getTime()),
            paymentId: pId
        });
        storeValue('speak', JSON.stringify(newArr))

        Tts.speak(message);
    }

}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage?.data?.body?.toLowerCase().includes('rupees')
        || remoteMessage?.data?.body?.toLowerCase().includes('received')) {
        speakPayment(remoteMessage?.data?.body);
    }
});

AppRegistry.registerComponent(appName, () => App);
