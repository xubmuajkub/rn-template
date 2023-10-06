import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {AuthScreenProps} from '@/types';

type Props = AuthScreenProps<'GettingStarted'>;

export function GettingStartedScreen({navigation}: Props) {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Getting Started Screen</Text>
    </View>
  );
}
