import NOTIFICATION_TYPES from './NotificationTypes';
//import * as RootNavigation from './RootNavigation';
import messaging from '@react-native-firebase/messaging';

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    'Notification caused app to open from background state:'
  );
  if (remoteMessage) {

  }
});

messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:'
      );
    }
  });
