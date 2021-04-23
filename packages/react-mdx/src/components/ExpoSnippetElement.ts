import MDXDocument from './MDXDocument';
import NodeWithChildren from './NodeWithChildren';

export type ExpoSnippetElementProps = {
  html: string;
  caption?: string;
};

export default class ExpoSnippetElement extends NodeWithChildren {
  props: ExpoSnippetElementProps;
  constructor(props: ExpoSnippetElementProps, root: MDXDocument) {
    super();
    this.props = props;
    root.signalExpoImport();
  }

  toMdx(): string {
    const tagName = 'ExpoSnippet';
    const identifiers = [tagName, ...this.getInlineProps(this.props)];
    return `<${identifiers.join(' ')} />`;
  }
}
