import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export async function getDeviceInfo() {
  let object = {};
  try {
    object.appVersion = await DeviceInfo.getVersion();
    object.deviceType = Platform.OS;
    object.deviceModel = await DeviceInfo.getModel();
    object.osVersion = await Platform.Version;
    return object;
  } catch (error) {
    console.log(error);
  }
}

export const notchDevice = DeviceInfo.hasNotch();
