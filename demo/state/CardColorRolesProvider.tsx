import React from 'react';
import {
  ColorPrimitivesDeclaration,
  ColorRoles,
  ColorRolesProvider
} from './colorSystem';
import { PropsWithChildren } from 'react';
import generateColorRoles from './generateColorRoles';

function mapPrimitivesColorRoles(
  primitives: ColorPrimitivesDeclaration
): ColorRoles {
  const { card } = primitives;
  return generateColorRoles({
    name: 'card',
    surfaceColor: card.color,
    surfaceContent: card.content,
    primitives
  });
}

export default function CardColorRolesProvider({
  children
}: PropsWithChildren<{}>) {
  return (
    <ColorRolesProvider mapPrimitivesToColorRoles={mapPrimitivesColorRoles}>
      {children}
    </ColorRolesProvider>
  );
}
