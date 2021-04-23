import React from 'react';
import { renderMdx } from 'react-mdx';
import MdxToolkitProvider from './MdxToolkitProvider';
import { PageContentImages, PageConceptArchitecture } from 'doc-pages';

async function run() {
  await renderMdx(
    <MdxToolkitProvider>
      <PageContentImages />
    </MdxToolkitProvider>,
    '/home/jsamr/Programmation/react-native-render-html/apps/website/docs/content/images.mdx'
  );

  await renderMdx(
    <MdxToolkitProvider>
      <PageConceptArchitecture />
    </MdxToolkitProvider>,
    '/home/jsamr/Programmation/react-native-render-html/apps/website/docs/concepts/architecture.mdx'
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
