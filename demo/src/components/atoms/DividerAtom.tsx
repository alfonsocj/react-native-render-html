import React from 'react';
import { View } from 'react-native';
import { useColorRoles } from '../../theme/colorSystem';
import { WithStyleProp } from '../nucleons/types';

export default function DividerAtom({
  color,
  height = 1,
  width = '100%'
}: WithStyleProp<{
  color?: string;
  height?: number;
  width?: number | string;
}>) {
  const { softDivider } = useColorRoles();
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: color ?? softDivider
      }}
    />
  );
}
