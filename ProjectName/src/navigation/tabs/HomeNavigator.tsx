import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {tw} from '@/libs';
import {useSharedScreens} from '@/navigation/hooks';
import {HomeScreen} from '@/screens/home';
import {HomeStackParamList} from '@/types';

const StackNavigator = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
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
        name="Home"
        component={HomeScreen}
        options={() => ({
          headerTitle: '',
          headerShadowVisible: false,
        })}
      />
      {sharedScreens}
    </StackNavigator.Navigator>
  );
}
