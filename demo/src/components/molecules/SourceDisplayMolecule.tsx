import { useSpacing } from '@mobily/stacks';
import React, { useCallback } from 'react';
import Highlighter, { HighlighterProps } from '../../highlight/Highlighter';
import { useColorScheme } from '../../state/ColorSchemeProvider';
import { useColorPrimitives } from '../../theme/colorSystem';
import useNuclearTextStyle, {
  NuclearTextStyle
} from '../nucleons/useNuclearTextStyle';
export interface SourceRenderer {
  htmlSource: string;
}

export type SourceDisplayMoleculeProps = {
  content: string;
  style?: HighlighterProps['style'];
  language?: HighlighterProps['language'];
  paddingVertical?: number;
  clipLines?: boolean;
  fontSize?: NuclearTextStyle['fontSize'];
} & Omit<
  HighlighterProps,
  | 'paddingTop'
  | 'paddingBottom'
  | 'lineStyle'
  | 'lineNumberStyle'
  | 'highlightJsStyle'
  | 'fontSize'
  | 'lineFontSize'
  | 'fontFamily'
>;

export default function SourceDisplayMolecule({
  paddingVertical,
  fontSize: nuclearFontSize = 'normal',
  ...otherProps
}: SourceDisplayMoleculeProps) {
  const { card } = useColorPrimitives();
  const spacing = useSpacing(2);
  const colorScheme = useColorScheme();
  const { fontFamily, fontSize } = useNuclearTextStyle({
    mono: true,
    fontSize: nuclearFontSize
  });
  const paddingVerticalNucleon = useSpacing(paddingVertical ?? 0);
  const lineNumberDisplayWidthComputer: HighlighterProps['lineNumberDisplayWidthComputer'] = useCallback(
    (fs, maxLineNumberCharLength) => spacing + fs * maxLineNumberCharLength,
    [spacing]
  );
  return (
    <Highlighter
      highlightJsStyle={
        colorScheme === 'dark' ? 'solarizedDark' : 'solarizedLight'
      }
      fontSize={fontSize}
      fontFamily={fontFamily}
      lineStyle={{
        paddingHorizontal: spacing
      }}
      lineNumberStyle={{
        backgroundColor: card.color,
        color: card.content
      }}
      paddingBottom={paddingVerticalNucleon}
      paddingTop={paddingVerticalNucleon}
      lineNumberDisplayWidthComputer={lineNumberDisplayWidthComputer}
      {...otherProps}
    />
  );
}
