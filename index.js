/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
LogBox.ignoreAllLogs();
import messaging from '@react-native-firebase/messaging';
import Tts from 'react-native-tts';

// let oldRender = Text.render;
// Text.render = function(...args) {
//   let origin = oldRender.call(this, ...args);
//   return React.cloneElement(origin, {
//     style: [{fontFamily: 'Lato-Regular'}, origin.props.style],
//   });
// };

import './src/utils/notificationManager';

const speakPayment = async (remoteMessage) => {
    let message = remoteMessage?.split('-')[0];
    let pId = remoteMessage?.split('-')[1]?.trim();

    const getList = await getValue('speak');

    if (getList?.length > 0) {
        getList?.map((i, index) => {
            let Arr = [];

            let diff = (new Date().getTime() - i?.createdAt) / 1000;
            diff /= 60;
            let difference = Math.round(diff);

            if (difference > 6) {
                delete getList[index];

                let newArr = getList.filter((element) => {
                    return element !== undefined;
                });

                Arr = [...newArr];
            } else {
                Arr = [...getList]
            }

            let has = Arr.some(item => pId === item?.paymentId);

            if (has) {
                return;
            } else {
                Arr.push({
                    createdAt: JSON.stringify(new Date().getTime()),
                    paymentId: pId
                });

                storeValue('speak', JSON.stringify(Arr))

                Tts.speak(message);
                return;
            }
        })
    } else {
        let newArr = [];

        newArr.push({
            createdAt: JSON.stringify(new Date().getTime()),
            paymentId: pId
        });

        storeValue('speak', JSON.stringify(newArr))

        Tts.speak(message);
        return;
    }

}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage?.data?.body?.toLowerCase().includes('rupees')
        || remoteMessage?.data?.body?.toLowerCase().includes('received')) {
        speakPayment(remoteMessage?.data?.body);
    }
});

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import { getValue, storeValue } from './src/utils/sharedPreferences';
ReactNativeForegroundService.register();

AppRegistry.registerComponent(appName, () => App);
