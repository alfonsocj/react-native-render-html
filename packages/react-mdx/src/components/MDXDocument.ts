import type fs from 'fs';
import NodeWithChildren from './NodeWithChildren';

export default class MDXDocument extends NodeWithChildren {
  constructor() {
    super();
  }

  generate(
    stream: fs.WriteStream,
    events: { error: () => void; finalize: () => void }
  ) {
    stream.on('error', events.error);
    stream.on('close', events.finalize);
    stream.write(this.toMdx());
  }

  toMdx(): string {
    return this.childrenToMdx();
  }
}
