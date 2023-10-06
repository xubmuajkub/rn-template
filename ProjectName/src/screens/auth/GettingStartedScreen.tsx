import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {AuthScreenProps} from '@/types';

type Props = AuthScreenProps<'GettingStarted'>;

export function GettingStartedScreen({navigation}: Props) {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-36 font-bold`}>Welcome!</Text>
      <Text style={tw`text-24 font-medium`}>React Native Template</Text>
      <Text style={tw`text-16 font-bold`}>by Jason</Text>
    </View>
  );
}
