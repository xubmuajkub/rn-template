import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {Tab3ScreenProps} from '@/types';

type Props = Tab3ScreenProps<'Tab3'>;

export function Tab3Screen({navigation}: Props) {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Tab3 Screen</Text>
    </View>
  );
}
