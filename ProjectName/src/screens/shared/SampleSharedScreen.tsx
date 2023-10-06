import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {HomeScreenProps} from '@/types';

/*
    This screen can be used in any tab and auth stack
 */

type Props = HomeScreenProps<'SampleShared'>;

export function SampleSharedScreen({navigation}: Props) {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Sample Shared Screen</Text>
    </View>
  );
}
