import React from 'react';
import TextRoleNucleon, {
  TextRoleNucleonProps
} from '../nucleons/TextRoleNucleon';

export default function HtmlElDisplayAtom({
  name,
  ...props
}: Omit<TextRoleNucleonProps, 'role' | 'children'> & {
  name: string;
}) {
  return (
    <TextRoleNucleon role="hyperlink" {...props}>
      &lt;{name}&gt;
    </TextRoleNucleon>
  );
}
