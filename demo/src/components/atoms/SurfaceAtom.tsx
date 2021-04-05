import React from 'react';
import BoxNucleon, { BoxNucleonProps } from '../nucleons/BoxNucleon';
import useSurfaceBackgroundStyleNucleon from '../nucleons/useSurfaceBackgroundStyleNucleon';

export default function SurfaceAtom({ style, ...props }: BoxNucleonProps<any>) {
  return (
    <BoxNucleon
      style={[style, useSurfaceBackgroundStyleNucleon()]}
      {...props}
    />
  );
}
