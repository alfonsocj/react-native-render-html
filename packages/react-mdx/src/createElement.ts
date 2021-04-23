import AdmonitionElement from './components/AdmonitionElement';
import CodeBlockElement from './components/CodeBlockElement';
import ExpoSnippetElement from './components/ExpoSnippetElement';
import H2Element from './components/H2Element';
import HTMLElement from './components/HTMLElement';
import MDXDocument from './components/MDXDocument';

export type NodeType = 'ROOT' | keyof JSX.IntrinsicElements;

/**
 * Creates an element for a document
 */
function createElement(type: NodeType, props: any, root: MDXDocument) {
  switch (type) {
    case 'ROOT':
      return new MDXDocument();
    case 'admonition':
      return new AdmonitionElement(props);
    case 'codeblockds':
      return new CodeBlockElement(props);
    case 'exposnippet':
      return new ExpoSnippetElement(props, root!);
    case 'h2':
      return new H2Element();
    default:
      return new HTMLElement(type, props);
  }
}

export { createElement };
