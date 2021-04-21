abstract class NodeWithChildren {
  children: Array<NodeWithChildren | string>;
  constructor() {
    this.children = [];
  }

  appendChild(child: NodeWithChildren | string) {
    this.children.push(child);
  }

  childrenToMdx() {
    return this.children
      .map((c) => (typeof c === 'string' ? c : c.toMdx()))
      .join('\n');
  }

  abstract toMdx(): string;
}

export default NodeWithChildren;
