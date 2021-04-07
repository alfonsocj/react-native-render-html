import React, { ComponentProps } from 'react';
import { Falsy } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useColorPrimitives } from '../../theme/colorSystem';
import TextRoleNucleon, {
  TextRoleNucleonProps
} from '../nucleons/TextRoleNucleon';

export type SnackbarAtomProps = Omit<
  ComponentProps<typeof Snackbar>,
  'style' | 'children'
> & {
  children?: string | Falsy;
  textProps?: TextRoleNucleonProps;
};

export default function SnackbarAtom({
  children,
  textProps,
  ...props
}: SnackbarAtomProps) {
  const { surface } = useColorPrimitives();
  return (
    <Snackbar style={{ backgroundColor: surface.content }} {...props}>
      <TextRoleNucleon role="uiLabel" color={surface.color} {...textProps}>
        {children}
      </TextRoleNucleon>
    </Snackbar>
  );
}
