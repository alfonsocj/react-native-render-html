/* eslint-disable react-native/no-inline-styles */
import React, { ComponentProps, useMemo } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorRoles } from '../../theme/colorSystem';

export type AppbarHeaderAtomProps = ComponentProps<typeof Appbar.Header>;

export default function AppbarHeaderAtom(props: AppbarHeaderAtomProps) {
  const { surface, statusBarBackground } = useColorRoles();
  const { top } = useSafeAreaInsets();
  const appbarStyles = useMemo(
    () => [props.style, { backgroundColor: surface.background }],
    [surface.background, props.style]
  );
  return (
    <View>
      <View
        style={{
          height: top,
          flexGrow: 1,
          backgroundColor: statusBarBackground
        }}
      />
      <Appbar.Header statusBarHeight={0} {...props} style={appbarStyles} />
    </View>
  );
}
