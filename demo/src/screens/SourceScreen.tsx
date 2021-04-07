import React from 'react';
import UIBidirectionalScrollViewAtom from '../components/UIBidirectionalScrollViewAtom';
import UIDisplayLoadingAtom from '../components/UIDisplayLoadingAtom';
import UISourceDisplayMolecule from '../components/UISourceDisplayMolecule';
import { useSelectedHTML } from '../state/store';

export default function SourceScreen() {
  const html = useSelectedHTML();
  return html ? (
    <UIBidirectionalScrollViewAtom>
      <UISourceDisplayMolecule
        language="html"
        paddingVertical={2}
        content={html}
      />
    </UIBidirectionalScrollViewAtom>
  ) : (
    <UIDisplayLoadingAtom />
  );
}
