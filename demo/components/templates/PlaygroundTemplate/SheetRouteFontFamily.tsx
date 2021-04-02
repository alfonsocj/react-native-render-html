import React from 'react';
import RadioListControlMolecule, {
  RadioListControlProps
} from '../../molecules/RadioListControlMolecule';
import {
  usePlaygroundStateSlice,
  usePlaygroundSetter
} from './playgroundStore';
import { SYSTEM_FONTS } from '../../../constants';

const getLabelStyle: RadioListControlProps<string>['labelStyle'] = ({
  value
}) => ({
  fontFamily: value
});

export default function SheetRouteFontFamily() {
  const fontFamily = usePlaygroundStateSlice('fontFamily');
  const setFontFamily = usePlaygroundSetter('fontFamily');
  return (
    <RadioListControlMolecule
      selectedValue={fontFamily}
      onSelectedValueChange={setFontFamily}
      items={SYSTEM_FONTS}
      labelStyle={getLabelStyle}
    />
  );
}
