import { Platform } from 'react-native';
import useNuclearTextColor from './useNuclearTextColor';

export interface NuclearTextStyle {
  color?: string;
  mono?: boolean;
  fontSize?: 'big' | 'normal' | 'small';
  align?: 'center' | 'start' | 'end';
  italic?: boolean;
  bold?: boolean;
}

const MONO = Platform.select({
  ios: 'Menlo',
  default: 'monospace'
});

export default function useNuclearTextStyle(props?: NuclearTextStyle) {
  const { color, mono, italic, align = 'start', fontSize = 'normal', bold } =
    props || {};
  const syntheticColor = useNuclearTextColor(color);
  return {
    color: syntheticColor,
    fontFamily: mono ? MONO : undefined,
    fontSize: fontSize === 'normal' ? 14 : fontSize === 'big' ? 20 : 11,
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: bold ? 'bold' : 'normal',
    textAlign: align === 'end' ? 'right' : align === 'start' ? 'left' : 'center'
  } as const;
}
