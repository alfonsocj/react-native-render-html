import React from 'react';
import { View } from 'react-native';
import { useColorRoles } from '../../theme/colorSystem';

export default function DividerAtom() {
  const { softDivider } = useColorRoles();
  return (
    <View style={{ width: '100%', height: 1, backgroundColor: softDivider }} />
  );
}
