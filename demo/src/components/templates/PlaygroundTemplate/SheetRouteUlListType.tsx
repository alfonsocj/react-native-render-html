import React from 'react';
import RadioListControlMolecule from '../../molecules/RadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter,
  ulListTypes
} from './playgroundStore';

export default function SheetRouteUlListType() {
  const ulListType = usePlaygroundStateSlice('ulListType');
  const setUlListType = usePlaygroundSetter('ulListType');
  return (
    <RadioListControlMolecule
      selectedValue={ulListType}
      onSelectedValueChange={setUlListType}
      items={ulListTypes}
    />
  );
}
