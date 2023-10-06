import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import i18next from 'i18next';

import {SampleSharedScreen} from '@/screens/shared';

const t = i18next.t;

interface Props {
  name: any;
  component: any;
  options: NativeStackNavigationOptions;
}

export const SharedScreens: Array<Props> = [
  {
    name: 'SampleShared',
    component: SampleSharedScreen,
    options: {
      headerTitle: t`label.qr_login` as string,
      headerShadowVisible: false,
    },
  },
];
