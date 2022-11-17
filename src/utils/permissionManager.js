import { PermissionsAndroid, Platform } from "react-native";
import Permissions, { PERMISSIONS, RESULTS, request } from 'react-native-permissions'

export async function isLocationPermissionGranted() {
    if (Platform.OS == 'ios') {
        const permissionStatus = await Permissions.check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return permissionStatus;
    } else {
        const permissionStatus = await Permissions.check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        return permissionStatus;
    }
}

export async function isBleConnectPermissionGranted() {
    if (Platform.OS == 'ios') {
        const permissionStatus = await Permissions.check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
        return permissionStatus;
    } else {
        const permissionStatus = await Permissions.check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        return permissionStatus;
    }
}

export async function isBleScanPermissionGranted() {
    if (Platform.OS == 'ios') {
        const permissionStatus = await Permissions.check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
        return permissionStatus;
    } else {
        const permissionStatus = await Permissions.check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
        return permissionStatus;
    }
}

export async function isCameraPermissionGranted() {
    if (Platform.OS == 'ios') {
        const permissionStatus = await Permissions.check(PERMISSIONS.IOS.CAMERA);
        return permissionStatus;
    } else {
        const permissionStatus = await Permissions.check(PERMISSIONS.ANDROID.CAMERA);
        return permissionStatus;
    }
}

export async function requestCameraPermission() {
    try {
        if (Platform.OS == 'ios') {
            request(PERMISSIONS.IOS.CAMERA).then((result) => {
                if (result == 'granted') {
                    console.log("You can use the location")
                } else {
                    console.log("location permission denied")
                }
            });
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, null
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
                //   alert("You can use the location");
            } else {
                console.log("camera permission denied")
                // alert("Location permission denied");
            }
        }
    } catch (err) {
        console.warn(err)
    }
}

export async function requestLocationPermission() {
    try {
        if (Platform.OS == 'ios') {
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
                if (result == 'granted') {
                    console.log("You can use the location")
                } else {
                    console.log("location permission denied")
                }
            });
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, null
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
                //   alert("You can use the location");
            } else {
                console.log("location permission denied")
                // alert("Location permission denied");
            }
        }
    } catch (err) {
        console.warn(err)
    }
}

export async function requestBleConnectPermission() {
    try {
        if (Platform.OS == 'ios') {
            request(PERMISSIONS.IOS.CAMERA).then((result) => {
                if (result == 'granted') {
                    console.log("You can use the location")
                } else {
                    console.log("location permission denied")
                }
            });
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, null
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
                //   alert("You can use the location");
            } else {
                console.log("camera permission denied")
                // alert("Location permission denied");
            }
        }
    } catch (err) {
        console.warn(err)
    }
}

export async function requestBleScanPermission() {
    try {
        if (Platform.OS == 'ios') {
            request(PERMISSIONS.IOS.CAMERA).then((result) => {
                if (result == 'granted') {
                    console.log("You can use the location")
                } else {
                    console.log("location permission denied")
                }
            });
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, null
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
                //   alert("You can use the location");
            } else {
                console.log("camera permission denied")
                // alert("Location permission denied");
            }
        }
    } catch (err) {
        console.warn(err)
    }
}