import Color from 'color';
import alphaMixColor from './alphaMixColor';
import { ColorPrimitivesDeclaration, ColorRoles } from './colorSystem';
import shiftColor from './shiftColor';

export interface BackdropFactoryParams {
  surfaceColor: string;
  surfaceContent: string;
  name: string;
  primitives: ColorPrimitivesDeclaration;
}

export default function generateColorRoles({
  surfaceColor,
  surfaceContent,
  name,
  primitives
}: BackdropFactoryParams): ColorRoles {
  const softContent = alphaMixColor(surfaceContent, 0.45, surfaceColor);
  // Use transparent because of a bug in the dropdown menu (react-native-paper)
  const inactiveBackground = 'transparent';
  const accentColor = primitives.accent.color;
  const secondaryContent = Color(surfaceContent).alpha(0.5).string();
  return {
    name,
    surface: {
      secondaryContent,
      background: surfaceColor,
      content: surfaceContent,
      scrim: primitives.scrim
    },
    sheetHandle: {
      slot: shiftColor(surfaceColor, 1, 0.3),
      background: shiftColor(surfaceColor, 0.3, 0.07)
    },
    softDivider: softContent,
    softIconColor: secondaryContent,
    statusBarBackground: Color(surfaceColor).darken(0.3).string(),
    selectable: {
      inactiveBackground,
      inactiveTint: surfaceContent,
      activeTint: primitives.accentVariant.color,
      activeBackground: alphaMixColor(accentColor, 0.2, surfaceColor),
      ripple: softContent
    },
    pressable: {
      background: inactiveBackground,
      tint: surfaceContent,
      ripple: softContent
    },
    spinnerColor: accentColor,
    switchColor: {
      on: accentColor,
      off: alphaMixColor(surfaceContent, 0.2, surfaceColor)
    },
    trackColor: {
      on: alphaMixColor(accentColor, 0.7, surfaceColor),
      off: alphaMixColor(surfaceContent, 0.5, surfaceColor)
    }
  };
}
