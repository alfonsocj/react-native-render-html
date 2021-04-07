import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import TideAtom, { TideAtomProps } from '../atoms/TideAtom';
import SliderControlAtom, {
  SliderControlAtomProps
} from '../atoms/SliderControlAtom';
import TextRoleNucleon from '../nucleons/TextRoleNucleon';
import { useColorRoles } from '../../theme/colorSystem';
import { useSpacing } from '@mobily/stacks';

export type SliderTideMolecule = Omit<
  SliderControlAtomProps,
  'width' | 'style'
> & {
  style?: StyleProp<ViewStyle>;
  leftIconName: TideAtomProps['leftIconName'];
  label: string;
};

export default function SliderTideMolecule({
  style,
  label,
  leftIconName,
  ...sliderProps
}: SliderTideMolecule) {
  const { surface } = useColorRoles();
  const padding = useSpacing(2);
  const right = ({ width }: { width: number }) => (
    <View
      style={{
        borderColor: surface.secondaryContent,
        borderWidth: StyleSheet.hairlineWidth,
        borderTopLeftRadius: padding,
        borderBottomRightRadius: padding,
        padding,
        width
      }}>
      <TextRoleNucleon role="uiMono" align="end">
        {sliderProps.value?.toFixed(1)}
      </TextRoleNucleon>
    </View>
  );
  const bottom = () => <SliderControlAtom {...sliderProps} />;
  return (
    <TideAtom
      style={style}
      leftIconName={leftIconName}
      title={label}
      right={right}
      bottom={bottom}
    />
  );
}
