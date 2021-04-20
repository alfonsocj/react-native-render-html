import { ComponentType, PropsWithChildren } from 'react';
import type { RenderHTMLProps } from 'react-native-render-html';
import type * as RN from 'react-native';

/**
 * Says hello.
 *
 * @public
 */
export default function hello() {
  return 'Hello world!';
}

type RefComponent<T extends string = string> = ComponentType<{ name: T }>;

export interface UIToolkitBase {
  Container?: ComponentType<PropsWithChildren<{}>>;
  Header: ComponentType<PropsWithChildren<{}>>;
  Chapter: ComponentType<{ title: string }>;
  Paragraph: ComponentType<{}>;
  RenderHtmlCard: ComponentType<{ caption: string; html: string }>;
  SourceDisplay: ComponentType<{
    lang: string;
    content: string;
    title: string;
  }>;
  TipBox: ComponentType<PropsWithChildren<{}>>;
  List: ComponentType<PropsWithChildren<{ type?: 'upper-alpha' | 'decimal' }>>;
  ListItem: ComponentType<PropsWithChildren<{}>>;
}

export interface UIToolkitRefs {
  RefHtmlAttr: RefComponent;
  RefHtmlElement: RefComponent;
  RefESSymbol: RefComponent;
  RefCssProperty: RefComponent;
  RefRNSymbol: RefComponent<keyof typeof RN>;
  RefRenderHtmlProp: RefComponent<keyof RenderHTMLProps>;
  RefLibrary: ComponentType<{ name: string; url: string }>;
}

export interface UIToolkit extends UIToolkitBase, UIToolkitRefs {}

export type UIToolkitConfig = {
  RefBuilder: ComponentType<{ name: string; url: string }>;
} & UIToolkitBase;
