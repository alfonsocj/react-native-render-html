import React from 'react';
import BidirectionalScrollViewAtom from '../components/atoms/BidirectionalScrollViewAtom';
import DisplayLoadingAtom from '../components/atoms/DisplayLoadingAtom';
import SourceDisplayMolecule from '../components/molecules/SourceDisplayMolecule';
import { useSelectedHTML } from '../state/store';

export default function SourceScreen() {
  const html = useSelectedHTML();
  return html ? (
    <BidirectionalScrollViewAtom>
      <SourceDisplayMolecule
        language="html"
        paddingVertical={2}
        content={html}
      />
    </BidirectionalScrollViewAtom>
  ) : (
    <DisplayLoadingAtom />
  );
}
