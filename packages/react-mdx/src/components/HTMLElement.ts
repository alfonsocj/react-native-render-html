import NodeWithChildren from './NodeWithChildren';

class HTMLElement extends NodeWithChildren {
  props: any;
  tagName: string;
  constructor(tagName: string, props: any) {
    super();
    this.props = props || {};
    console.info(props);
    this.tagName = tagName;
  }

  renderPropVal(val: unknown) {
    if (typeof val === 'string') {
      return `"${val}"`;
    } else {
      return `{${JSON.stringify(val)}}`;
    }
  }

  renderInlineProps() {
    return Object.entries(this.props)
      .filter(([name]) => name !== 'children')
      .map(([name, value]) => `${name}=${this.renderPropVal(value)}`)
      .join(' ');
  }

  toMdx(): string {
    return `<${
      this.tagName
    }${this.renderInlineProps()}>${this.childrenToMdx()}</${this.tagName}>`;
  }
}

export default HTMLElement;
