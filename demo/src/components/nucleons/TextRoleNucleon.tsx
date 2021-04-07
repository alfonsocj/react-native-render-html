import * as React from 'react';
import { Text as NativeText } from 'react-native';
import { TextProps } from 'react-native';
import textColorContext from '../../state/textColorContext';
import useTextRoleNucleon, {
  TextRoleNucleonProps as T
} from './useTextRoleNucleon';

export type TextRoleNucleonProps = React.PropsWithChildren<TextProps & T>;

export default function TextRoleNucleon({
  style,
  ...props
}: TextRoleNucleonProps) {
  const generatedStyle = useTextRoleNucleon(props);
  const text = <NativeText {...props} style={[generatedStyle, style]} />;
  if (props.color) {
    return (
      <textColorContext.Provider value={props.color}>
        {text}
      </textColorContext.Provider>
    );
  }
  return text;
}
