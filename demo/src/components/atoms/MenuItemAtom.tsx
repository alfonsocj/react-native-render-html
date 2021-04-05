import React from 'react';
import { IconNucleonProps } from '../nucleons/IconNucleon';
import TideAtom, { TideAtomProps } from './TideAtom';

type MenuItemAtomProps = Omit<
  TideAtomProps,
  'leftIconName' | 'right' | 'bottom'
> & {
  iconName: IconNucleonProps['name'];
};

export default function MenuItemAtom({
  iconName,
  ...props
}: MenuItemAtomProps) {
  return (
    <TideAtom accessibilityRole="menuitem" leftIconName={iconName} {...props} />
  );
}
