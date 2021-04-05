import React, { ComponentProps } from 'react';
import { Falsy } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useColorPrimitives } from '../../theme/colorSystem';
import TextNucleon from '../nucleons/TextNucleon';
import { NuclearTextStyle } from '../nucleons/useNuclearTextStyle';

export type SnackbarAtomProps = Omit<
  ComponentProps<typeof Snackbar>,
  'style' | 'children'
> & {
  children?: string | Falsy;
  textStyle?: NuclearTextStyle;
};

export default function SnackbarAtom({
  children,
  textStyle,
  ...props
}: SnackbarAtomProps) {
  const { surface } = useColorPrimitives();
  return (
    <Snackbar style={{ backgroundColor: surface.content }} {...props}>
      <TextNucleon {...textStyle} color={surface.color}>
        {children}
      </TextNucleon>
    </Snackbar>
  );
}
