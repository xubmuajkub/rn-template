import {BottomSheetModal, BottomSheetModalProps} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {Ref} from 'react';
import {StyleProp, View} from 'react-native';
import {ViewStyle} from 'react-native';

import {useBottomSheetBackHandler} from '@/hooks/useBottomSheetBackHandler';
import tw from '@/libs/tailwind';

import CustomBackdrop from './CustomBackdrop';

interface Props extends BottomSheetModalProps {
  innerRef?: Ref<BottomSheetModalMethods>;
  children: React.ReactNode;
  innerStyle?: StyleProp<ViewStyle>;
}
export default function AppBottomSheet(props: Props) {
  const {innerRef, snapPoints, children, innerStyle, ...rest} = props;
  const {handleSheetPositionChange} = useBottomSheetBackHandler(innerRef);
  return (
    <BottomSheetModal
      ref={innerRef}
      snapPoints={snapPoints}
      handleComponent={() => null}
      backdropComponent={CustomBackdrop}
      {...rest}
      onChange={e => {
        handleSheetPositionChange(e);
        rest.onChange && rest.onChange(e);
      }}>
      <View
        style={[
          tw`flex-1 rounded-tl-16 rounded-tr-16 overflow-hidden bg-white`,
          innerStyle,
        ]}>
        <View style={tw`flex-1`}>
          <View style={[tw`items-center bg-white`, innerStyle]}>
            <View style={tw`h-4 w-120 bg-black rounded-2 my-15`} />
          </View>
          {children}
        </View>
      </View>
    </BottomSheetModal>
  );
}
