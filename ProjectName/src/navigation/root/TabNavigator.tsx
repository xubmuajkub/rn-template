import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {colors} from '@/constants';
import {tw} from '@/libs';
import {
  HomeNavigator,
  Tab1Navigator,
  Tab2Navigator,
  Tab3Navigator,
} from '@/navigation/tabs';
import {TabParamList} from '@/types';

const BottomTabNavigator = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const {t} = useTranslation();
  return (
    <>
      <BottomTabNavigator.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.black,
          tabBarLabelStyle: tw`text-11`,
          tabBarStyle: tw`pt-3 bg-white h-93`,
          tabBarItemStyle: tw`items-center justify-center android:pb-22 android:pt-11`,
        }}>
        <BottomTabNavigator.Screen
          name="HomeTab"
          component={HomeNavigator}
          options={() => ({
            tabBarLabel: t`home`,
            tabBarIcon: ({focused}) => (
              <Icon
                name={'music-note-whole-dotted'}
                type={'material-community'}
                color={focused ? colors.primary : colors.black}
              />
            ),
          })}
        />
        <BottomTabNavigator.Screen
          name="Tab1Tab"
          component={Tab1Navigator}
          options={() => ({
            tabBarLabel: t`tab1`,
            tabBarIcon: ({focused}) => (
              <Icon
                name={'music-note-whole-dotted'}
                type={'material-community'}
                color={focused ? colors.primary : colors.black}
              />
            ),
          })}
        />
        <BottomTabNavigator.Screen
          name="Tab2Tab"
          component={Tab2Navigator}
          options={() => ({
            tabBarLabel: t`tab2`,
            tabBarIcon: ({focused}) => (
              <Icon
                name={'music-note-whole-dotted'}
                type={'material-community'}
                color={focused ? colors.primary : colors.black}
              />
            ),
          })}
        />
        <BottomTabNavigator.Screen
          name="Tab3Tab"
          component={Tab3Navigator}
          options={() => ({
            tabBarLabel: t`tab3`,
            tabBarIcon: ({focused}) => (
              <Icon
                name={'music-note-whole-dotted'}
                type={'material-community'}
                color={focused ? colors.primary : colors.black}
              />
            ),
          })}
        />
      </BottomTabNavigator.Navigator>
    </>
  );
}
