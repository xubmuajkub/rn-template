import * as React from 'react';

import {bottomTabOption} from '../styles/bottomTabStyle';

export default function useHideBottomTab(navigation: any) {
  React.useLayoutEffect(() => {
    navigation?.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () => navigation?.getParent()?.setOptions(bottomTabOption);
  }, [navigation]);
}
