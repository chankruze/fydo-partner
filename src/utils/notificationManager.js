import NOTIFICATION_TYPES from './NotificationTypes';
//import * as RootNavigation from './RootNavigation';
import messaging from '@react-native-firebase/messaging';


messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    'Notification caused app to open from background state:',
    remoteMessage.notification,
  );
    if(remoteMessage){
      console.log(remoteMessage)
      // let {entityType, entityId} = remoteMessage.data;
      // if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_BRAND){
      //   RootNavigation.navigate('Brand', {id: entityId});
      // }
      // else if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_STORE){
      //   RootNavigation.navigate('Store', {id: entityId});
      // }
      // else if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_OFFER){
      //   RootNavigation.navigate('Offer', {id: entityId});
      // }
    }
  // navigation.navigate(remoteMessage.data.type);
});

messaging()
.getInitialNotification()
.then(remoteMessage => {
  if (remoteMessage) {
    console.log(
      'Notification caused app to open from quit state:',
      remoteMessage,
    );
    // let {entityType, entityId} = remoteMessage.data;
    // if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_BRAND){
    //   RootNavigation.navigate('Brand', {id: entityId});
    // }
    // else if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_STORE){
    //   RootNavigation.navigate('Store', {id: entityId});
    // }
    // else if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_OFFER){
    //   RootNavigation.navigate('Offer', {id: entityId});
    // }
    // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  }
});

// // Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
// //   console.log(" Received - Foreground", notification.body);

// //   // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
// //     });

// // Notifications.events().registerNotificationOpened((notification, completion, action) => {
// //   let {entityId, entityType} = notification;
// //   console.log(entityId, entityType, RootNavigation)
// //   RootNavigation.navigate('Landing')

//   // if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_BRAND){
//   //   RootNavigation.navigate('Brand', {id: entityId});
//   // }
//   // else if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_STORE){
//   //   RootNavigation.navigate('Store', {id: entityId});
//   // }
//   // else if(entityId && entityType == NOTIFICATION_TYPES.SINGLE_OFFER){
//   //   RootNavigation.navigate('Offer', {id: entityId});
//   // }
// // });
    
// // Notifications.events().registerNotificationReceivedBackground(function(notification, response){
// //   console.log("Notification Received - Background", notification.payload);
// // });
//   // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.

// // console.log("notificationManager")
// // notifee.onBackgroundEvent(async ({ type, detail }) => {
// //   const { notification, pressAction } = detail;

// //   console.log("onBackgroundEvent")
// //     if (type === EventType.ACTION_PRESS) {
// //       console.log("onBac")
// //       // if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_BRAND){
// //       //   RootNavigation.navigate('Brand', data.entityId);
// //       // }
// //       // else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_OFFER){
// //       //   RootNavigation.navigate('Offer', data.entityId);
// //       // }
// //       // else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_STORE){
// //       //   RootNavigation.navigate('Store', data.entityId);
// //       // }
// //     // else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_LIST){
// //     //   RootNavigation.navigate('Brand', data.entityId);
// //     // }
// //     }
// // });

// // export default async function onDisplayNotification({notification, data}) {
// //   let {body, title, imageUrl, android} = notification;
// //   // Create a channel
// //   const channelId = await notifee.createChannel({
// //     id: 'default',
// //     name: 'Default Channel',
// //   });

// //   notifee.displayNotification({
// //     title: title,
// //     body: body,
// //     data: data,
// //     android: {
// //       channelId,
// //       pressAction: {
// //         id: 'default',
// //       },
// //       largeIcon: imageUrl || android?.imageUrl
// //     },
// //   });
// // }


// // // notifee.onBackgroundEvent(async ({ type, detail, headless }) => {
// // //   console.log("type1", type)
// // //   if (type === EventType.ACTION_PRESS) {
// // //     console.log("onBac")
// // //     if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_BRAND){
// // //       RootNavigation.navigate('Brand', data.entityId);
// // //     }
// // //     else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_OFFER){
// // //       RootNavigation.navigate('Offer', data.entityId);
// // //     }
// // //     else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_STORE){
// // //       RootNavigation.navigate('Store', data.entityId);
// // //     }
// // //     // else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_LIST){
// // //     //   RootNavigation.navigate('Brand', data.entityId);
// // //     // }
// // //   }
// // // });

// // // notifee.onForegroundEvent(({ type, detail }) => {
// // //   console.log("type2", type)
// // //   // if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
// // //   //   console.log('User pressed an action with the id: ', detail.pressAction.id);
// // //   // }
// // //   // console.log(23, type, detail)
// // //   // if (type === EventType.PRESS) {
// // //     console.log("onBac")
// // //     if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_BRAND){
// // //       RootNavigation.navigate('Brand', data.entityId);
// // //     }
// // //     else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_OFFER){
// // //       RootNavigation.navigate('Offer', data.entityId);
// // //     }
// // //     else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_STORE){
// // //       RootNavigation.navigate('Store', data.entityId);
// // //     }
// // //     // else if(data.entityId && data?.entityType == NOTIFICATION_TYPES.SINGLE_LIST){
// // //     //   RootNavigation.navigate('Brand', data.entityId);
// // //     // }
// // //   // }
// // // });
