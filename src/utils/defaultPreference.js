import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import SharedPreferences from 'react-native-shared-preferences';

export async function saveUserData(data) {
    if (Platform.OS == 'android') {
        await SharedPreferences.getItem("user", function (value) {
            if (value) {
                let profile = { ...JSON.parse(value), ...data };
                SharedPreferences.setItem("user", JSON.stringify(profile));
            } else {
                SharedPreferences.setItem('user', JSON.stringify(data))
            }
        })
    } else {
        await DefaultPreference.get("user").then((value) => {
            if (value) {
                let profile = { ...JSON.parse(value), ...data };
                DefaultPreference.set("user", JSON.stringify(profile));
            } else {
                DefaultPreference.set('user', JSON.stringify(data))
            }
        })
    }
}

export function getUser() {
    return new Promise((resolve, reject) => {
        if (Platform.OS == 'android') {
            SharedPreferences.getItem("user", function (value) {
                if (value != null)
                    resolve(JSON.parse(value))
                else
                    resolve(null)
            })
        } else {
            DefaultPreference.get('user')
                .then(function (value) {
                    if (value != null && value != undefined)
                        resolve(JSON.parse(value))
                    else
                        resolve(null)
                });
        }
    })
}

export async function clearData() {
    if (Platform.OS == 'android') {
        await SharedPreferences.clear();
        await AsyncStorage.clear();
    } else {
        await DefaultPreference.clearAll();
        await AsyncStorage.clear();
    }
}