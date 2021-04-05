import React from 'react';
import { Appbar } from 'react-native-paper';
import { useColorRoles } from '../../theme/colorSystem';

export type AppbarActionAtomProps = React.ComponentProps<typeof Appbar.Action>;

export default function AppbarActionAtom({
  color,
  rippleColor,
  ...props
}: AppbarActionAtomProps) {
  const { pressable } = useColorRoles();
  return (
    <Appbar.Action
      rippleColor={rippleColor || pressable.ripple}
      color={color || pressable.tint}
      {...props}
    />
  );
}
