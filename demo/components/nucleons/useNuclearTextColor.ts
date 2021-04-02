import React from 'react';
import { OpaqueColorValue } from 'react-native';
import { useColorRoles } from '../../state/colorSystem';
import textColorContext from '../../state/textColorContext';

export default function useNuclearTextColor(color?: string | OpaqueColorValue) {
  const inheritedColor = React.useContext(textColorContext);
  const { surface } = useColorRoles();
  return color ?? inheritedColor ?? surface.content;
}
