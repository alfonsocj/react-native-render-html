import React, { PropsWithChildren, useMemo } from 'react';
import { UIToolkit, UIToolkitConfig, UIToolkitRefs } from './shared-types';
import toolkitContext from './toolkitContext';

function buildRefs(Builder: UIToolkitConfig['RefBuilder']): UIToolkitRefs {
  return {
    RefCssProperty: ({ name }) => (
      <Builder name={name} url={`https://mdn.io/${name}`} />
    ),
    RefESSymbol: ({ name }) => (
      <Builder name={name} url={`https://mdn.io/${name}`} />
    ),
    // TODO enhance this by parsing this page and generating a linkmap in a
    // buildstep: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
    RefHtmlAttr: ({ name }) => (
      <Builder name={name} url={`https://mdn.io/attribute/${name}`} />
    ),
    RefHtmlElement: ({ name }) => (
      <Builder name={`<${name}>`} url={`https://mdn.io/${name}`} />
    ),
    RefLibrary: ({ name, url }) => <Builder name={name} url={url} />,
    RefRNSymbol: ({ name }) => (
      <Builder name={name} url={`https://reactnative.dev/docs/${name}`} />
    ),
    // FIXME
    RefRenderHtmlProp: ({ name }) => (
      <Builder
        name={name}
        url={`https://google.com?q=react-native-render-html%20${name}`}
      />
    )
  };
}

export default function ToolkitProvider({
  children,
  config
}: PropsWithChildren<{ config: UIToolkitConfig }>) {
  const { RefBuilder, ...other } = config;
  const uitoolkit = useMemo<UIToolkit>(
    () => ({
      ...other,
      ...buildRefs(RefBuilder)
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(other), RefBuilder]
  );
  return (
    <toolkitContext.Provider value={uitoolkit}>
      {children}
    </toolkitContext.Provider>
  );
}
