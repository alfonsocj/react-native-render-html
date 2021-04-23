import NodeWithChildren from './NodeWithChildren';

export default class MDXDocument extends NodeWithChildren {
  expoImport = false;

  signalExpoImport() {
    this.expoImport = true;
  }

  toMdx(): string {
    const importDirective = this.expoImport
      ? 'import ExpoSnippet from "@site/src/components/ExpoSnippet";\n\n'
      : '';
    return importDirective + this.childrenToMdx();
  }
}
