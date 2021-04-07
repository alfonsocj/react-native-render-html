import React from 'react';
import { useSelectedTTree } from '../state/store';
import UIBidirectionalScrollViewAtom from '../components/UIBidirectionalScrollViewAtom';
import UIDisplayLoadingAtom from '../components/UIDisplayLoadingAtom';
import TTreeDisplayMolecule from '../components/molecules/TTreeDisplayMolecule';

export default function TTreeScreen() {
  const ttree = useSelectedTTree();
  return ttree ? (
    <UIBidirectionalScrollViewAtom padding={5}>
      <TTreeDisplayMolecule ttree={ttree} />
    </UIBidirectionalScrollViewAtom>
  ) : (
    <UIDisplayLoadingAtom />
  );
}
