import NodeWithChildren from './NodeWithChildren';

export default class AElement extends NodeWithChildren {
  props: any;
  constructor(props: any) {
    super();
    this.props = props;
  }

  toMdx(): string {
    const href = this.props.href;
    return `\n\n[${this.childrenToMdx()}](${href || ''})\n\n`;
  }
}
