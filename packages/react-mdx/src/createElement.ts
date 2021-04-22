import H2Element from './components/H2Element';
import HTMLElement from './components/HTMLElement';
import MDXDocument from './components/MDXDocument';

export type NodeType = 'ROOT' | 'h2' | 'div' | 'li' | 'p' | 'a' | 'ol';

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
function createElement(type: NodeType, props?: any) {
  switch (type) {
    case 'ROOT':
      return new MDXDocument();
    case 'h2':
      return new H2Element();
    default:
      return new HTMLElement(type, props);
  }
}

export { createElement };
