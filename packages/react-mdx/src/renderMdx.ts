import fs from 'fs/promises';
import type { ReactElement } from 'react';
import path from 'path';
import type MDXDocument from './components/MDXDocument';
import { createElement } from './createElement';
import MDXRenderer from './MDXRenderer';

// renders the component
async function renderMdx(element: ReactElement<any>, filePath: string) {
  const container = createElement(
    'ROOT',
    undefined,
    undefined as any
  ) as MDXDocument;

  //@ts-ignore
  const node = MDXRenderer.createContainer(container, undefined, false);

  //@ts-ignore
  MDXRenderer.updateContainer(element, node, null);

  try {
    await fs.writeFile(filePath, container.toMdx());
  } catch (e) {
    console.error('An error occurred while generating the document.');
    throw e;
  }
  console.log(`✨  MDX document generated at ${path.resolve(filePath)}.`);
}

export default renderMdx;
