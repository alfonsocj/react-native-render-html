import React from 'react';
import toolkitContext from './toolkitContext';

export default function useToolkit() {
  return React.useContext(toolkitContext);
}
