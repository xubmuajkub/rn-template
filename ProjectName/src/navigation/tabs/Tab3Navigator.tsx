import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {tw} from '@/libs';
import {useSharedScreens} from '@/navigation/hooks';
import {Tab3Screen} from '@/screens/tab3';
import {Tab3StackParamList} from '@/types';

const StackNavigator = createNativeStackNavigator<Tab3StackParamList>();

export function Tab3Navigator() {
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
        name="Tab3"
        component={Tab3Screen}
        options={() => ({
          headerTitle: '',
          headerShadowVisible: false,
        })}
      />
      {sharedScreens}
    </StackNavigator.Navigator>
  );
}
