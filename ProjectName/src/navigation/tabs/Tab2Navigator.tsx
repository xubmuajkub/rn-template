import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {tw} from '@/libs';
import {useSharedScreens} from '@/navigation/hooks';
import {Tab2Screen} from '@/screens/tab2';
import {Tab2StackParamList} from '@/types';

const StackNavigator = createNativeStackNavigator<Tab2StackParamList>();

export function Tab2Navigator() {
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
        name="Tab2"
        component={Tab2Screen}
        options={() => ({
          headerTitle: '',
          headerShadowVisible: false,
        })}
      />
      {sharedScreens}
    </StackNavigator.Navigator>
  );
}
