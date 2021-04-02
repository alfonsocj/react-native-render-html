import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import AppbarActionAtom from '../../components/atoms/AppbarActionAtom';
import AppbarContentAtom from '../../components/atoms/AppbarContentAtom';
import HeaderMolecule from '../../components/molecules/HeaderMolecule';

export type StandardHeaderOrganismProps = DrawerHeaderProps;

export default function DrawerPlaygroundHeader({
  scene
}: StandardHeaderOrganismProps) {
  const {
    descriptor: { options, navigation }
  } = scene;
  const onMenuPress = React.useCallback(
    () => (navigation as any).openDrawer(),
    [navigation]
  );
  return (
    <HeaderMolecule>
      <AppbarActionAtom icon="menu" onPress={onMenuPress} />
      <AppbarContentAtom title={options.title} />
    </HeaderMolecule>
  );
}
