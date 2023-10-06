import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

import {NotificationStates} from '@/constants';

class FCMService {
  register = (
    onRegister: any,
    onNotification: any,
    onOpenNotification: any,
  ) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister: any) => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        // console.log("[FCMService] Permission rejected ", error)
      });
  };

  getToken = (onRegister: (arg0: string) => void) => {
    messaging()
      .getToken()
      .then((fcmToken: string) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          // console.log("[FCMService] User does not have a device token")
        }
      })
      .catch(error => {
        // console.log("[FCMService] getToken rejected ", error)
      });
  };

  requestPermission = (onRegister: (arg0: string) => void) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        // console.log("[FCMService] Request Permission rejected ", error)
      });
  };

  deleteToken = () => {
    // console.log("[FCMService] deleteToken ")
    messaging()
      .deleteToken()
      .catch(error => {
        // console.log("[FCMService] Delete token error ", error)
      });
  };

  createNotificationListeners = (
    onRegister: (arg0: string) => void,
    onNotification: (
      arg0: FirebaseMessagingTypes.RemoteMessage,
      arg1: any,
    ) => void,
    onOpenNotification: (
      arg0: FirebaseMessagingTypes.RemoteMessage,
      arg1: any,
    ) => void,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage) {
        onOpenNotification(remoteMessage, NotificationStates.BACKGROUND);
        // this.removeDeliveredNotification(notification.notificationId)
      }
    });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        // console.log(
        //   '[FCMService] getInitialNotification Notification caused app to open from quit state:',
        //   remoteMessage,
        // );
        if (remoteMessage) {
          onOpenNotification(remoteMessage, NotificationStates.QUIT);
          //  this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    // @ts-ignore
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log('[FCMService] A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        onNotification(remoteMessage, NotificationStates.FOREGROUND);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken: string) => {
      // console.log("[FCMService] New token refresh: ", fcmToken)
      onRegister(fcmToken);
    });

    // Handle background message
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log(
        '[FCMService] setBackgroundMessageHandler - A new FCM message arrived!',
        remoteMessage,
      );
      if (remoteMessage) {
        onNotification(remoteMessage, NotificationStates.BACKGROUND);
      }
    });
  };

  unRegister = () => {
    // @ts-ignore
    this.messageListener();
  };
}

export const fcmService = new FCMService();
