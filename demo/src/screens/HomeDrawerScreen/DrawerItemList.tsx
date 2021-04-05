import React from 'react';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import TideAtom from '../../components/atoms/TideAtom';
import { Stack } from '@mobily/stacks';
import BoxNucleon from '../../components/nucleons/BoxNucleon';

/**
 * Component that renders the navigation list in the drawer.
 */
export default function DrawerItemList({
  state,
  navigation,
  descriptors
}: DrawerContentComponentProps<any>) {
  //  const buildLink = useLinkBuilder();

  const items = state.routes.map((route: any, i: number) => {
    const focused = i === state.index;
    const { title, drawerLabel, drawerIcon } = descriptors[route.key].options;
    return (
      <TideAtom
        key={route.key}
        title={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        leftIconName={drawerIcon}
        active={focused}
        // titleStyle={drawerLabelStyle}
        // style={drawerItemStyle}
        // to={buildLink(route.name, route.params)}
        onPress={() => {
          navigation.dispatch({
            ...(focused
              ? DrawerActions.closeDrawer()
              : CommonActions.navigate(route.name)),
            target: state.key
          });
        }}
      />
    );
  });
  return (
    <BoxNucleon paddingY={1} paddingX={1}>
      <Stack space={1}>{items}</Stack>
    </BoxNucleon>
  );
}
