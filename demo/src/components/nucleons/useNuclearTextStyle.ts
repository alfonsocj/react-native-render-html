import useNuclearTextColor from './useNuclearTextColor';

export interface NuclearTextStyle {
  color?: string;
  mono?: boolean;
  fontSize?: 'big' | 'normal' | 'small';
  /**
   * A coefficient of fontSize.
   */
  lineHeight?: number;
  align?: 'center' | 'start' | 'end';
  italic?: boolean;
  bold?: boolean;
  // fontFamily?: 'space-mono' | 'WorkSans_400Regular';
}

const MONO = 'IBMPlexMono_400Regular';
const MONO_BOLD = 'IBMPlexMono_600SemiBold';

export default function useNuclearTextStyle(props?: NuclearTextStyle) {
  const {
    color,
    mono,
    italic,
    align = 'start',
    fontSize = 'normal',
    bold,
    lineHeight
  } = props || {};
  const syntheticColor = useNuclearTextColor(color);
  const fs = fontSize === 'normal' ? 14 : fontSize === 'big' ? 20 : 11;
  return {
    color: syntheticColor,
    fontFamily: mono ? (bold ? MONO_BOLD : MONO) : undefined,
    fontSize: fs,
    lineHeight: typeof lineHeight === 'number' ? fs * lineHeight : undefined,
    fontStyle: italic ? 'italic' : 'normal',
    // fontWeight: bold ? 'bold' : 'normal',
    textAlign: align === 'end' ? 'right' : align === 'start' ? 'left' : 'center'
  } as const;
}
