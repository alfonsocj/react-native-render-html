import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useColorRoles } from '../../state/colorSystem';
import useNuclearTextStyle from '../nucleons/useNuclearTextStyle';

export type AppbarContentAtomProps = Omit<
  React.ComponentProps<typeof Appbar.Content>,
  'subtitleStyle' | 'color'
>;

const styles = StyleSheet.create({
  title: {
    letterSpacing: 1.5
  }
});

export default function AppbarContentAtom(props: AppbarContentAtomProps) {
  const { surface } = useColorRoles();
  const subtitleStyle = useNuclearTextStyle({
    mono: true,
    fontSize: 'small',
    color: surface.content
  });
  const titleStyle = useNuclearTextStyle({
    mono: false,
    fontSize: 'big',
    color: surface.content
  });
  return (
    <Appbar.Content
      color={surface.content}
      {...props}
      titleStyle={[titleStyle, styles.title]}
      subtitleStyle={subtitleStyle}
    />
  );
}
