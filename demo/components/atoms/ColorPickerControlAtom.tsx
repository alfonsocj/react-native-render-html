import Color from 'color';
import React, { ComponentType, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
const HsvColorPicker = require('react-native-hsv-color-picker')
  .default as HsvColorPicker;
import { SelectorProps, WithStyleProp } from '../nucleons/types';

type HsvColorPicker = ComponentType<Record<string, any>>;

export interface ColorPickerControlAtomProps
  extends Pick<SelectorProps<string>, 'onSelectedValueChange'>,
    WithStyleProp {
  initialValue: string;
}

export default function ColorPickerControlAtom({
  onSelectedValueChange,
  initialValue,
  style
}: ColorPickerControlAtomProps) {
  const getInitialSaturation = useCallback(() => {
    const col = Color(initialValue);
    return {
      hue: col.hue(),
      saturation: col.saturationv(),
      value: col.value()
    };
  }, [initialValue]);
  const [{ hue, saturation, value }, setHsv] = useState(getInitialSaturation);
  useEffect(
    function onHSVUpdate() {
      onSelectedValueChange?.call(
        null,
        Color({ hue, saturationv: saturation, value }).string()
      );
    },
    [hue, saturation, value, onSelectedValueChange]
  );
  const onSaturationAndValueChange = useCallback(
    function onSaturationAndValueChange({
      saturation: s,
      value: v
    }: {
      saturation: number;
      value: number;
    }) {
      setHsv((state) => ({ ...state, saturation: s, value: v }));
    },
    []
  );
  const onHueChange = useCallback(function onHueChange(h: number) {
    setHsv((state) => ({ ...state, hue: h }));
  }, []);
  return (
    <View style={style}>
      <HsvColorPicker
        satValPickerHue={hue}
        satValPickerSaturation={saturation}
        satValPickerValue={value}
        onHuePickerDragMove={onHueChange}
        onHuePickerPress={onHueChange}
        onSatValPickerPress={onSaturationAndValueChange}
        onSatValPickerDragMove={onSaturationAndValueChange}
      />
    </View>
  );
}
