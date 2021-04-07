import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import UIAppbarActionAtom from '../../components/UIAppbarActionAtom';
import UIAppbarContentAtom from '../../components/UIAppbarContentAtom';
import UIHeaderAtom from '../../components/UIHeaderAtom';

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
    <UIHeaderAtom>
      <UIAppbarActionAtom icon="menu" onPress={onMenuPress} />
      <UIAppbarContentAtom title={options.title} />
    </UIHeaderAtom>
  );
}
