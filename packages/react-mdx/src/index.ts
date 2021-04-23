/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdmonitionProps } from './components/AdmonitionElement';
import { CodeBlockElementProps } from './components/CodeBlockElement';
import { ExpoSnippetElementProps } from './components/ExpoSnippetElement';
export { default as renderMdx } from './renderMdx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      admonition: AdmonitionProps;
      codeblockds: CodeBlockElementProps;
      exposnippet: ExpoSnippetElementProps;
    }
  }
}
