import React from 'react';
import { UIToolkit } from './shared-types';

const toolkitContext = React.createContext<UIToolkit>({} as any);

export default toolkitContext;
