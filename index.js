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
import SmsRetriever from 'react-native-sms-retriever';
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
            Tts.setDefaultRate(0.42);
            let newMsg = message?.replace('Fydo', 'Phydo');
            Tts.speak(newMsg);
        }
    } else {
        let newArr = [];

        newArr.push({
            createdAt: JSON.stringify(new Date().getTime()),
            paymentId: pId
        });
        storeValue('speak', JSON.stringify(newArr))
        Tts.setDefaultRate(0.42);
        let newMsg = message?.replace('Fydo', 'Phydo');
        Tts.speak(newMsg);
    }

}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage?.data?.body?.toLowerCase().includes('rupees')
        || remoteMessage?.data?.body?.toLowerCase().includes('received')) {
        speakPayment(remoteMessage?.data?.body);
    }
});

const MyHeadlessTask = async () => {
    console.log('Receiving Payments!');
    global.isListenerAttached = false;

    const registered = await SmsRetriever.startSmsRetriever();
    if (registered) {
        await SmsRetriever.addSmsListener(async event => {
            if (event?.message && !global.isListenerAttached) {
                global.isListenerAttached = true;

                if (event?.message?.toLowerCase().includes('rupees')
                    || event?.message?.toLowerCase().includes('received')) {
                    let message = event?.message?.split('-')[0];
                    let Y = 'Lfyd';
                    let Z = event?.message?.split(Y).pop();
                    let pId = Z.substring(0, 25).trim();

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
                            SmsRetriever.removeSmsListener();
                            storeValue('speak', JSON.stringify(diffData))
                        } else {
                            SmsRetriever.removeSmsListener();

                            diffData.push({
                                createdAt: JSON.stringify(new Date().getTime()),
                                paymentId: pId
                            });

                            storeValue('speak', JSON.stringify(diffData))

                            Tts.setDefaultRate(0.42);
                            let newMsg = message?.replace('Fydo', 'Phydo');
                            Tts.speak(newMsg);
                        }
                    } else {
                        SmsRetriever.removeSmsListener();
                        let newArr = [];

                        newArr.push({
                            createdAt: JSON.stringify(new Date().getTime()),
                            paymentId: pId
                        });
                        storeValue('speak', JSON.stringify(newArr))

                        // Tts.stop();
                        Tts.setDefaultRate(0.42);
                        let newMsg = message?.replace('Fydo', 'Phydo');
                        Tts.speak(newMsg);
                    }
                }
            }
        });
    }
};

AppRegistry.registerHeadlessTask('BackgroundService', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
