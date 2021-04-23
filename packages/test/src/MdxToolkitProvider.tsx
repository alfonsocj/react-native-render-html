import React, { PropsWithChildren, Fragment } from 'react';
import { ToolkitProvider, UIToolkitConfig } from 'doc-pages';

const Chapter = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <Fragment>
    <h2>{title}</h2>
    {children}
  </Fragment>
);

const Header = ({ children }: PropsWithChildren<{}>) => (
  <Fragment>{children}</Fragment>
);

const config: UIToolkitConfig = {
  Chapter,
  Header,
  List: ({ children, type = 'decimal' }) => (
    <ol style={{ listStyleType: type }}>{children}</ol>
  ),
  ListItem: ({ children }) => <li>{children}</li>,
  Paragraph: ({ children }) => <p>{children}</p>,
  RenderHtmlCard: ({ caption, html }) => (
    <exposnippet html={html} caption={caption} />
  ),
  SourceDisplay: ({ content, lang, title }) => (
    <codeblockds lang={lang} title={title} content={content} />
  ),
  TipBox: ({ children }) => <admonition type="tip">{children}</admonition>,
  RefBuilder: ({ name, url }) => <a href={url}>{name}</a>
};

export default function MdxToolkitProvider({
  children
}: PropsWithChildren<{}>) {
  return <ToolkitProvider config={config}>{children}</ToolkitProvider>;
}
