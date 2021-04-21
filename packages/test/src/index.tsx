import React from 'react';
import { renderMdx } from 'react-mdx';
import MdxToolkitProvider from './MdxToolkitProvider';
import { PageConceptArchitecture } from 'doc-pages';

//@ts-ignore
renderMdx(
  <MdxToolkitProvider>
    <PageConceptArchitecture />
  </MdxToolkitProvider>,
  '/tmp/render-mdx.mdx'
);
