import {Text} from '@rneui/themed';
import React, {Suspense, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';

import {colors} from '@/constants';

import tw from '../../libs/tailwind';

interface Props {
  onFinished: () => void;
  onLoading: () => Promise<void>;
}

export const LoadingScreen = (props: Props) => {
  const {onFinished, onLoading} = props;
  const {width, height} = useWindowDimensions();
  const {t} = useTranslation();

  useEffect(() => {
    const loadApp = async (): Promise<void> => {
      await onLoading();
      onFinished();
    };
    loadApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator color={colors.black} />}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <View style={tw`items-center justify-center flex-1 p-10 bg-white`}>
        <Text style={[tw`text-center text-48 mt-76 text-black leading-unset`]}>
          {t`app_name`}
        </Text>
        <Text
          style={[
            tw`text-center mt-15 text-black text-16 mb-103 leading-unset`,
          ]}>
          A React Native App
        </Text>
        <ActivityIndicator size={'large'} color={colors.black} />
      </View>
    </Suspense>
  );
};
