import React from 'react';
import { useSelectedTTree } from '../state/store';
import UIBidirectionalScrollViewAtom from '../components/UIBidirectionalScrollViewAtom';
import DisplayLoadingAtom from '../components/atoms/DisplayLoadingAtom';
import TTreeDisplayMolecule from '../components/molecules/TTreeDisplayMolecule';

export default function TTreeScreen() {
  const ttree = useSelectedTTree();
  return ttree ? (
    <UIBidirectionalScrollViewAtom padding={5}>
      <TTreeDisplayMolecule ttree={ttree} />
    </UIBidirectionalScrollViewAtom>
  ) : (
    <DisplayLoadingAtom />
  );
}
