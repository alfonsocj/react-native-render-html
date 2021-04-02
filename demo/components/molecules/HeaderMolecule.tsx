import React, { PropsWithChildren } from 'react';
import HeaderColorRolesProvider from '../../state/HeaderColorRolesProvider';
import AppbarHeaderAtom, {
  AppbarHeaderAtomProps
} from '../atoms/AppbarHeaderAtom';

export type HeaderMoleculeProps = PropsWithChildren<AppbarHeaderAtomProps>;

export default function HeaderMolecule(appbarProps: HeaderMoleculeProps) {
  return (
    <HeaderColorRolesProvider>
      <AppbarHeaderAtom {...appbarProps} />
    </HeaderColorRolesProvider>
  );
}
