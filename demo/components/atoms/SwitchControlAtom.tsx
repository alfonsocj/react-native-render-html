import React from 'react';
import { SwitchProps, Switch, AccessibilityProps } from 'react-native';
import { useComponentColors } from '../../state/ThemeProvider';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

// contains AccessibilityProps
export type SwitchControlAtomProps = Omit<
  SwitchProps,
  'tintColor' | 'trackColor' | 'thumbColor'
> &
  AccessibilityProps;

export default function SwitchControlAtom({
  value,
  ...switchProps
}: SwitchControlAtomProps) {
  const colors = useComponentColors('controls');
  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <Switch
        value={value}
        thumbColor={value ? colors.tintColorOn : colors.tintColorOff}
        trackColor={{
          true: colors.trackColorOn,
          false: colors.trackColorOff
        }}
        {...switchProps}
      />
    </NativeViewGestureHandler>
  );
}
