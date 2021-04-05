import { Stack } from '@mobily/stacks';
import React from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import TextNucleon, {
  TextNucleonProps
} from '../components/nucleons/TextNucleon';
import * as ReactNative from 'react-native';
import SourceDisplayMolecule from '../components/molecules/SourceDisplayMolecule';
import BoxNucleon from '../components/nucleons/BoxNucleon';

function HtmlAttribute(props: TextNucleonProps) {
  return <TextNucleon mono bold {...props} />;
}

function RenderHtmlProp({ name }: { name: keyof RenderHTMLProps }) {
  return (
    <TextNucleon color="blue" mono bold>
      {name}
    </TextNucleon>
  );
}

function ReactNativeExport({ name }: { name: keyof typeof ReactNative }) {
  return (
    <TextNucleon color="red" mono bold>
      {name}
    </TextNucleon>
  );
}

function Paragraph(props: TextNucleonProps) {
  return (
    <BoxNucleon paddingX={2}>
      <TextNucleon {...props} />
    </BoxNucleon>
  );
}

function HtmlSnippetDisplay({
  content,
  caption
}: {
  content: string;
  caption: string;
}) {
  return (
    <SourceDisplayMolecule fontSize="small" content={content} language="html" />
  );
}

const inlineExample = `<img
  width="1200" height="800"
  style="width: 50%; height: 100px; align-self: center"
  src="https://i.imgur.com/gSmWCJF.jpg"
/>`;

export default function Images() {
  return (
    <Stack space={2}>
      <Paragraph>
        Similarly to browsers, this library will place a print box before
        fetching image dimensions when both <HtmlAttribute>width</HtmlAttribute>{' '}
        and <HtmlAttribute>height</HtmlAttribute> attributes are provided. This
        is great to avoid images "jumping" from zero height to their computed
        height, and is a hint to good web design.
      </Paragraph>
      <Paragraph>
        Moreover, this library will automatically scale images down to the
        available width, even when the provided inline style width is greater
        than the container width. You are strongly advised to provide a{' '}
        <RenderHtmlProp name="contentWidth" /> property from{' '}
        <ReactNativeExport name="useWindowDimensions" /> official hook to help
        this component handle the scaling.
      </Paragraph>
      <HtmlSnippetDisplay
        caption={'This image display dimensions are set with inline styles'}
        content={inlineExample}
      />
    </Stack>
  );
}
