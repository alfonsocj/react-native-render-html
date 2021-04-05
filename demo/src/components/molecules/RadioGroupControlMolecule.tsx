import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NuclearTextStyle } from '../nucleons/useNuclearTextStyle';
import useSelectorItemsNucleon from '../nucleons/useSelectorPropsNucleon';
import RadioItemAtom from '../atoms/RadioItemAtom';
import selectedRadioItemContextAtom from '../atoms/selectedRadioItemContextAtom';
import BoxNucleon from '../nucleons/BoxNucleon';
import { SelectorListProps } from '../nucleons/types';
import { useSpacing } from '@mobily/stacks';

export interface RadioGroupControlProps<V extends string>
  extends SelectorListProps<V> {
  style?: StyleProp<ViewStyle>;
  labelStyle?: NuclearTextStyle;
}

export default function RadioGroupControlMolecule<V extends string>({
  items,
  selectedValue,
  onSelectedValueChange,
  style,
  labelStyle
}: RadioGroupControlProps<V>) {
  const normalizedItems = useSelectorItemsNucleon(items);
  const spacing = useSpacing(2);
  const itemStyle = useMemo(() => ({ paddingHorizontal: spacing }), [spacing]);
  return (
    <selectedRadioItemContextAtom.Provider value={selectedValue}>
      <BoxNucleon grow style={style}>
        {normalizedItems.map((props, i) => (
          <RadioItemAtom
            key={`${props.label}-${i}`}
            labelStyle={labelStyle}
            {...props}
            style={itemStyle}
            onSelectedValueChange={onSelectedValueChange}
          />
        ))}
      </BoxNucleon>
    </selectedRadioItemContextAtom.Provider>
  );
}
