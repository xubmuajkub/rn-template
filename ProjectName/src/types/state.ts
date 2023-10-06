import {NotificationRedirect} from '@/types/notification';

import {ToastProps} from './toast';
import {AuthDetails} from './user';

export interface AppState {
  toast: ToastProps | null;
  notificationRedirect?: NotificationRedirect | null;
}

export interface AuthState {
  authInfo: AuthDetails | null;
}

export interface GlobalState {
  app: AppState;
  auth: AuthState;
}
