import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';

export default function AppToastProvider({children}: any) {
  const offset = useSafeAreaInsets();
  return (
    <ToastProvider
      offsetTop={offset.top + (Platform.OS === 'android' ? 50 : 0)}
      offsetBottom={80}>
      {children}
    </ToastProvider>
  );
}
