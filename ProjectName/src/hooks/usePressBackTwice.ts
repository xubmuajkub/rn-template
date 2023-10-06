import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {BackHandler, ToastAndroid} from 'react-native';

export default function usePressBackTwice() {
  const {t} = useTranslation();
  const [count, setCount] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (count < 2) {
          setCount(count + 1);
          setTimeout(() => {
            setCount(0);
          }, 2000);
          if (count + 1 === 2) {
            BackHandler.exitApp();
          } else {
            ToastAndroid.showWithGravity(
              t`text.press_back_to_exit`,
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
            );
          }
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [count]),
  );
}

export function usePressBack(handler: () => boolean | null | undefined) {
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handler,
      );
      return () => subscription.remove();
    }, []),
  );
}
