import DeviceInfo from 'react-native-device-info';

export function getAppVersion() {
  return DeviceInfo.getVersion();
}

export function isNotchDevice() {
  return DeviceInfo.hasNotch();
}
