/* eslint-disable react-native/no-inline-styles */
import React, {
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef
} from 'react';
import useThemeContext from '@theme/hooks/useThemeContext';

function makeIframeSrcParamsQuery({
  name,
  description,
  theme,
  iframeId
}: {
  name: string;
  description?: string;
  theme: 'light' | 'dark';
  iframeId: string;
}) {
  return [
    ['iframeId', iframeId],
    ['preview', 'true'],
    ['platform', 'web'],
    name ? ['name', encodeURIComponent(name)] : null,
    description ? ['description', encodeURIComponent(description)] : null,
    ['theme', theme],
    ['verbose', 'true'],
    ['waitForData', 'true']
  ]
    .filter((v) => !!v)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
}

function installIframeListener({
  iframe,
  iframeId,
  code
}: {
  iframe: HTMLIFrameElement;
  iframeId: string;
  code: string;
}) {
  const listener = function (event: MessageEvent) {
    var eventName = event.data[0];
    var data = event.data[1];
    if (eventName === 'expoFrameLoaded' && data.iframeId === iframeId) {
      iframe.contentWindow.postMessage(
        [
          'expoDataEvent',
          {
            iframeId: iframeId,
            dependencies: 'react-native-render-html@6.0.0-alpha.22',
            code: code,
            files: ''
          }
        ],
        '*'
      );
    }
  };
  window.addEventListener('message', listener);
  // cleanup
  return () => window.removeEventListener('message', listener);
}

const ExpoIframe = memo(function ExpoIframe({
  name,
  description,
  theme,
  code
}: {
  name?: string;
  description?: string;
  theme: 'light' | 'dark';
  code: string;
}) {
  // see https://git.io/JOX5X
  const iframeId = useRef(Math.random().toString(36).substr(2, 10));
  const ref = useRef<HTMLIFrameElement>(null);
  const params = useMemo(
    () =>
      makeIframeSrcParamsQuery({
        iframeId: iframeId.current,
        name,
        theme,
        description
      }),
    [description, name, theme]
  );
  const src = `https://snack.expo.io/embedded?${params}`;
  useEffect(
    function postIframeMessage() {
      const cleanup = installIframeListener({
        iframe: ref.current,
        iframeId: iframeId.current,
        code
      });
      return cleanup;
    },
    [code]
  );
  return (
    <iframe
      ref={ref}
      src={src}
      width="100%"
      height="100%"
      frameBorder="0"
      loading="lazy"
      data-snack-iframe={true}
      style={{ display: 'block' }}
    />
  );
});

function makeSnippet(html: string) {
  return `import React from 'react';
import RenderHtml from 'react-native-render-html';

const html=\`${html}\`;

export default function App() {
  return <RenderHtml source={{ html }} />;
}`;
}

function ExpoSnippetEnhanced({
  caption,
  html
}: PropsWithChildren<{
  caption: string;
  html: string;
}>) {
  const snippet = makeSnippet(html);
  const { isDarkTheme } = useThemeContext();
  const style = {
    height: snippet.split('\n').length * 20 + 48 + 36,
    borderRadius: '0.4rem',
    backgroundColor: 'gray',
    overflow: 'hidden'
  };
  return (
    <div style={style}>
      <ExpoIframe
        code={snippet}
        theme={isDarkTheme ? 'dark' : 'light'}
        name="Awesome example"
      />
    </div>
  );
}

export default ExpoSnippetEnhanced;
