import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {useAppDispatch, useAppSelector} from '@/store';
import {
  selectNotificationRedirect,
  setNotificationRedirect,
} from '@/store/slices/app';
import {HomeScreenProps} from '@/types';

type Props = HomeScreenProps<'Home'>;

export function HomeScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  const notificationRedirect = useAppSelector(selectNotificationRedirect);

  React.useEffect(() => {
    if (notificationRedirect) {
      setTimeout(() => {
        if (notificationRedirect.tab) {
          // @ts-ignore
          navigation.navigate(notificationRedirect.tab);
          navigation.navigate(
            // @ts-ignore
            notificationRedirect.screen,
            notificationRedirect.params,
          );
        } else {
          navigation.navigate(
            // @ts-ignore
            notificationRedirect.screen,
            notificationRedirect.params,
          );
        }
        dispatch(setNotificationRedirect(null));
      }, 1000);
    }
  }, [notificationRedirect]);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Home Screen</Text>
    </View>
  );
}
