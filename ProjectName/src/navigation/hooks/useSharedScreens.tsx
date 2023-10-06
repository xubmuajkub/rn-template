import React from 'react';

import {SharedScreens} from '../constants';

export function useSharedScreens(StackNavigator: any) {
  return SharedScreens.map(item => (
    <StackNavigator.Screen
      key={item.name}
      name={item.name}
      component={item.component}
      options={item.options}
    />
  ));
}
