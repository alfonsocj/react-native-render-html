import React from 'react';
import { useSelectedTTree } from '../state/store';
import UIBidirectionalScrollViewAtom from '../components/UIBidirectionalScrollViewAtom';
import UIDisplayLoadingAtom from '../components/UIDisplayLoadingAtom';
import UITTreeDisplayMolecule from '../components/UITTreeDisplayMolecule';

export default function TTreeScreen() {
  const ttree = useSelectedTTree();
  return ttree ? (
    <UIBidirectionalScrollViewAtom padding={5}>
      <UITTreeDisplayMolecule ttree={ttree} />
    </UIBidirectionalScrollViewAtom>
  ) : (
    <UIDisplayLoadingAtom />
  );
}
