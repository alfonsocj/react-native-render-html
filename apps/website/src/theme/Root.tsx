import React, { PropsWithChildren } from 'react';
import AdmonitionMDX from '../components/AdmonitionMDX';
import { ToolkitProvider, UIToolkitConfig } from 'doc-pages';

const Chapter = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <section>
    <h2>{title}</h2>
    <div>{children}</div>
  </section>
);

const Header = ({ children }: PropsWithChildren<{}>) => <div>{children}</div>;

const config: UIToolkitConfig = {
  Chapter,
  Header,
  List: ({ children, type = 'decimal' }) => (
    <ol style={{ listStyleType: type }}>{children}</ol>
  ),
  ListItem: ({ children }) => <li>{children}</li>,
  Paragraph: ({ children }) => <p>{children}</p>,
  RenderHtmlCard: ({}) => null,
  SourceDisplay: ({}) => null,
  TipBox: ({ children }) => (
    <AdmonitionMDX type="tip">{children}</AdmonitionMDX>
  ),
  RefBuilder: ({ name, url }) => <a href={url}>{name}</a>
};

function Root({ children }) {
  return <ToolkitProvider config={config}>{children}</ToolkitProvider>;
}

export default Root;
