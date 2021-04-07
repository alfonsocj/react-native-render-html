import React from 'react';
import UIBidirectionalScrollViewAtom from '../components/UIBidirectionalScrollViewAtom';
import DisplayLoadingAtom from '../components/atoms/DisplayLoadingAtom';
import SourceDisplayMolecule from '../components/molecules/SourceDisplayMolecule';
import { useSelectedHTML } from '../state/store';

export default function SourceScreen() {
  const html = useSelectedHTML();
  return html ? (
    <UIBidirectionalScrollViewAtom>
      <SourceDisplayMolecule
        language="html"
        paddingVertical={2}
        content={html}
      />
    </UIBidirectionalScrollViewAtom>
  ) : (
    <DisplayLoadingAtom />
  );
}
