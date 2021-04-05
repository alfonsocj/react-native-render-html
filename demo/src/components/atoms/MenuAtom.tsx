import React, { ComponentProps, useMemo } from 'react';
import { Menu } from 'react-native-paper';
import { useColorRoles } from '../../theme/colorSystem';

type MenuAtomProps = ComponentProps<typeof Menu>;

export default function MenuAtom(props: MenuAtomProps) {
  const { surface } = useColorRoles();
  const contentStyle = useMemo(
    () => ({ backgroundColor: surface.background }),
    [surface.background]
  );
  return <Menu contentStyle={contentStyle} {...props} />;
}
