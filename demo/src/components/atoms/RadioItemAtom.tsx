import React, { memo, useCallback, useContext } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import GestureHandlerAdapterNucleon from '../nucleons/GestureHandlerAdapterNucleon';
import TextNucleon from '../nucleons/TextNucleon';
import selectedRadioItemContextAtom from './selectedRadioItemContextAtom';
import { useColorRoles } from '../../theme/colorSystem';

export const RADIO_ITEM_HEIGHT = 40;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: { textAlignVertical: 'center' },
  item: { height: RADIO_ITEM_HEIGHT }
});

const RadioItemAtom = memo(function RadioItem<V extends string>({
  value,
  label,
  onSelectedValueChange,
  labelStyle,
  style
}: {
  value: V;
  label: string;
  onSelectedValueChange: (v: any) => void;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}) {
  const onPress = useCallback(() => onSelectedValueChange(value), [
    value,
    onSelectedValueChange
  ]);
  const selected = useContext(selectedRadioItemContextAtom) === value;
  const { pressable } = useColorRoles();
  return (
    <GestureHandlerAdapterNucleon onPress={onPress}>
      <TouchableRipple
        rippleColor={pressable.ripple}
        style={[styles.item, style]}
        onPress={onPress}>
        <View style={styles.row}>
          <TextNucleon style={(styles.label, labelStyle)}>{label}</TextNucleon>
          <RadioButton
            status={selected ? 'checked' : 'unchecked'}
            value={value}
          />
        </View>
      </TouchableRipple>
    </GestureHandlerAdapterNucleon>
  );
});

type RadioItemAtom = typeof RadioItemAtom;

export default RadioItemAtom;
