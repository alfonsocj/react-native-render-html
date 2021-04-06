import { Stack, useSpacing } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import TextNucleon, {
  TextNucleonProps
} from '../components/nucleons/TextNucleon';
import * as ReactNative from 'react-native';
import { Colors } from 'react-native-paper';
import BoxNucleon from '../components/nucleons/BoxNucleon';
import { useNuclearContentWidth } from '../components/nucleons/useContentWidthContext';
import SurfaceAtom from '../components/atoms/SurfaceAtom';
import RenderHtmlCard from './RenderHtmlCard';
import { ScrollView } from 'react-native-gesture-handler';
import { WithStyleProp } from '../components/nucleons/types';
import { useColorPrimitives, useColorRoles } from '../theme/colorSystem';
import IconNucleon from '../components/nucleons/IconNucleon';
import textColorContext from '../state/textColorContext';

function HtmlAttribute(props: TextNucleonProps) {
  return <TextNucleon mono bold {...props} />;
}

function HtmlElement(props: TextNucleonProps) {
  return <TextNucleon mono bold {...props} />;
}

function JavaScriptSymbol({ name }: { name: string }) {
  const { accentVariant } = useColorPrimitives();
  return (
    <TextNucleon color={accentVariant.color} mono bold>
      {name}
    </TextNucleon>
  );
}

function RenderHtmlProp({ name }: { name: keyof RenderHTMLProps }) {
  const { accent } = useColorPrimitives();
  return (
    <TextNucleon color={accent.color} mono bold>
      {name}
    </TextNucleon>
  );
}

function ReactNativeExport({ name }: { name: keyof typeof ReactNative }) {
  const { accent } = useColorPrimitives();
  return (
    <TextNucleon color={accent.color} mono bold>
      {name}
    </TextNucleon>
  );
}

function Paragraph(props: TextNucleonProps) {
  return (
    <BoxNucleon paddingX={2}>
      <TextNucleon
        {...props}
        lineHeight={2}
        style={{ fontFamily: 'IBMPlexSerif_400Regular' }}
      />
    </BoxNucleon>
  );
}

function TipBox({ children, ...props }: TextNucleonProps) {
  const { surface } = useColorRoles();
  const spaceRight = useSpacing(2);
  return (
    <BoxNucleon
      {...props}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: spaceRight
        },
        props.style
      ]}>
      <BoxNucleon padding={2} backgroundColor={surface.background}>
        <IconNucleon
          color={Colors.amber300}
          name="lightbulb-on-outline"
          size={16}
        />
      </BoxNucleon>
      <BoxNucleon
        style={{
          borderLeftWidth: 2,
          borderColor: Colors.amber300,
          flexGrow: 1,
          flexShrink: 1,
          alignSelf: 'stretch',
          justifyContent: 'center'
        }}>
        <textColorContext.Provider value={surface.secondaryContent}>
          {children}
        </textColorContext.Provider>
      </BoxNucleon>
    </BoxNucleon>
  );
}

function Header({ children, style }: WithStyleProp<PropsWithChildren<{}>>) {
  return (
    <BoxNucleon paddingX={2}>
      <TextNucleon
        bold
        fontSize="big"
        style={[style, { textTransform: 'uppercase' }]}>
        {children}
      </TextNucleon>
    </BoxNucleon>
  );
}

const inlineExample = `<img
  width="1200" height="800"
  style="width: 50%; height: 100px; align-self: center"
  src="https://i.imgur.com/gSmWCJF.jpg"
/>`;

const autoSizeExample = `<img
  width="1200" height="800"
  src="https://i.imgur.com/XP2BE7q.jpg"
/>`;

const unreachableExample = `<img
  width="200" height="100"
  alt="The Void"
  src="http://example.tld/image.jpg"
/>`;

export default function Images() {
  const contentWidth = useNuclearContentWidth();
  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <SurfaceAtom paddingY={2}>
        <Stack space={2}>
          <Paragraph>
            Currently, only <HtmlElement>img</HtmlElement> element is supported.
          </Paragraph>
          <Header>Scaling</Header>
          <Paragraph>
            The renderer will automatically scale images down to the available
            width, even when the provided inline style width is greater than the
            container width.
          </Paragraph>
          <TipBox>
            <Paragraph>
              You are strongly advised to provide a{' '}
              <RenderHtmlProp name="contentWidth" /> property from{' '}
              <ReactNativeExport name="useWindowDimensions" /> official hook to
              help this component handle the scaling.
            </Paragraph>
          </TipBox>
          <RenderHtmlCard
            caption={
              'This image dimensions are set with inline styles. Note that both the width/height couple and the style attributes are evaluated, but the style attribute takes precedence. The relative width (50%) is computed against contentWidth.'
            }
            html={inlineExample}
            contentWidth={contentWidth}
          />
          <Paragraph>
            The next image will be sized automatically thanks to the{' '}
            <RenderHtmlProp name="contentWidth" /> and{' '}
            <RenderHtmlProp name="computeEmbeddedMaxWidth" /> props. The latter
            allows you to set the maximum width from{' '}
            <RenderHtmlProp name="contentWidth" />, or disabling scaling by
            returning <JavaScriptSymbol name="Infinity" />.
          </Paragraph>
          <RenderHtmlCard
            caption={
              "This image has no inline style. Its width and height are determined by the width and height attributes, scaled down to fit the result of computeEmbeddedMaxWidth('img')."
            }
            html={autoSizeExample}
            contentWidth={contentWidth}
          />
          <Header>Preloading</Header>
          <Paragraph>
            Similarly to browsers, this library will place a print box before
            fetching image dimensions when both{' '}
            <HtmlAttribute>width</HtmlAttribute> and{' '}
            <HtmlAttribute>height</HtmlAttribute> attributes are provided, or
            the two dimensions are set in the{' '}
            <HtmlAttribute>style</HtmlAttribute> attribute. This is great to
            avoid images "jumping" from zero height to their computed height,
            and is a hint to good web design.
          </Paragraph>
          <Header>Error Handling</Header>
          <RenderHtmlCard
            caption={
              'When an image is unreachable, the image renderer will print a box while preserving its requested dimensions. It will also display at the center of the box the content of alt attribute.'
            }
            html={unreachableExample}
            contentWidth={contentWidth}
          />
        </Stack>
      </SurfaceAtom>
    </ScrollView>
  );
}
