import notifee, {
  AndroidImportance,
  Event,
  EventType,
} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

import {NotificationData, NotificationRedirect} from '../types';

export class NotifeeUtils {
  static async showNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
    let {title = '', body = ''} = remoteMessage.data;

    try {
      // Request permissions (required for iOS)
      await notifee.requestPermission();
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'sound',
        name: 'Sound Notifications',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
      // if (Platform.OS === 'android') {
      //   title = `<span style="color: ${
      //     Colors.blue.theme
      //   }; font-size: 15px;">${i18n.t`app_name`}</span>`;
      //   body = `<span style="color: #686868; font-size: 13px;">${body}</span>`;
      // } else {
      //   title = i18n.t`app_name`;
      // }
      // Display a notification
      await notifee.displayNotification({
        title: title,
        body: body,
        data: remoteMessage?.data,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          // smallIcon: 'ic_stat_notification',
          // largeIcon: require('../assets/images/haksoop_logo.png'),
          // color: Colors.blue.theme,
          pressAction: {
            launchActivity: 'default',
            id: 'default',
          },
          sound: 'default',
        },
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  }
  static async handleNotificationEvent({type, detail}: Event) {
    try {
      // console.log('EventType.PRESS:', JSON.stringify(detail));
      if (type === EventType.PRESS) {
        const data: NotificationData = detail.notification?.data?.data
          ? JSON.parse(<string>detail.notification?.data?.data || '')
          : null;
        NotifeeUtils.navigateNotificationPress(data);
      }
    } catch (e) {
      console.log('Handle Notification Event Error:', JSON.stringify(e));
    }
  }
  static navigateNotificationPress(
    data: NotificationData,
    redirect = false,
  ): NotificationRedirect | undefined {
    return;
    // if (data) {
    //   switch (data.type) {
    //     case NotificationTypes.REFERRAL_POINT_RECEIVED:
    //     case NotificationTypes.SIGNUP_REWARD:
    //     case NotificationTypes.REVIEW_REWARD:
    //       if (redirect) {
    //         return {
    //           screen: 'MyPage',
    //         };
    //       }
    //       navigationService.navigate('MyPage');
    //       break;
    //     case NotificationTypes.APPOINTMENT_REMINDER_CUSTOMER:
    //     case NotificationTypes.APPOINTMENT_REMINDER_ACADEMY:
    //     case NotificationTypes.FIRST_PAYMENT_REQUEST:
    //     case NotificationTypes.PAY_VIA_HAKSOOP:
    //     case NotificationTypes.RESERVATION_CONFIRM:
    //     case NotificationTypes.ACADEMY_CHANGE_RESERVATION:
    //     case NotificationTypes.CUSTOMER_CHANGE_RESERVATION:
    //     case NotificationTypes.CANCEL_RESERVATION_ACADEMY:
    //     case NotificationTypes.NEW_APPOINTMENT:
    //       if (redirect) {
    //         return {
    //           tab: 'MyPage',
    //           screen: 'MyPage',
    //           params: {screen: 'Counseling'},
    //         };
    //       }
    //       navigationService.navigate('MyPage');
    //       navigationService.navigate('MyPage', {screen: 'Counseling'});
    //       break;
    //     case NotificationTypes.PAYMENT_RECEIVED:
    //       if (redirect) {
    //         return {
    //           tab: 'MyPage',
    //           screen: 'MyPage',
    //           params: {screen: 'PaymentManagement'},
    //         };
    //       }
    //       navigationService.navigate('MyPage');
    //       navigationService.navigate('MyPage', {screen: 'PaymentManagement'});
    //       break;
    //     case NotificationTypes.APPOINTMENT_REVIEW:
    //     case NotificationTypes.APPOINTMENT_REVIEW_DUE:
    //       if (data.metadata?.academyId && data.metadata?.appointmentId) {
    //         if (redirect) {
    //           return {
    //             screen: 'AddReview',
    //             params: {
    //               detail: {id: data.metadata?.academyId},
    //               appointment: {id: data.metadata?.appointmentId},
    //             },
    //           };
    //         }
    //         navigationService.navigate('AddReview', {
    //           detail: {id: data.metadata?.academyId},
    //           appointment: {id: data.metadata?.appointmentId},
    //         });
    //       } else {
    //         if (redirect) {
    //           return {
    //             tab: 'MyPage',
    //             screen: 'MyPage',
    //             params: {screen: 'Counseling'},
    //           };
    //         }
    //         navigationService.navigate('MyPage');
    //         navigationService.navigate('MyPage', {screen: 'Counseling'});
    //       }
    //       break;
    //     case NotificationTypes.ACADEMY_REVIEW_SECOND:
    //     case NotificationTypes.ACADEMY_REVIEW_SECOND_DUE:
    //     case NotificationTypes.ACADEMY_REVIEW_FIRST:
    //     case NotificationTypes.ACADEMY_REVIEW_FIRST_DUE:
    //       if (data.metadata?.academyId) {
    //         if (redirect) {
    //           return {
    //             screen: 'AddReview',
    //             params: {detail: {id: data.metadata?.academyId}},
    //           };
    //         }
    //         navigationService.navigate('AddReview', {
    //           detail: {id: data.metadata?.academyId},
    //         });
    //       } else {
    //         if (redirect) {
    //           return {
    //             screen: 'AcademyDetail',
    //             params: {detail: {id: data.metadata?.academyId}},
    //           };
    //         }
    //         navigationService.navigate('AcademyDetail', {
    //           detail: {id: data.metadata?.academyId},
    //         });
    //       }
    //       break;
    //     case NotificationTypes.MONTHLY_PAYMENT_REMINDER:
    //       if (redirect) {
    //         return {
    //           tab: 'MyPage',
    //           screen: 'MyPage',
    //           params: {screen: 'CourseManagement'},
    //         };
    //       }
    //       navigationService.navigate('MyPage');
    //       navigationService.navigate('MyPage', {screen: 'CourseManagement'});
    //       break;
    //     case NotificationTypes.HAVE_UNPAID_TUITION:
    //       if (redirect) {
    //         return {
    //           tab: 'MyPage',
    //           screen: 'MyPage',
    //           params: {screen: 'RequestPayment'},
    //         };
    //       }
    //       navigationService.navigate('MyPage');
    //       navigationService.navigate('MyPage', {screen: 'RequestPayment'});
    //       break;
    //     case NotificationTypes.CUSTOM_EVENT:
    //       // TODO: Navigate to Events screen
    //       break;
    //     case NotificationTypes.BRING_BACK_INACTIVE_USER:
    //     default:
    //   }
    // }
  }
}
