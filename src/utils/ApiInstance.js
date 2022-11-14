import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ToastMessage from '../components/common/ToastComponent';
import { navigationRef } from '../navigations/rootNavigation';
import { getUser } from './sharedPreferences';

const instance = axios.create({
    baseURL: '',
});

instance.interceptors.request.use(
    async (request) => {
        const token = await getUser();
        if (token) {
            request.headers.Authorization = `Bearer ${token?.accessToken}`;
        }

        // const createdAt = new Date().getTime();
        // const iv = IV;
        // const key = ENCRYPTION_KEY;

        // const password = `${key}${createdAt}`;

        // let apiKey = CryptoJS.AES.encrypt(password, key, { iv: iv }).toString();

        request.headers['Content-Type'] = 'application/json';
        request.headers['Access-Control-Allow-Methods'] =
            'GET, PUT, POST, DELETE, OPTIONS';
        // request.headers['appType'] = 'Customer';
        // request.headers['appVersion'] = (await deviceInfo).appVersion;
        // request.headers['createdAt'] = createdAt,
        //     request.headers['deviceModel'] = (await deviceInfo).deviceModel;
        // request.headers['deviceType'] = (await deviceInfo).deviceType;
        // request.headers['osVersion'] = (await deviceInfo).osVersion;
        // request.headers['apikey'] = apiKey;
        return request;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        let { statusCode } = error?.response?.data;
        if (statusCode === 401) {
            await AsyncStorage.clear();
            ToastMessage({ message: error?.response?.data?.message });
            navigationRef?.current?.reset({
                index: 0,
                routes: [{ name: 'OnBoarding' }]
            });
        }
        // else if (statusCode === 404 || statusCode === 500) {
        //     ToastMessage({ message: error?.response?.data?.message });
        //     navigationRef?.current?.reset({
        //         index: 0,
        //         routes: [{ name: 'Main' }]
        //     });
        // } else {
        return Promise.reject(error.response.data);
        // }
    },
);

export default instance;
