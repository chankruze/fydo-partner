import DeviceInfo from 'react-native-device-info';

export function getAppVersion(){
    return DeviceInfo.getVersion();
}