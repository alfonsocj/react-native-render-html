import fs from 'fs';
import type { ReactElement } from 'react';
import path from 'path';
import type MDXDocument from './components/MDXDocument';
import { createElement } from './createElement';
import MDXRenderer from './MDXRenderer';

// renders the component
async function renderMdx(element: ReactElement<any>, filePath: string) {
  const container = createElement('ROOT') as MDXDocument;

  //@ts-ignore
  const node = MDXRenderer.createContainer(container, undefined, false);

  //@ts-ignore
  MDXRenderer.updateContainer(element, node, null);

  const stream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    container.generate(stream, Events(filePath, resolve, reject));
  });
}

function Events(filePath: string, resolve: any, reject: any) {
  return {
    finalize: () => {
      console.log(`✨  MDX document created at ${path.resolve(filePath)}.`);
      resolve();
    },
    error: () => {
      console.log('An error occurred while generating the document.');
      reject();
    }
  };
}

export default renderMdx;
