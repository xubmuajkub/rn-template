import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {Tab1ScreenProps} from '@/types';

type Props = Tab1ScreenProps<'Tab1'>;

export function Tab1Screen({navigation}: Props) {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Tab1 Screen</Text>
    </View>
  );
}
