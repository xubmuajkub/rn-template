import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {tw} from '@/libs';
import {useSharedScreens} from '@/navigation/hooks';
import {Tab1Screen} from '@/screens/tab1';
import {Tab1StackParamList} from '@/types';

const StackNavigator = createNativeStackNavigator<Tab1StackParamList>();

export function Tab1Navigator() {
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
        name="Tab1"
        component={Tab1Screen}
        options={() => ({
          headerTitle: '',
          headerShadowVisible: false,
        })}
      />
      {sharedScreens}
    </StackNavigator.Navigator>
  );
}
