import React, { PropsWithChildren } from 'react';
import HeaderColorRolesProvider from '../../croles/HeaderColorRolesProvider';
import UIAppbarHeaderAtom, {
  UIAppbarHeaderAtomProps
} from '../UIAppbarHeaderAtom';

export type HeaderMoleculeProps = PropsWithChildren<UIAppbarHeaderAtomProps>;

export default function HeaderMolecule(appbarProps: HeaderMoleculeProps) {
  return (
    <HeaderColorRolesProvider>
      <UIAppbarHeaderAtom {...appbarProps} />
    </HeaderColorRolesProvider>
  );
}
