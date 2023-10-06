import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

import {tw} from '@/libs';
import {HomeScreenProps} from '@/types';

type Props = HomeScreenProps<'Home'>;

export function HomeScreen({navigation}: Props) {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Home Screen</Text>
    </View>
  );
}
