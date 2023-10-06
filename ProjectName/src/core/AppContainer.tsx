import notifee from '@notifee/react-native';
import React, {useEffect} from 'react';
import {useToast} from 'react-native-toast-notifications';

import {NotificationStates, StorageKeys} from '@/constants';
import {fcmService} from '@/services/FcmService';
import {useAppDispatch, useAppSelector} from '@/store';
import {
  selectToast,
  setNotificationRedirect,
  setToast,
} from '@/store/slices/app';
import {NotificationData} from '@/types';
import {ToastProps} from '@/types/toast';
import {AsyncStorageUtils, NotifeeUtils} from '@/utils';

interface Props {
  children: React.ReactNode;
}

export default function AppContainer({children}: Props) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const toastInfo: ToastProps | null = useAppSelector(selectToast as any);

  const onNotification = (remoteMessage: any, state: NotificationStates) => {
    if (state === NotificationStates.FOREGROUND) {
      NotifeeUtils.showNotification(remoteMessage);
    }
  };

  const onOpenNotification = (
    remoteMessage: any,
    state: NotificationStates,
  ) => {
    if (state !== NotificationStates.FOREGROUND) {
      const data: NotificationData = remoteMessage.data?.data
        ? JSON.parse(remoteMessage.data?.data)
        : null;
      if (data) {
        if (state === NotificationStates.BACKGROUND) {
          NotifeeUtils.navigateNotificationPress(data);
        } else {
          const redirect = NotifeeUtils.navigateNotificationPress(data, true);
          if (redirect) {
            dispatch(setNotificationRedirect(redirect));
          }
        }
      }
    }
  };

  const onRegister = (token: string) => {
    console.log('FCM_TOKEN:', token);
    AsyncStorageUtils.storeData(StorageKeys.FCM_TOKEN, token);
  };

  useEffect(() => {
    if (toastInfo && toast && toast?.show) {
      toast?.show?.(toastInfo?.message, {
        ...toastInfo.options,
        type: toastInfo?.options?.type || 'normal',
        placement: toastInfo?.options?.placement || 'top',
        duration: toastInfo?.options?.duration || 4000,
        animationType: toastInfo?.options?.animationType || 'slide-in',
        dangerColor: toastInfo.options?.dangerColor || '#FF0000',
        onClose() {
          dispatch(setToast(null));
        },
        onPress(id: string) {
          toast.hide(id);
        },
      });
    }
  }, [toastInfo]);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    notifee.onBackgroundEvent(NotifeeUtils.handleNotificationEvent);
    const unsubscribeNotifee = notifee.onForegroundEvent(
      NotifeeUtils.handleNotificationEvent,
    );
    notifee.getInitialNotification().then(initRemoteMessage => {
      if (initRemoteMessage) {
        try {
          // @ts-ignore
          const data = JSON.parse(initRemoteMessage.notification.data.data);
          if (data) {
            const redirect = NotifeeUtils.navigateNotificationPress(data, true);
            console.log(redirect);
            if (redirect) {
              dispatch(setNotificationRedirect(redirect));
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
    return () => {
      fcmService.unRegister();
      unsubscribeNotifee();
    };
  }, []);
  return <>{children}</>;
}
