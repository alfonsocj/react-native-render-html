import { TextStyle } from 'react-native';
import useNuclearTextColor from './useNuclearTextColor';

export type TextRole =
  // Non Body roles
  | 'headerTitle'
  | 'headerSubtitle'
  | 'uiLabel'
  | 'uiDescription'
  | 'uiMono' // For dynamic numbers
  | 'html'
  | 'source'
  | 'sectionOutline'
  | 'footer'
  // Body roles
  | 'body'
  | 'bodyHeader1'
  | 'hyperlink'
  | 'caption';

const FONT_BODY = 'WorkSans_400Regular';
const FONT_BODY_ITALIC = 'WorkSans_400Regular_Italic';
const FONT_MONO = 'IBMPlexMono_400Regular';
const FONT_UI = 'WorkSans_400Regular';

const roleDefs: Record<
  TextRole,
  { fontSize: number; fontFamily: string } & TextStyle
> = {
  headerTitle: { fontSize: 22, fontFamily: FONT_UI },
  headerSubtitle: { fontSize: 14, fontFamily: FONT_MONO },
  body: { fontSize: 14, fontFamily: FONT_BODY, lineHeight: 21 },
  bodyHeader1: { fontSize: 28, fontFamily: FONT_BODY, letterSpacing: 2 },
  caption: { fontSize: 11, fontFamily: FONT_BODY_ITALIC },
  uiDescription: { fontSize: 11, fontFamily: FONT_UI },
  uiLabel: { fontSize: 14, fontFamily: FONT_UI },
  uiMono: { fontSize: 14, fontFamily: FONT_MONO },
  footer: { fontSize: 11, fontFamily: FONT_MONO },
  //@ts-expect-error
  html: { fontSize: 14 },
  hyperlink: { fontSize: 14, fontFamily: FONT_MONO },
  sectionOutline: {
    fontSize: 11,
    fontFamily: FONT_UI,
    textTransform: 'uppercase'
  },
  source: { fontSize: 14, fontFamily: FONT_MONO }
};

export interface TextRoleNucleonProps {
  color?: string;
  align?: 'center' | 'start' | 'end';
  role: TextRole;
}

export default function useTextRoleNucleon({
  role,
  align = 'start',
  color
}: TextRoleNucleonProps) {
  const syntheticColor = useNuclearTextColor(color);
  const roleStyle = roleDefs[role];
  return {
    color: syntheticColor,
    textAlign:
      align === 'end' ? 'right' : align === 'start' ? 'left' : 'center',
    ...roleStyle
  } as const;
}
