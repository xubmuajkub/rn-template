import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';

import {StorageKeys} from '@/constants';
import {AuthNavigator, TabNavigator} from '@/navigation/root';
import {LoadingScreen} from '@/screens/common';
import {useAppDispatch, useAppSelector} from '@/store';
import {selectAuthInfo} from '@/store/slices/auth';
import {RootStackParamList} from '@/types';
import {AsyncStorageUtils, sleep} from '@/utils';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useAppDispatch();

  const authInfo = useAppSelector(selectAuthInfo);

  const [loading, setLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('');

  const restoreSession = async () => {
    // AsyncStorageUtils.clearStorage();
    // const refreshToken = await AsyncStorageUtils.getData(
    //   StorageKeys.REFRESH_TOKEN,
    // );
    // Handle refresh token
    await sleep(1000);
  };
  if (loading) {
    return (
      <LoadingScreen
        onLoading={restoreSession}
        onFinished={() => setLoading(false)}
      />
    );
  }
  return (
    <RootStack.Navigator>
      {authInfo ? (
        <RootStack.Screen
          name="Tab"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          // @ts-ignore
          initialParams={{initialRouteName}}
          options={{headerShown: false}}
        />
      )}
    </RootStack.Navigator>
  );
}

export default RootNavigator;
