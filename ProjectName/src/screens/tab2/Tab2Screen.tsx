import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {Tab2ScreenProps} from '@/types';

type Props = Tab2ScreenProps<'Tab2'>;

export function Tab2Screen({navigation}: Props) {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Tab2 Screen</Text>
    </View>
  );
}
