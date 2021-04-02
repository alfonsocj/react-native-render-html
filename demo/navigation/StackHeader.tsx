import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import AppbarActionAtom from '../components/atoms/AppbarActionAtom';
import AppbarContentAtom from '../components/atoms/AppbarContentAtom';
import HeaderMolecule from '../components/molecules/HeaderMolecule';

export { StackHeaderProps };

export default function StackHeader(props: StackHeaderProps) {
  const { scene } = props;
  const {
    descriptor: { options, navigation }
  } = scene;
  const onMenuPress = React.useCallback(() => navigation.goBack(), [
    navigation
  ]);
  return (
    <HeaderMolecule>
      <AppbarActionAtom icon="arrow-left" onPress={onMenuPress} />
      <AppbarContentAtom title={options.title} />
    </HeaderMolecule>
  );
}
