import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {tw} from '@/libs';
import {useSharedScreens} from '@/navigation/hooks';
import {GettingStartedScreen} from '@/screens/auth';
import {AuthStackParamList} from '@/types';

const StackNavigator = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const sharedScreens = useSharedScreens(StackNavigator);
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: tw`bg-white`,
        contentStyle: tw`p-0 m-0 bg-white`,
        headerTitleAlign: 'center',
        headerTitleStyle: tw`text-16 text-black`,
        animation: 'slide_from_right',
      }}>
      <StackNavigator.Screen
        name="GettingStarted"
        component={GettingStartedScreen}
        options={() => ({
          headerTitle: '',
          headerShadowVisible: false,
        })}
      />
      {sharedScreens}
    </StackNavigator.Navigator>
  );
}
